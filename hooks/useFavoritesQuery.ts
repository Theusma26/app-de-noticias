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

export function useFavoritesQuery() {
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

  return {
    favorites: favoritesQuery.data ?? [],
    isLoading: favoritesQuery.isLoading,
    addFavorite: addFavorite.mutateAsync,
    removeFavorite: removeFavorite.mutateAsync,
  };
}
