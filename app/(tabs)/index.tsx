import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ActivityIndicator, Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native";

import { NewsList } from "../../components/NewsList";
import { getNewsByQuery } from "../../service/newsService/news-service";

const Home = () => {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["everything", searchQuery],
    queryFn: ({ pageParam = 1 }) =>
      getNewsByQuery(searchQuery || "animes", pageParam, 10),
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

  const articles = data?.pages.flatMap((page) => page.articles) || [];

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <ActivityIndicator size="large" color="#4c669f" />
        <Text className="mt-2 text-base text-[#4c669f]">Loading news...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-base text-[#d9534f] text-center">
          {`Error: ${error.message}`}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-primary">
      <Text className="text-2xl font-bold mb-4 text-center text-light-100">
        Últimas notícias
      </Text>

      <View className="flex-row mb-2">
        <TextInput
          placeholderTextColor={"#151312"}
          className="flex-1 p-2 rounded-lg bg-white mr-2 border border-[#ccc]"
          placeholder="Search for news..."
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
