import React from 'react';
import { 
  View, 
  Text, 
  Linking, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { data } from '@/data/toolsData';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function ToolsScreen() {
  const { prompt, profession } = useLocalSearchParams<{ prompt: string; profession: string }>();
  const router = useRouter();
  
  const professionData = data.professions.find(p => p.name === profession);
  
  const tools = professionData?.tools || 
    data.professions.flatMap(p => p.tools).filter((tool, index, self) => 
      index === self.findIndex(t => t.name === tool.name)
    );
  
  const promptData = professionData?.prompts.find(p => p.title === prompt);

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
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={22} color="#ffffff" />
            </TouchableOpacity>
            
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>
                {prompt || (profession ? `${profession} Tools` : 'All Tools')}
              </Text>
              <Text style={styles.headerSubtitle}>
                {promptData?.title ? 'Recommended for this prompt' : 'Tools to enhance your workflow'}
              </Text>
            </View>
            
            <TouchableOpacity style={styles.headerAction}>
              <Ionicons name="options-outline" size={22} color="#ffffff" />
            </TouchableOpacity>
          </View>
          
          {promptData && (
            <View style={styles.promptPreview}>
              <Ionicons name="bulb-outline" size={18} color="#ffffff" style={styles.promptIcon} />
              <Text numberOfLines={1} style={styles.promptPreviewText}>
                {promptData.title}
              </Text>
            </View>
          )}
        </LinearGradient>
      </View>

      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {promptData && (
          <View style={styles.promptContainer}>
            <View style={styles.promptHeader}>
              <View style={styles.promptIconContainer}>
                <Ionicons name="bulb-outline" size={20} color="#ffffff" />
              </View>
              <Text style={styles.promptTitle}>About this prompt</Text>
            </View>
            <Text style={styles.promptDescription}>
              {promptData.title}
            </Text>
          </View>
        )}
        
        <View style={styles.toolsHeaderContainer}>
          <View style={styles.toolsIconContainer}>
            <Ionicons name="grid-outline" size={20} color="#ffffff" />
          </View>
          <Text style={styles.toolsHeaderText}>
            {tools.length > 0 ? 'Recommended Tools' : 'No tools available'}
          </Text>
        </View>

        {tools.map((tool, index) => (
          <View key={index} style={styles.toolCard}>
            <View style={styles.toolCardHeader}>
              <LinearGradient
                colors={getRandomGradient(index)}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.toolIconContainer}
              >
                <Ionicons name="cube-outline" size={20} color="#ffffff" />
              </LinearGradient>
              <Text style={styles.toolName}>{tool.name}</Text>
            </View>
            
            <Text style={styles.toolDescription}>{tool.description}</Text>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.linkBtn}
                onPress={() => router.push({
                  pathname: '/webview',
                  params: { url: encodeURIComponent(tool.url), name: tool.name },
                })}
              >
                <Text style={styles.linkText}>Open Tool</Text>
                <Ionicons name="open-outline" size={16} color="#ffffff" style={styles.buttonIcon} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.favoriteBtn}>
                <Ionicons name="bookmark-outline" size={20} color="#4568dc" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const getRandomGradient = (index: number): string[] => {
  const gradients = [
    ['#4568dc', '#b06ab3'],
    ['#2193b0', '#6dd5ed'],
    ['#834d9b', '#d04ed6'],
    ['#36d1dc', '#5b86e5'],
    ['#5614b0', '#dbd65c'],
    ['#1565C0', '#b92b27'],
  ];
  return gradients[index % gradients.length];
};

const getRandomColor = (index: number): string => {
  const colors = [
    '#4568dc', 
    '#b06ab3', 
    '#4CAF50', 
    '#FF5722', 
    '#2196F3', 
    '#9C27B0', 
    '#009688', 
    '#E91E63', 
  ];
  return colors[index % colors.length];
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 30,
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
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop:40
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  headerAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  promptPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 8,
  },
  promptIcon: {
    marginRight: 10,
  },
  promptPreviewText: {
    color: '#ffffff',
    flex: 1,
    fontSize: 14,
  },
  promptContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e6efff',
  },
  promptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  promptIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4568dc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  promptTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  promptDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: '#666',
  },
  toolsHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  toolsIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4568dc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  toolsHeaderText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  toolCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  toolCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  toolIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  toolName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  toolDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: '#666',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkBtn: {
    backgroundColor: '#4568dc',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#4568dc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  linkText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
  buttonIcon: {
    marginLeft: 8,
  },
  favoriteBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4ff',
    borderWidth: 1,
    borderColor: '#e0e7ff',
  },
});