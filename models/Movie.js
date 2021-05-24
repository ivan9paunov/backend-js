import mongoose from "mongoose";
const { Schema } = mongoose;

const MovieSchema = new Schema ({
    title: String,
    description: String,
    rating: {
        type: Number,
        default: 0,
    },
})

const Movie = mongoose.model("Movie", MovieSchema);
export default Movie;