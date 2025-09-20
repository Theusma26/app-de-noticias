import { ExternalPathString, Link, router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const NewsDetails = () => {
  const { title, content, urlToImage, description, url } =
    useLocalSearchParams<{
      title?: string;
      content?: string;
      urlToImage?: string | string[];
      description?: string;
      url?: string;
    }>();

  const imageUrl =
    typeof urlToImage === "string" ? urlToImage : urlToImage?.[0];

  return (
    <View className="flex-1 bg-primary">
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-4 text-center text-light-100">{title}</Text>

        {urlToImage && (
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-52 rounded-lg mb-4"
          />
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
