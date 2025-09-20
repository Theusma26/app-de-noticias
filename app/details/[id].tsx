import useFavorites from "@/hooks/useFavorites";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ExternalPathString, Link, router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

const NewsDetails = () => {
  const { title, content, urlToImage, description, url } =
    useLocalSearchParams<{
      title: string;
      content: string;
      urlToImage: string;
      description: string;
      url: string;
    }>();

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(url);

  const handleFavoritePress = async () => {
    if (!url) return;

    if (favorite) {
      await removeFavorite(url);
      Toast.show({
        type: "info",
        text1: "Notícia removida",
        text2: "Foi removida dos seus favoritos.",
      });
    } else {
      await addFavorite({ title, url, urlToImage, description, content });
      Toast.show({
        type: "success",
        text1: "Notícia adicionada",
        text2: "Foi adicionada aos seus favoritos.",
      });
    }
  };

  return (
    <View className="flex-1 bg-primary">
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-4 text-center text-light-100">
          {title}
        </Text>

        {urlToImage && (
          <View className="mb-4">
            <Image
              source={{ uri: urlToImage }}
              className="w-full h-52 rounded-lg"
            />

            <TouchableOpacity
              className="absolute bottom-0 right-4"
              onPress={handleFavoritePress}
            >
              <MaterialIcons
                name={favorite ? "favorite" : "favorite-border"}
                size={32}
                color={favorite ? "red" : "white"}
              />
            </TouchableOpacity>
          </View>
        )}

        <Text className="text-base text-light-200 mb-4">{description}</Text>
        <Text className="text-sm text-light-300">{content}</Text>

        {url && (
          <Link
            href={url as ExternalPathString}
            className="text-sm text-blue-600 underline mt-3"
          >
            Saiba Mais
          </Link>
        )}
      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Text className="text-white font-semibold text-base">Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewsDetails;
