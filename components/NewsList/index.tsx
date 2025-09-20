import { Article } from "@/interfaces/articles";
import { format, parseISO } from "date-fns";
import { useRouter } from "expo-router";
import React from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";


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

    if (!articles || articles.length === 0) {
        return (
            <Text className="text-center text-base text-gray-500 mt-4">
                No news articles found.
            </Text>
        );
    }

    return (
        <FlatList
            data={articles}
            keyExtractor={(item, index) => `${item.url}-${index}`}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity
                        className="flex-row items-center p-4 my-2 bg-dark-100 rounded-lg "
                        onPress={() =>
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
                            })
                        }
                    >
                        {item.urlToImage && (
                            <Image
                                source={{ uri: item.urlToImage }}
                                className="w-20 h-20 rounded-lg mr-4"
                            />
                        )}
                        <View className="flex-1">
                            <Text className="text-base font-bold text-light-100 mb-1">
                                {item.title}
                            </Text>
                            <Text className="text-sm text-light-200 mb-1" numberOfLines={2}>
                                {item.description}
                            </Text>

                            <View className="flex-row w-full justify-between items-center mt-1">
                                {item.publishedAt && (
                                    <Text className="text-xs text-light-300">
                                        {format(parseISO(item.publishedAt), "dd/MM/yyyy")}
                                    </Text>
                                )}
                                {item.source?.name && (
                                    <Text className="text-xs text-light-300 italic ml-3">
                                        {item.source.name}
                                    </Text>
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            }}
            onEndReached={() => {
                if (hasNextPage) fetchNextPage();
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() =>
                isFetchingNextPage ? (
                    <ActivityIndicator size="small" color="#4c669f" />
                ) : null
            }
        />
    );
}
