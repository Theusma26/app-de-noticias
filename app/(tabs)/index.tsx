import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native";

import { ErrorScreen } from "@/components/ErrorScreen";
import { Loading } from "@/components/Loading";
import { useNetwork } from "@/context/NetworkContext";
import { Article } from "@/interfaces/articles";
import { getOffline, saveOffline } from "@/utils/modo-offline/offline-mode.utils";
import { NewsList } from "../../components/NewsList";
import { getNewsByQuery } from "../../service/newsService/news-service";

const Home = () => {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { isConnected } = useNetwork();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch
  } = useInfiniteQuery({
    queryKey: ["everything", searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      if (!isConnected) {
        return {
          page: 1,
          totalResults: 0,
          articles: await getOffline(),
        };
      }
      const response = await getNewsByQuery(searchQuery || "animes", pageParam, 10);
      if (pageParam === 1) await saveOffline(response.articles);

      return response;
    },
    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil(lastPage.totalResults / 10);
      return lastPage.page < totalPages ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const handleSearch = () => {
    setSearchQuery(query);
    setQuery("");
    Keyboard.dismiss();
  };

  const handleResetSearch = () => {
    setSearchQuery("");
  };

  const articles: Article[] = data?.pages.flatMap((page) => page.articles) || [];

  if (isLoading) {
    return (
      <Loading />
    );
  }

  if (error) {
    return (
      <ErrorScreen
        message={error instanceof Error ? error.message : "Erro inesperado"}
        onRetry={refetch}
      />
    );
  }

  return (
    <View className="flex-1 p-4 bg-primary">
      {!isConnected && (
        <View className="bg-yellow-500 p-2 mb-4 rounded">
          <Text className="text-center text-black font-medium">
            Você está offline. Mostrando notícias armazenadas.
          </Text>
        </View>
      )}

      <Text className="text-2xl font-bold mb-4 text-center text-light-100">
        Últimas notícias
      </Text>

      <View className="flex-row mb-2">
        <TextInput
          placeholderTextColor={"#151312"}
          className="flex-1 p-2 rounded-lg bg-white mr-2 border border-[#ccc]"
          placeholder="Pesquise por notícias..."
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity
          className="p-2 rounded-lg bg-light-100 justify-center items-center"
          onPress={handleSearch}
        >
          <Text className="text-dark-100 font-bold">Buscar</Text>
        </TouchableOpacity>
      </View>

      {searchQuery.length > 0 && (
        <View className="mb-4 flex-row flex-wrap items-center">
          <View className="flex-row bg-light-100 px-3 py-1 rounded-full self-start items-center">
            <Text className="text-dark-100 font-medium mr-2">{searchQuery}</Text>
            <TouchableOpacity
              onPress={handleResetSearch}
              className="p-1  rounded-full"
            >
              <Text className="text-dark-100 font-bold">×</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <NewsList
        articles={articles}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </View>
  );
};

export default Home;
