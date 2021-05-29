import TvSerie from "../../models/TvSerie.js";

export default {
    Query: {
        tvserie: async (root, {_id}) => {
            const tvserie = await TvSerie.findById(_id);
            return tvserie;
        },
        tvseries: async () => {
            const tvseries = await TvSerie.find({});
            return tvseries;
        }
    },
    Mutation: {
        createTvSerie: async(root, args) => {
            const newTvSerie = new TvSerie(args.data);
            await newTvSerie.save();
            return newTvSerie;
        },
        editTvSerie: async(root, {_id, data}) => {
            const tvserie = await TvSerie.findByIdAndUpdate(_id, 
                {$set: data},
                {
                    runValidators: true,
                    new: true
                })
            return tvserie;
        },
        deleteTvSerie: async(root, {_id}) => {
            const tvserie = TvSerie.findOneAndDelete(_id)
            return tvserie;
        },
    }


}