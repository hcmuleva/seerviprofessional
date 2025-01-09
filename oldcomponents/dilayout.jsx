// components/dilayout.jsx
import React from 'react';
import { Platform, View, Text } from 'react-native';
import { Refine } from '@refinedev/core';
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { DrawerLayout } from '@refinenative/expo-router';
import { DrawerContent, ReactNavigationThemeProvider, Header } from '@refinenative/react-native-paper';  // Assuming refineConfig is configured correctly
import { refineConfig } from '../config/refineConfig';

export default function Diayout() {
    return (
        <Refine
            routerProvider={routerProvider}
            options={{
                reactQuery: {
                    devtoolConfig: Platform.OS === "web" ? undefined : false,
                },
                disableTelemetry: true,
            }}
            dataProvider={dataProvider("https://eksamaj.com/bader_preprod/api")}
            resources={refineConfig.resources}  // Resources should include the `/users/show/:id` route
        >
            <ReactNavigationThemeProvider>
                <DrawerLayout
                    DrawerContent={() => <DrawerContent />}
                    Header={Header}
                />
            </ReactNavigationThemeProvider>
            <Text>Diayout</Text>
        </Refine>
    );
}
