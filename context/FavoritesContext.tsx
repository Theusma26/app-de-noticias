import React, { createContext, useContext, ReactNode } from "react";
import { Article } from "@/interfaces/articles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const FAVORITES_KEY = "@favorites";

async function getFavorites(): Promise<Article[]> {
    const stored = await AsyncStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
}

async function saveFavorites(favorites: Article[]) {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

interface FavoritesContextValue {
    favorites: Article[];
    isLoading: boolean;
    addFavorite: (item: Article) => Promise<Article[]>;
    removeFavorite: (url: string) => Promise<Article[]>;
}


const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const queryClient = useQueryClient();

    const favoritesQuery = useQuery({
        queryKey: ["favorites"],
        queryFn: getFavorites,
        initialData: [],
    });

    const addFavorite = useMutation({
        mutationFn: async (item: Article) => {
            const current = favoritesQuery.data ?? [];
            const exists = current.some((f) => f.url === item.url);
            if (!exists) {
                const newFavorites = [...current, item];
                await saveFavorites(newFavorites);
                return newFavorites;
            }
            return current;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["favorites"], data);
        },
    });

    const removeFavorite = useMutation({
        mutationFn: async (url: string) => {
            const current = favoritesQuery.data ?? [];
            const newFavorites = current.filter((f) => f.url !== url);
            await saveFavorites(newFavorites);
            return newFavorites;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["favorites"], data);
        },
    });

    return (
        <FavoritesContext.Provider
            value={{
                favorites: favoritesQuery.data ?? [],
                isLoading: favoritesQuery.isLoading,
                addFavorite: addFavorite.mutateAsync,
                removeFavorite: removeFavorite.mutateAsync,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites deve ser usado dentro de um FavoritesProvider");
    }
    return context;
};