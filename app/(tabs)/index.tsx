import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  Image,
  Dimensions,
  Linking,
  StatusBar
} from 'react-native';
import { useRouter } from 'expo-router';
import { data } from '@/data/toolsData';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [selectedProfession, setSelectedProfession] = useState<any | null>(null);

  useEffect(() => {
    if (data.professions.length > 0) {
      setSelectedProfession(data.professions[0]);
    }
  }, []);

  const handleProfessionSelect = (name: string) => {
    const prof = data.professions.find(p => p.name === name);
    setSelectedProfession(prof);
  };

  const getAvatarInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const getRandomColor = (index: number) => {
    const colors = [
      ['#4568dc', '#b06ab3'], 
      ['#2193b0', '#6dd5ed'], 
      ['#834d9b', '#d04ed6'], 
      ['#36d1dc', '#5b86e5'], 
      ['#5614b0', '#dbd65c'], 
      ['#1565C0', '#b92b27'], 
    ];
    return colors[index % colors.length];
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerContainer}>
        <LinearGradient
          colors={['#3a1c71', '#d76d77', '#ffaf7b']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <View style={styles.logoContainer}>
              <Ionicons name="cube" size={28} color="#ffffff" />
              <Text style={styles.headerTitle}>Abordi AI</Text>
            </View>
            <Text style={styles.headerSubtitle}>Smart tools for professionals</Text>
            
            <View style={styles.searchBar}>
              <Ionicons name="search-outline" size={18} color="#666" style={styles.searchIcon} />
              <Text style={styles.searchPlaceholder}>Search AI tools</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Choose Your Profession</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.professionScrollView}
          >
            {data.professions.map((p, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.professionBtn,
                  selectedProfession?.name === p.name && styles.selectedProfessionBtn
                ]}
                onPress={() => handleProfessionSelect(p.name)}
              >
                <LinearGradient
                  colors={getRandomColor(idx)}
                  style={styles.professionAvatar}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.avatarText}>{getAvatarInitial(p.name)}</Text>
                </LinearGradient>
                <Text style={[
                  styles.professionText,
                  selectedProfession?.name === p.name && styles.selectedProfessionText
                ]}>
                  {p.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {selectedProfession && (
          <>
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeaderContainer}>
                <View style={styles.sectionIconContainer}>
                  <Ionicons name="apps" size={18} color="#ffffff" />
                </View>
                <Text style={styles.sectionTitle}>Recommended AI Tools</Text>
              </View>
              
              {selectedProfession.tools.map((tool: any, index: number) => (
                <View key={index} style={styles.card}>
                  <View style={styles.toolHeader}>
                    <View style={[styles.toolIconContainer, { backgroundColor: getRandomColor(index)[0] }]}>
                      <Ionicons name="cube-outline" size={22} color="#ffffff" />
                    </View>
                    <Text style={styles.toolTitle}>{tool.name}</Text>
                  </View>
                  <Text style={styles.toolDescription}>{tool.description}</Text>
                  <TouchableOpacity
                    style={styles.openBtn}
                    onPress={() => router.push({
                      pathname: '/webview',
                      params: { url: encodeURIComponent(tool.url), name: tool.name },
                    })}
                  >
                    <Text style={styles.openText}>Open Tool</Text>
                    <Ionicons name="arrow-forward" size={16} color="#ffffff" style={{ marginLeft: 6 }} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeaderContainer}>
                <View style={[styles.sectionIconContainer, { backgroundColor: '#4CAF50' }]}>
                  <Ionicons name="document-text" size={18} color="#ffffff" />
                </View>
                <Text style={styles.sectionTitle}>Recommended Prompts</Text>
              </View>
              
              {selectedProfession.prompts.map((prompt: any, idx: number) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.promptBtn}
                  onPress={() => {
                    const chatGPTURL = `https://chat.openai.com/?model=gpt-4&prompt=${encodeURIComponent(prompt.title)}`;
                    router.push({
                      pathname: '/webview',
                      params: {
                        url: chatGPTURL,
                        title: prompt.title
                      }
                    });
                  }}
                  
                >
                  <Ionicons name="file-tray-full-outline" size={20} color="#4568dc" style={styles.promptIcon} />
                  <Text style={styles.promptText}>{prompt.title}</Text>
                  <Ionicons name="chevron-forward" size={18} color="#4568dc" />
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Abordi AI - Smart tools for professionals</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    overflow: 'hidden',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  headerGradient: {
    paddingTop: 20,
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchPlaceholder: {
    color: '#888',
    fontSize: 15,
  },
  sectionContainer: {
    padding: 16,
    margin: 16,
    marginBottom: 8,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4568dc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  professionScrollView: {
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  professionBtn: {
    alignItems: 'center',
    marginRight: 16,
    width: 85,
  },
  selectedProfessionBtn: {
    transform: [{ scale: 1.05 }],
  },
  professionAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  professionText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#555',
    textAlign: 'center',
  },
  selectedProfessionText: {
    color: '#4568dc',
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  toolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  toolIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4568dc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  toolTitle: {
    fontWeight: '700',
    fontSize: 18,
    color: '#333',
    flex: 1,
  },
  toolDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: '#666',
    marginBottom: 16,
  },
  openBtn: {
    backgroundColor: '#4568dc',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    shadowColor: '#4568dc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  openText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
  promptBtn: {
    backgroundColor: '#f6f8ff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e6efff',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  promptIcon: {
    marginRight: 14,
  },
  promptText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    color: '#888',
    fontSize: 14,
  }
});