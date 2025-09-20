import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import React from 'react';


export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarItemStyle: {
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                },
                tabBarStyle: {
                    backgroundColor: "#0F0D23",
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: 36,
                    height: 58,
                    position: "absolute",
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: "#0F0D23",
                },
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <MaterialIcons name="home" size={28} color={color} />,
                }}
            />
            <Tabs.Screen
                name="category"
                options={{
                    title: 'Categorias',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <MaterialIcons name="category" size={28} color={color} />,
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: 'Favoritos',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <MaterialIcons name="favorite-border" size={28} color={color} />,
                }}
            />
        </Tabs>
    );
}
