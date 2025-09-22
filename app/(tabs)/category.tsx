import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { categories } from "@/mocks/category";

const Categories = () => {
    const router = useRouter();

    return (
        <View className="flex-1 p-4 bg-primary">
            <Text className="text-2xl font-bold mb-5 text-center text-light-100">
                Categorias
            </Text>

            <FlatList
                contentContainerStyle={{ paddingBottom: 100 }}
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        className="flex-1 flex-row items-center p-4 m-2 bg-dark-100 rounded-xl shadow-md"
                        onPress={() => {
                            router.push({
                                pathname: "/newsByCategory/[newsByCategory]",
                                params: { newsByCategory: item.name }
                            });
                        }}
                    >
                        <MaterialIcons
                            name={item.icon}
                            size={24}
                            color="white"
                            className="mr-2"
                        />
                        <Text className="text-light-200 text-sm font-medium">{item.name}</Text>
                    </TouchableOpacity>
                )}
                numColumns={2}
            />
        </View>
    );
};

export default Categories;
