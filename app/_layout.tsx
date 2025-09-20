import { NetworkProvider } from "@/context/NetworkContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';
import "./global.css";

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NetworkProvider>
        <SafeAreaProvider>
          <SafeAreaView className="flex-1 bg-primary">
            <StatusBar hidden={true} />
            <Stack>
              <Stack.Screen
                name="(tabs)"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="details/[id]"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="newsByCategory/[newsByCategory]"
                options={{ headerShown: false }}
              />
            </Stack>
          </SafeAreaView>
        </SafeAreaProvider>
        <Toast />
      </NetworkProvider>
    </QueryClientProvider>
  );
}