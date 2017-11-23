export const typeDefs = `
    # Description for Photo
    type Photo {
        id: Int!
        name: String
        description: String
        filename: String
        views: Int
        isPublished: Boolean
    }

    type User {
        id: Int!
        username: String!
        email: String!
        password: String!
    }
    
    type AuthInfo {
        token: String!
        user: User!
    }

    type Credentials {
        email: String!
        password: String!
    }

    type Query {
        photos: [Photo]
        users: [User]
        login(username: String!, password: String!): AuthInfo
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): AuthInfo
        updateUser(id: Int!, username: String, email: String): User
    }
`;