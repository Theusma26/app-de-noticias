import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import useFavorites from "@/hooks/useFavorites";
import { Article } from "@/interfaces/articles";
import { useIsFocused } from "@react-navigation/native";
import { NewsList } from "../../components/NewsList";

const Favorites = () => {
    const [favorites, setFavorites] = useState<Article[]>([]);
    const focused = useIsFocused()
    const { getFavorites } = useFavorites();

    useEffect(() => {
        const loadFavorites = async () => {
            const storedFavorites = await getFavorites();
            setFavorites(storedFavorites);
        }
        loadFavorites();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [focused])
    return (
        <View className="flex-1 p-4 bg-primary">
            <View className="flex-row items-center mb-4">
                <Text className="flex-1 text-center text-2xl font-bold text-light-100">
                    Favoritos
                </Text>
            </View>

            {favorites.length === 0 ? (
                <Text className="text-center text-base text-light-200 mt-4">
                    Nenhuma notícia nos favoritos.
                </Text>
            ) : (
                <NewsList
                    articles={favorites}
                    fetchNextPage={() => { }}
                    hasNextPage={false}
                    isFetchingNextPage={false}
                />
            )}
        </View>
    );
};

export default Favorites;
