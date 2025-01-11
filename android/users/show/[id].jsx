// app/users/show/[id].jsx
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useParams } from '@refinenative/expo-router';  // Import the useParams hook

const ShowPage = () => {
    const { id } = useParams();  // Get the `id` from the URL

    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user data based on the dynamic `id`
        fetch(`https://eksamaj.com/bader_preprod/api/users/${id}`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error('Error fetching user:', error));
    }, [id]);

    if (!user) {
        return <Text>Loading...</Text>;
    }

    return (
        <View>
            <Text>User ID: {id}</Text>
            <Text>User Name: {user.name}</Text>
            <Text>User Email: {user.email}</Text>
            {/* Display other user details here */}
        </View>
    );
};

export default ShowPage;
