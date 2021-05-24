import User from "../../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import dotenv from "dotenv";
import { UserInputError } from "apollo-server";
dotenv.config();

export default {
    Query: {
        user: async (root, {_id}) => {
            const user = await User.findById(_id).populate("movies");
            return user;
        },
        users: async () => {
            const users = await User.find({}).populate("movies");
            return users;
        },
        currentUser: async (root, args, context) => {
            return context.user;
        },
    },
    Mutation: {
        createUser: async(root, args) => {
            const userData = args.data;
            if(!validator.isEmail(userData.email)) {
                throw new UserInputError(`Email is not valid: ${userData.email}`, {
                    field: "email",
                    value: userData.email,
                    constraint: "isEmail",
                })
            }

            if(!validator.isLength(userData.password, {min: 6, max: 255})) {
                throw new UserInputError(`Password has to be between 6 and 255 symbols!`, {
                    field: "password",
                    value: userData.password,
                    constraint: "isLength",
                })
            }

            userData.password = await bcryptjs.hash(userData.password, 10);
            const newUser = new User(userData);
            await newUser.save();
            return newUser;
        },
        editUser: async(root, {_id, data}) => {
            const user = await User.findByIdAndUpdate(_id, 
                {$set: data},
                {
                    runValidators: true,
                    new: true,
                }).populate("movies");
            return user;
        },
        deleteUser: async(root, {_id}) => {
            const user = User.findOneAndDelete(_id).populate("movies");
            return user;
        },
        login: async(root, {email, password}) => {
            const matchedUser = await User.findOne({email});
            if(!matchedUser){
                throw new UserInputError(`Cannot find user with email: ${email}`, {
                    field: "email",
                    value: email,
                    constraint: "emailDoesNotExist",
                })
            }

            const validPassword = await bcryptjs.compare(password, matchedUser.password);
            if(!validPassword){
                throw new UserInputError(`Password is incorrect!`, {
                    field: "password",
                    value: "",
                    constraint: "passwordIncorrect",
                })
            }

            const privateKey = process.env.JSONWEBTOKEN_PRIVATE_KEY;
            const token = jwt.sign({
                _id: matchedUser._id,
                email: matchedUser.email,
            }, privateKey, {
                expiresIn: "1d"
            });

            return token;
        },
        logout: async(root, args, context) => {
            return context.user;
        }
    }


}