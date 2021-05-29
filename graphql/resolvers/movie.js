import Movie from "../../models/Movie.js";

export default {
    Query: {
        movie: async (root, {_id}) => {
            const movie = await Movie.findById(_id);
            return movie;
        },
        movies: async () => {
            const movies = await Movie.find({});
            return movies;
        }
    },
    Mutation: {
        createMovie: async(root, args) => {
            const newMovie = new Movie(args.data);
            await newMovie.save();
            return newMovie;
        },
        editMovie: async(root, {_id, data}) => {
            const movie = await Movie.findByIdAndUpdate(_id, 
                {$set: data},
                {
                    runValidators: true,
                    new: true
                })
            return movie;
        },
        deleteMovie: async(root, {_id}) => {
            const movie = Movie.findOneAndDelete(_id)
            return movie;
        },
    }


}