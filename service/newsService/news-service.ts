import api from "../baseService/api";

export async function getNewsByQuery(query: string, page = 1, pageSize = 10) {
    const response = await api.get(
        `/everything?q=${query}&page=${page}&pageSize=${pageSize}&apiKey=aa107396da7c429a8a24c371b6dcf41a`
    );
    return {
        ...response.data,
        page,
    };
}

