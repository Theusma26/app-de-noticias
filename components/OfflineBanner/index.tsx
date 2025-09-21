import React from "react";
import { View, Text } from "react-native";

export const OfflineBanner = () => {
    return (
        <View className="bg-yellow-500 p-2 mb-4 rounded">
            <Text className="text-center text-black font-medium">
                Você está offline. Mostrando notícias armazenadas.
            </Text>
        </View>
    );
};

