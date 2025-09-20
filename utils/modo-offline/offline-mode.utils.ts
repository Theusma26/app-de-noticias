import { Article } from "@/interfaces/articles";
import AsyncStorage from "@react-native-async-storage/async-storage";
const STORAGE_KEY = "@cached_news";

export const saveOffline = async (articles: Article[]) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    } catch (error) {
        console.error("Erro ao salvar offline:", error);
    }
};

export const getOffline = async (): Promise<Article[]> => {
    try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Erro ao ler offline:", error);
        return [];
    }
};