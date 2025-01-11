import { View, Text } from 'react-native';
import React from 'react';
import { useRouter } from '@refinenative/expo-router';

const ShowPage = () => {
    // Access the dynamic parameter from the route
    const { id } = useRouter().query;

    return (
        <View>
            <Text>Hy Show {id}</Text>
        </View>
    );
};

export default ShowPage;
