import axios, { AxiosInstance, isAxiosError } from "axios";
import Toast from "react-native-toast-message";

const api: AxiosInstance = axios.create({
    baseURL: "https://newsapi.org/v2",
});

const handleError = async (error: unknown) => {
    let message = "Ocorreu um erro inesperado";

    try {
        if (isAxiosError(error)) {
            const data = error.response?.data as { message?: string; error?: string };

            if (error.response) {
                message = data?.message || data?.error || `Erro ${error.response.status}: Não foi possível carregar os dados`;
            } else if (error.request) {
                message = "O servidor não respondeu. Tente novamente mais tarde.";
            } else {
                message = "Falha na configuração da requisição";
            }
        } else if (error instanceof Error) {
            message = error.message || "Erro inesperado ocorreu";
        }
    } catch {
        message = "Erro ao verificar conexão de rede";
    }

    Toast.show({
        type: "error",
        text1: message,
    });

    return Promise.reject(error);
};

const registerInterceptor = (apiInstance: AxiosInstance) => {
    apiInstance.interceptors.response.use(
        (response) => response,
        handleError
    );
};

registerInterceptor(api);

export default api;
