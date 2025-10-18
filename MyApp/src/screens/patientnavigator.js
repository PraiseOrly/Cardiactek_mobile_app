// File 1: MainNavigator.js
// Main Navigation Structure for Patient Portal

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

// Import all screens (will be created in separate files)
import DashboardScreen from './screens/DashboardScreen';
import SymptomCheckerScreen from './screens/SymptomCheckerScreen';
import MedicationTrackerScreen from './screens/MedicationTrackerScreen';
import VitalsMonitoringScreen from './screens/VitalsMonitoringScreen';
import AppointmentsScreen from './screens/AppointmentsScreen';
import MessagingScreen from './screens/MessagingScreen';
import EducationHubScreen from './screens/EducationHubScreen';
import LifestyleScreen from './screens/LifestyleScreen';
import EmergencyScreen from './screens/EmergencyScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import MedicalRecordsScreen from './screens/MedicalRecordsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator for Health Overview
const HealthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
    <Stack.Screen name="VitalsDetails" component={VitalsMonitoringScreen} />
  </Stack.Navigator>
);

// Stack Navigator for Smart Tools
const ToolsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SymptomChecker" component={SymptomCheckerScreen} />
  </Stack.Navigator>
);

// Stack Navigator for Care
const CareStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Appointments" component={AppointmentsScreen} />
    <Stack.Screen name="Messaging" component={MessagingScreen} />
  </Stack.Navigator>
);

// Stack Navigator for More
const MoreStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MoreMenu" component={MoreMenuScreen} />
    <Stack.Screen name="Medication" component={MedicationTrackerScreen} />
    <Stack.Screen name="Education" component={EducationHubScreen} />
    <Stack.Screen name="Lifestyle" component={LifestyleScreen} />
    <Stack.Screen name="Emergency" component={EmergencyScreen} />
    <Stack.Screen name="Privacy" component={PrivacyScreen} />
    <Stack.Screen name="MedicalRecords" component={MedicalRecordsScreen} />
  </Stack.Navigator>
);

// More Menu Screen
const MoreMenuScreen = ({ navigation }) => {
  const menuItems = [
    { icon: 'medical', label: 'Medication Tracker', screen: 'Medication', color: '#10B981' },
    { icon: 'book', label: 'Education Hub', screen: 'Education', color: '#8B5CF6' },
    { icon: 'fitness', label: 'Lifestyle & Rehab', screen: 'Lifestyle', color: '#F59E0B' },
    { icon: 'alert-circle', label: 'Emergency Access', screen: 'Emergency', color: '#EF4444' },
    { icon: 'shield-checkmark', label: 'Privacy & Records', screen: 'Privacy', color: '#6366F1' },
    { icon: 'document-text', label: 'Medical Records', screen: 'MedicalRecords', color: '#3B82F6' },
  ];

  return (
    <View style={styles.moreContainer}>
      <View style={styles.moreHeader}>
        <Text style={styles.moreTitle}>More Features</Text>
        <Text style={styles.moreSubtitle}>Access all CardiacTek tools</Text>
      </View>
      <View style={styles.menuGrid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuCard, { borderLeftColor: item.color }]}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View style={[styles.menuIconContainer, { backgroundColor: item.color + '20' }]}>
              <Ionicons name={item.icon} size={28} color={item.color} />
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// Main Tab Navigator
const PatientPortalNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Health') iconName = focused ? 'heart' : 'heart-outline';
            else if (route.name === 'Tools') iconName = focused ? 'flask' : 'flask-outline';
            else if (route.name === 'Care') iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            else if (route.name === 'More') iconName = focused ? 'grid' : 'grid-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2563EB',
          tabBarInactiveTintColor: '#9CA3AF',
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
        })}
      >
        <Tab.Screen name="Health" component={HealthStack} />
        <Tab.Screen name="Tools" component={ToolsStack} />
        <Tab.Screen name="Care" component={CareStack} />
        <Tab.Screen name="More" component={MoreStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  moreContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  moreHeader: {
    backgroundColor: '#2563EB',
    padding: 24,
    paddingTop: 60,
  },
  moreTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  moreSubtitle: {
    fontSize: 14,
    color: '#DBEAFE',
  },
  menuGrid: {
    padding: 16,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
});

export default PatientPortalNavigator;