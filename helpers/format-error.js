import { UserInputError } from "apollo-server";

export const formatError = (err) => {
    if (err.message.startsWith('Database Error: ')) {
        return new Error('Internal server error');
    }
    if(err.originalError instanceof UserInputError) {
        delete err.extensions.exception
    }
    return err;
}