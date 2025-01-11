// config/refineConfig.js
export const refineConfig = {
    resources: [
        {
            name: "users",
            show: "users/show/:id",  // Ensure this points to the correct dynamic route
            meta: {
                canDelete: true,
                icon: 'calendar',
            },
        },
    ],
};
