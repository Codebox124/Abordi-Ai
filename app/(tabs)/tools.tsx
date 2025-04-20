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
      
      <LinearGradient
        colors={['#4568dc', '#b06ab3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>
            {prompt || (profession ? `${profession} Tools` : 'All AI Tools')}
          </Text>
          <Text style={styles.headerSubtitle}>
            {promptData?.title ? 'Recommended for this prompt' : 'Tools to enhance your workflow'}
          </Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {promptData && (
          <View style={styles.promptContainer}>
            <View style={styles.promptHeader}>
              <Ionicons name="bulb-outline" size={24} color="#4568dc" />
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
              <View style={[
                styles.toolIconContainer, 
                { backgroundColor: getRandomColor(index) }
              ]}>
                <Ionicons name="cube-outline" size={20} color="#ffffff" />
              </View>
              <Text style={styles.toolName}>{tool.name}</Text>
            </View>
            
            <Text style={styles.toolDescription}>{tool.description}</Text>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.linkBtn}
                onPress={() => Linking.openURL(tool.url)}
              >
                <Text style={styles.linkText}>Open Tool</Text>
                <Ionicons name="open-outline" size={16} color="#ffffff" style={styles.buttonIcon} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}


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
  header: {
    paddingTop: 40,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
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
  promptTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
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
    width: 42,
    height: 42,
    borderRadius: 21,
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
    justifyContent: 'flex-start',
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
});