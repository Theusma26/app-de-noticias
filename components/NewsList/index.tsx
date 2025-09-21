import React, { useCallback } from "react";
import { FlatList, Text, ActivityIndicator, View } from "react-native";
import { Article } from "@/interfaces/articles";
import { useRouter } from "expo-router";
import NewsItem from "./NewsItem";

interface NewsListProps {
    articles: Article[];
    fetchNextPage: () => void;
    hasNextPage?: boolean;
    isFetchingNextPage?: boolean;
}

export function NewsList({
    articles,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
}: NewsListProps) {
    const router = useRouter();

    const handlePress = useCallback(
        (item: Article) => {
            router.push({
                pathname: `/details/[id]`,
                params: {
                    id: item.url,
                    title: item.title,
                    description: item.description,
                    content: item.content,
                    urlToImage: item.urlToImage,
                    url: item.url,
                },
            });
        },
        [router]
    );

    if (!articles || articles.length === 0) {
        return (
            <Text className="text-center text-base text-gray-500 mt-4">
                Nenhuma notícia encontrada.
            </Text>
        );
    }

    return (
        <FlatList
            data={articles}
            keyExtractor={(item, index) => `${item.url}-${index}`}
            renderItem={({ item }) => <NewsItem item={item} onPress={() => handlePress(item)} />}
            onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) fetchNextPage();
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() =>
                isFetchingNextPage ? (
                    <View className="py-4">
                        <ActivityIndicator size="small" color="#4c669f" />
                    </View>
                ) : null
            }
        />
    );
}
