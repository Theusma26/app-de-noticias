import api from "../baseService/api";

export async function getNewsByQuery(query: string, page = 1, pageSize = 10) {
    const response = await api.get(
        `/everything?q=${query}&page=${page}&pageSize=${pageSize}&sortBy=publishedAt&apiKey=${process.env.EXPO_PUBLIC_API_KEY}`
    );
    return {
        ...response.data,
        page,
    };
}
export async function getNewsByCategory(query: string, page = 1, pageSize = 10) {
    const response = await api.get(
        `/top-headlines?category=${query}&page=${page}&pageSize=${pageSize}&sortBy=publishedAt&apiKey=${process.env.EXPO_PUBLIC_API_KEY}`
    );
    return {
        ...response.data,
        page,
    };
}

