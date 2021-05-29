import mongoose from "mongoose";
const { Schema } = mongoose;

const TvSerieSchema = new Schema ({
    title: String,
    description: String,
    image: String,
    rating: {
        type: Number,
        default: 0,
    },
})

const TvSerie = mongoose.model("TvSerie", TvSerieSchema);
export default TvSerie;