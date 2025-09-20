import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { ErrorScreen } from "@/components/ErrorScreen";
import { Loading } from "@/components/Loading";
import { useNetwork } from "@/context/NetworkContext";
import { Article } from "@/interfaces/articles";
import { getOffline, saveOffline } from "@/utils/modo-offline/offline-mode.utils";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { NewsList } from "../../components/NewsList";
import { getNewsByCategory } from "../../service/newsService/news-service";

const NewsByCategory = () => {
    const { newsByCategory } = useLocalSearchParams<{ newsByCategory: string }>();
    const router = useRouter();
    const { isConnected } = useNetwork();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
        refetch
    } = useInfiniteQuery({
        queryKey: ["newsByCategory", newsByCategory],
        queryFn: async ({ pageParam = 1 }) => {
            if (!isConnected) {
                return {
                    page: 1,
                    totalResults: 0,
                    articles: await getOffline(),
                };
            }
            const response = await getNewsByCategory(newsByCategory, pageParam, 10);
            if (pageParam === 1) await saveOffline(response.articles);

            return response;
        },
        getNextPageParam: (lastPage) => {
            const totalPages = Math.ceil(lastPage.totalResults / 10);
            return lastPage.page < totalPages ? lastPage.page + 1 : undefined;
        },
        initialPageParam: 1,
        enabled: !!newsByCategory,
    });
    const articles: Article[] = data?.pages.flatMap((page) => page.articles) || [];

    if (isLoading) {
        return (
            <Loading />
        );
    }

    if (error) {
        return (
            <ErrorScreen
                message={error instanceof Error ? error.message : "Erro inesperado"}
                onRetry={refetch}
            />
        );
    }

    return (
        <View className="flex-1 p-4 bg-primary">
            {!isConnected && (
                <View className="bg-yellow-500 p-2 mb-4 rounded">
                    <Text className="text-center text-black font-medium">
                        Você está offline. Mostrando notícias armazenadas.
                    </Text>
                </View>
            )}
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
