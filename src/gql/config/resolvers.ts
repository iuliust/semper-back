const photos = [
    { id: 1, name: 'me having fun', description: 'me at the beach', filename: 'me.jpg', views: 42, isPublished: true },
];

export const resolvers = {
    Query: {
        photos: () => photos,
    },
};