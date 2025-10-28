import { Article } from "@/interfaces/articles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useInfiniteQuery } from "@tanstack/react-query";

interface NewsQueryResponse {
    articles: Article[];
    totalResults: number;
    page: number;
}

interface QueryFnParams {
    endpoint: (param: string, page: number, pageSize: number) => Promise<NewsQueryResponse>;
    param: string;
    pageSize?: number;
    storageKey?: string;
    isConnected: boolean;
};

const saveOffline = async (storageKey: string, articles: Article[]) => {
    try {
        await AsyncStorage.setItem(storageKey, JSON.stringify(articles));
    } catch (e) {
        console.error("Erro ao salvar offline:", e);
    }
};

const getOffline = async (storageKey: string): Promise<Article[]> => {
    try {
        const stored = await AsyncStorage.getItem(storageKey);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Erro ao ler offline:", e);
        return [];
    }
};

export const useNewsQuery = ({
    endpoint,
    param,
    isConnected,
    pageSize = 10,
    storageKey = "@cached_news",
}: QueryFnParams) => {
    return useInfiniteQuery({
        queryKey: [endpoint.name, param],
        queryFn: async ({ pageParam = 1 }) => {
            if (!isConnected) {
                const offlineArticles = await getOffline(storageKey);
                return { page: 1, totalResults: offlineArticles.length, articles: offlineArticles };
            }

            const response = await endpoint(param, pageParam, pageSize);
            if (pageParam === 1) await saveOffline(storageKey, response.articles);
            return response;
        },
        getNextPageParam: (lastPage) => {
            const totalPages = Math.ceil(lastPage.totalResults / pageSize);
            return lastPage.page < totalPages ? lastPage.page + 1 : undefined;
        },
        initialPageParam: 1,
        enabled: !!param,
    });
};
