export default `

    input UserInput {
        email: String!
        password: String!
        movies: [String]
        firstName: String!
        lastName: String!
    }

    type User {
        _id: String!
        email: String!
        password: String!
        firstName: String!
        lastName: String!
        movies: [Movie]
    }

    type Query {
        user(_id: String!): User
        users: [User]
        currentUser: User
    }

    type Mutation {
        createUser(data: UserInput!): User
        editUser(_id: String!, data: UserInput!): User
        deleteUser(_id: String!): User
        login(email: String!, password: String!): String
        logout: User
    }

`