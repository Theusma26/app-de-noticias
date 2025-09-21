import React, { memo } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { Article } from "@/interfaces/articles";
import { formatDate } from "@/utils/formatDate.utils";

interface NewsItemProps {
    item: Article;
    onPress: () => void;
}

const NewsItem = ({ item, onPress }: NewsItemProps) => {
    return (
        <TouchableOpacity
            accessibilityRole="button"
            className="flex-row items-center p-4 my-2 bg-dark-100 rounded-lg"
            onPress={onPress}
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
                            {formatDate(item.publishedAt)}
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
};

export default memo(NewsItem);
