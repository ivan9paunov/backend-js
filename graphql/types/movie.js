export default `
    
    type Movie {
        _id: String!
        title: String!
        description: String!
        rating: Float!
    }

    input CreateMovieInput {
        title: String!
        description: String!
        rating: Float!
    }

    type Query {
        movie(_id: String!): Movie
        movies: [Movie]
    }

    type Mutation {
        createMovie(data: CreateMovieInput!): Movie
        editMovie(_id: String!, data: CreateMovieInput!): Movie
        deleteMovie(_id: String!): Movie
    }

`