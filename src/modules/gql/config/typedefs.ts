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

    type Query {
        photos: [Photo]
    }
`;