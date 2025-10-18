// File 3: SymptomCheckerScreen.js
// AI-powered Symptom Checker & Virtual Assistant

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SymptomCheckerScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('checker'); // 'checker', 'chat', 'education'
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      text: "Hello! I'm your CardiacTek AI assistant. How can I help you today?",
      time: '10:30 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

  const commonSymptoms = [
    { id: 1, name: 'Chest Pain', icon: 'body', severity: 'high', color: '#EF4444' },
    { id: 2, name: 'Shortness of Breath', icon: 'fitness', severity: 'high', color: '#EF4444' },
    { id: 3, name: 'Rapid Heartbeat', icon: 'pulse', severity: 'medium', color: '#F59E0B' },
    { id: 4, name: 'Dizziness', icon: 'sync', severity: 'medium', color: '#F59E0B' },
    { id: 5, name: 'Fatigue', icon: 'bed', severity: 'low', color: '#10B981' },
    { id: 6, name: 'Swelling', icon: 'water', severity: 'medium', color: '#F59E0B' },
    { id: 7, name: 'Nausea', icon: 'sad', severity: 'low', color: '#10B981' },
    { id: 8, name: 'Sweating', icon: 'thermometer', severity: 'medium', color: '#F59E0B' },
  ];

  const educationArticles = [
    {
      id: 1,
      title: 'Understanding Heart Palpitations',
      category: 'Symptoms',
      readTime: '5 min',
      bookmarked: false,
    },
    {
      id: 2,
      title: 'Managing Chest Discomfort',
      category: 'Treatment',
      readTime: '7 min',
      bookmarked: false,
    },
    {
      id: 3,
      title: 'Breathing Exercises for Heart Health',
      category: 'Lifestyle',
      readTime: '4 min',
      bookmarked: true,
    },
  ];

  const quickQuestions = [
    'What causes chest pain?',
    'When should I see a doctor?',
    'How to manage palpitations?',
    'Is my medication causing side effects?',
  ];

  const toggleSymptom = (symptomId) => {
    if (selectedSymptoms.includes(symptomId)) {
      setSelectedSymptoms(selectedSymptoms.filter((id) => id !== symptomId));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    }
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        type: 'user',
        text: inputText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages([...chatMessages, newMessage]);
      setInputText('');

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: chatMessages.length + 2,
          type: 'assistant',
          text: "Based on your symptoms, I recommend consulting with your doctor. In the meantime, try to rest and monitor your condition. Would you like me to schedule an appointment?",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setChatMessages((prev) => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const analyzeSymptoms = () => {
    if (selectedSymptoms.length === 0) return;
    
    // Navigate to results or show analysis
    console.log('Analyzing symptoms:', selectedSymptoms);
    alert('Analysis complete! Based on your symptoms, we recommend consulting with your cardiologist within 24 hours.');
  };

  const toggleBookmark = (articleId) => {
    if (bookmarkedArticles.includes(articleId)) {
      setBookmarkedArticles(bookmarkedArticles.filter((id) => id !== articleId));
    } else {
      setBookmarkedArticles([...bookmarkedArticles, articleId]);
    }
  };

  const renderSymptomChecker = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Emergency Warning */}
      <View style={styles.emergencyBanner}>
        <Ionicons name="warning" size={20} color="#DC2626" />
        <Text style={styles.emergencyText}>
          If you're experiencing severe chest pain or difficulty breathing, call 911 immediately.
        </Text>
      </View>

      {/* Instructions */}
      <View style={styles.instructionCard}>
        <Text style={styles.instructionTitle}>Select Your Symptoms</Text>
        <Text style={styles.instructionText}>
          Choose all symptoms you're currently experiencing. Our AI will provide guidance based on your selection.
        </Text>
      </View>

      {/* Symptom Grid */}
      <View style={styles.symptomGrid}>
        {commonSymptoms.map((symptom) => {
          const isSelected = selectedSymptoms.includes(symptom.id);
          return (
            <TouchableOpacity
              key={symptom.id}
              style={[
                styles.symptomCard,
                isSelected && styles.symptomCardSelected,
                { borderLeftColor: symptom.color },
              ]}
              onPress={() => toggleSymptom(symptom.id)}
            >
              <View style={[styles.symptomIconContainer, { backgroundColor: symptom.color + '20' }]}>
                <Ionicons name={symptom.icon} size={24} color={symptom.color} />
              </View>
              <View style={styles.symptomInfo}>
                <Text style={[styles.symptomName, isSelected && styles.symptomNameSelected]}>
                  {symptom.name}
                </Text>
                <View style={[styles.severityBadge, styles[`severity_${symptom.severity}`]]}>
                  <Text style={styles.severityText}>{symptom.severity}</Text>
                </View>
              </View>
              {isSelected && (
                <Ionicons name="checkmark-circle" size={24} color="#2563EB" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Additional Details */}
      <View style={styles.detailsCard}>
        <Text style={styles.detailsLabel}>Additional Details (Optional)</Text>
        <TextInput
          style={styles.detailsInput}
          placeholder="Describe your symptoms in more detail..."
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      {/* Analyze Button */}
      {selectedSymptoms.length > 0 && (
        <TouchableOpacity style={styles.analyzeButton} onPress={analyzeSymptoms}>
          <Ionicons name="analytics" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.analyzeButtonText}>Analyze Symptoms</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );

  const renderChat = () => (
    <View style={styles.chatContainer}>
      <FlatList
        data={chatMessages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.type === 'user' ? styles.userMessage : styles.assistantMessage,
            ]}
          >
            {item.type === 'assistant' && (
              <View style={styles.assistantAvatar}>
                <Ionicons name="robot" size={20} color="#2563EB" />
              </View>
            )}
            <View
              style={[
                styles.messageBubble,
                item.type === 'user' ? styles.userBubble : styles.assistantBubble,
              ]}
            >
              <Text style={[styles.messageText, item.type === 'user' && styles.userMessageText]}>
                {item.text}
              </Text>
              <Text
                style={[styles.messageTime, item.type === 'user' && styles.userMessageTime]}
              >
                {item.time}
              </Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.chatList}
      />

      {/* Quick Questions */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickQuestions}>
        {quickQuestions.map((question, index) => (
          <TouchableOpacity
            key={index}
            style={styles.quickQuestionButton}
            onPress={() => setInputText(question)}
          >
            <Text style={styles.quickQuestionText}>{question}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.chatInputContainer}>
        <TextInput
          style={styles.chatInput}
          placeholder="Ask me anything..."
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEducation = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search health topics..."
        />
      </View>

      <View style={styles.categoryTabs}>
        {['All', 'Symptoms', 'Treatment', 'Lifestyle', 'Prevention'].map((cat, index) => (
          <TouchableOpacity key={index} style={[styles.categoryTab, index === 0 && styles.categoryTabActive]}>
            <Text style={[styles.categoryTabText, index === 0 && styles.categoryTabTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {educationArticles.map((article) => (
        <View key={article.id} style={styles.articleCard}>
          <View style={styles.articleHeader}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{article.category}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleBookmark(article.id)}>
              <Ionicons
                name={bookmarkedArticles.includes(article.id) ? 'bookmark' : 'bookmark-outline'}
                size={20}
                color="#2563EB"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.articleTitle}>{article.title}</Text>
          <View style={styles.articleFooter}>
            <View style={styles.readTime}>
              <Ionicons name="time-outline" size={14} color="#6B7280" />
              <Text style={styles.readTimeText}>{article.readTime}</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.readMoreText}>Read More</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.requestTopicButton}>
        <Ionicons name="add-circle-outline" size={20} color="#2563EB" />
        <Text style={styles.requestTopicText}>Request a Topic</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Health Assistant</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'checker' && styles.activeTab]}
          onPress={() => setActiveTab('checker')}
        >
          <Ionicons
            name="fitness"
            size={20}
            color={activeTab === 'checker' ? '#2563EB' : '#9CA3AF'}
          />
          <Text style={[styles.tabText, activeTab === 'checker' && styles.activeTabText]}>
            Symptom Checker
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'chat' && styles.activeTab]}
          onPress={() => setActiveTab('chat')}
        >
          <Ionicons
            name="chatbubbles"
            size={20}
            color={activeTab === 'chat' ? '#2563EB' : '#9CA3AF'}
          />
          <Text style={[styles.tabText, activeTab === 'chat' && styles.activeTabText]}>
            Chat Assistant
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'education' && styles.activeTab]}
          onPress={() => setActiveTab('education')}
        >
          <Ionicons
            name="book"
            size={20}
            color={activeTab === 'education' ? '#2563EB' : '#9CA3AF'}
          />
          <Text style={[styles.tabText, activeTab === 'education' && styles.activeTabText]}>
            Learn
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === 'checker' && renderSymptomChecker()}
        {activeTab === 'chat' && renderChat()}
        {activeTab === 'education' && renderEducation()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#2563EB',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  tabText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#2563EB',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  emergencyBanner: {
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  emergencyText: {
    flex: 1,
    fontSize: 12,
    color: '#991B1B',
    marginLeft: 8,
    fontWeight: '600',
  },
  instructionCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  symptomGrid: {
    marginBottom: 16,
  },
  symptomCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  symptomCardSelected: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
  },
  symptomIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  symptomInfo: {
    flex: 1,
  },
  symptomName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  symptomNameSelected: {
    color: '#2563EB',
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  severity_high: {
    backgroundColor: '#FEE2E2',
  },
  severity_medium: {
    backgroundColor: '#FEF3C7',
  },
  severity_low: {
    backgroundColor: '#D1FAE5',
  },
  severityText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1F2937',
    textTransform: 'uppercase',
  },
  detailsCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  detailsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  detailsInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#1F2937',
    minHeight: 100,
  },
  analyzeButton: {
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  analyzeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  chatContainer: {
    flex: 1,
  },
  chatList: {
    paddingBottom: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  assistantMessage: {
    justifyContent: 'flex-start',
  },
  assistantAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: '#2563EB',
    borderTopRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
  },
  userMessageText: {
    color: '#fff',
  },
  messageTime: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
  },
  userMessageTime: {
    color: '#DBEAFE',
  },
  quickQuestions: {
    marginVertical: 12,
  },
  quickQuestionButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  quickQuestionText: {
    fontSize: 12,
    color: '#374151',
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chatInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#2563EB',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
  },
  categoryTabs: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  categoryTabActive: {
    backgroundColor: '#2563EB',
  },
  categoryTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  categoryTabTextActive: {
    color: '#fff',
  },
  articleCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  readTimeText: {
    fontSize: 12,
    color: '#6B7280',
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
  },
  requestTopicButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    gap: 8,
  },
  requestTopicText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
  },
});

export default SymptomCheckerScreen;