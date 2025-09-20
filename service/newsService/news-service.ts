import api from "../baseService/api";

export async function getNewsByQuery(query: string, page = 1, pageSize = 10) {
    const response = await api.get(
        `/everything?q=${query}&page=${page}&pageSize=${pageSize}&sortBy=publishedAt&apiKey=6efde79322414e209950be02da6ddbf9`
    );
    return {
        ...response.data,
        page,
    };
}

