import { ExternalPathString, Link, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text } from "react-native";

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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {urlToImage && (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      )}
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.content}>{content}</Text>

      {url && (
        <Link href={url as ExternalPathString} style={styles.link}>
          Saiba Mais
        </Link>
      )}
    </ScrollView>
  );
};

export default NewsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
  },
  content: {
    fontSize: 14,
    color: "#555",
  },
  link: {
    fontSize: 14,
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 12,
  },
});
