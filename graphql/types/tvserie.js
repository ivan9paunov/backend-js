export default `
    
    type TvSerie {
        _id: String!
        title: String!
        description: String!
        rating: Float!
        image: String!
    }

    input CreateTvSerieInput {
        title: String!
        description: String!
        rating: Float!
        image: String!
    }

    type Query {
        tvserie(_id: String!): TvSerie
        tvseries: [TvSerie]
    }

    type Mutation {
        createTvSerie(data: CreateTvSerieInput!): TvSerie
        editTvSerie(_id: String!, data: CreateTvSerieInput!): TvSerie
        deleteTvSerie(_id: String!): TvSerie
    }

`