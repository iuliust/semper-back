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
        userName: String!
        email: String!
        password: String!
    }

    type Query {
        photos: [Photo]
        users: [User]
    }
`;