import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Tabs } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function TabLayout() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            headerShown: false,
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => <MaterialIcons name="home" size={28} color={color} />,
            }}
          />
        </Tabs>
      </SafeAreaView>
    </QueryClientProvider>

  );
}
