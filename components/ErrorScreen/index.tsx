import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ErrorScreenProps {
    message?: string;
    onRetry?: () => void;
}

export const ErrorScreen = ({ message, onRetry }: ErrorScreenProps) => {
    return (
        <View className="flex-1 items-center justify-center bg-primary p-6">
            <Text className="text-xl font-bold text-red-600 mb-2">Ops!</Text>
            <Text className="text-gray-600 text-center mb-4">
                {message || "Algo deu errado. Tente novamente."}
            </Text>

            {onRetry && (
                <TouchableOpacity
                    onPress={onRetry}
                    className="bg-blue-500 px-6 py-3 rounded-2xl"
                >
                    <Text className="text-white font-semibold">Tentar novamente</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};
