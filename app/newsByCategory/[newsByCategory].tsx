import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { NewsList } from "../../components/NewsList";
import { getNewsByQuery } from "../../service/newsService/news-service";

const NewsByCategory = () => {
    const { newsByCategory } = useLocalSearchParams<{ newsByCategory: string }>();
    const router = useRouter();
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
    } = useInfiniteQuery({
        queryKey: ["newsByCategory", newsByCategory],
        queryFn: ({ pageParam = 1 }) =>
            getNewsByQuery(newsByCategory, pageParam, 10),
        getNextPageParam: (lastPage) => {
            const totalPages = Math.ceil(lastPage.totalResults / 10);
            return lastPage.page < totalPages ? lastPage.page + 1 : undefined;
        },
        initialPageParam: 1,
        enabled: !!newsByCategory,
    });
    const articles = data?.pages.flatMap((page) => page.articles) || [];
    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-primary">
                <ActivityIndicator size="large" color="#4c669f" />
                <Text className="mt-2 text-base text-[#4c669f]">Loading news...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 justify-center items-center p-4">
                <Text className="text-base text-[#d9534f] text-center">
                    {`Error: ${error.message}`}
                </Text>
            </View>
        );
    }

    return (
        <View className="flex-1 p-4 bg-primary">
            <View className="flex-row items-center mb-4">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="p-2"
                >
                    <MaterialIcons name="arrow-back" size={28} color="#D6C7FF" />
                </TouchableOpacity>
                <Text className="flex-1 text-center text-2xl font-bold text-light-100">
                    {newsByCategory}
                </Text>
                <View className="w-10" />
            </View>
            <NewsList
                articles={articles}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
            />
        </View>
    );
};

export default NewsByCategory;
