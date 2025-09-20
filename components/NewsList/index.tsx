import React from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Article {
    url: string;
    urlToImage?: string;
    title: string;
    description?: string;
}

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
    if (!articles || articles.length === 0) {
        return <Text style={styles.noResultsText}>No news articles found.</Text>;
    }

    return (
        <FlatList
            data={articles}
            keyExtractor={(item, index) => `${item.url}-${index}`}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.articleContainer}>
                    {item.urlToImage && <Image source={{ uri: item.urlToImage }} style={styles.articleImage} />}
                    <View style={styles.textContainer}>
                        <Text style={styles.articleTitle}>{item.title}</Text>
                        <Text style={styles.articleDescription} numberOfLines={2}>
                            {item.description}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
            onEndReached={() => {
                if (hasNextPage) fetchNextPage();
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() =>
                isFetchingNextPage ? <ActivityIndicator size="small" color="#4c669f" /> : null
            }
        />
    );
};


const styles = StyleSheet.create({
    articleContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        marginVertical: 8,
        backgroundColor: "#fff",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    articleImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    articleTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 4,
    },
    articleDescription: {
        fontSize: 14,
        color: "#666",
    },
    noResultsText: {
        textAlign: "center",
        fontSize: 16,
        color: "#666",
        marginTop: 16,
    },
});
