import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default function ToolWebView() {
  const { url, name } = useLocalSearchParams<{ url: string; name: string }>();
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Ionicons name="cube-outline" size={18} color="#4568dc" />
          <Text style={styles.title}>{name}</Text>
        </View>
      </View>
      <WebView source={{ uri: decodeURIComponent(url) }} style={{ flex: 1 }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 4,
  },
  backBtn: {
    marginRight: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4568dc',
  },
});
