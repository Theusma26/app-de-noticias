import { Article } from '@/interfaces/articles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

function useFavorites() {
  const FAVORITES_KEY = '@favorites';
  const [favorites, setFavorites] = useState<Article[]>([]);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      setFavorites(stored ? JSON.parse(stored) : []);
    })();
  }, [setFavorites]);

  const addFavorite = useCallback(async (item: Article) => {
    try {
      const exists = favorites.find(fav => fav.url === item.url);
      if (!exists) {
        const newFavorites = [...favorites, item];
        setFavorites(newFavorites);
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      }
    } catch (e) {
      console.error('Erro ao adicionar favorito', e);
    }
  }, [favorites]);

  const removeFavorite = useCallback(async (url: string) => {
    try {
      const newFavorites = favorites.filter(fav => fav.url !== url);
      setFavorites(newFavorites);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (e) {
      console.error('Erro ao remover favorito', e);
    }
  }, [favorites]);

  const getFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Erro ao buscar favoritos', e);
    }
  };

  const isFavorite = useCallback((url?: string) => {
    if (!url) return false;
    return favorites.some(fav => fav.url === url);
  }, [favorites]);

  return { addFavorite, removeFavorite, getFavorites, isFavorite };
}

export default useFavorites;
