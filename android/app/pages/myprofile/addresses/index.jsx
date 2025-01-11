import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import CreateAddress from './CreateAddress';
import ListAddress from './ListAddress';

export default function AddressDetails() {
    const [user, setUser] = useState("");
    const [type, setType] = useState("LIST");

    return (
        <View style={{ padding: 20 }}>
            {type === "LIST" && (
                <Button
                    title="Create Address"
                    onPress={() => setType("CREATE")}
                />
            )}

            {type === "CREATE" && (
                <Button
                    title="List Address"
                    onPress={() => setType("LIST")}
                />
            )}

            {type === "CREATE" && <CreateAddress user={user} setType={setType} />}
            {type === "LIST" && <ListAddress user={user} setType={setType} />}
        </View>
    );
}
