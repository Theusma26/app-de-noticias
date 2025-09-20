import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

export const Loading = () => {
    return (
        <View className="flex-1 justify-center items-center bg-primary">
            <ActivityIndicator size="large" color="#4c669f" />
            <Text className="mt-2 text-base text-[#4c669f]">Carregando notícias...</Text>
        </View>
    );
};
