// File 5: VitalsMonitoringScreen.js
// Vitals Monitoring with wearable sync and AI insights

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const VitalsMonitoringScreen = ({ navigation }) => {
  const [selectedVital, setSelectedVital] = useState('heartRate');
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualValues, setManualValues] = useState({});

  const connectedDevices = [
    { id: 1, name: 'Apple Watch Series 9', type: 'watch', connected: true, lastSync: '2 min ago' },
    { id: 2, name: 'Omron BP Monitor', type: 'bp', connected: true, lastSync: '1 hour ago' },
    { id: 3, name: 'Fitbit Charge 6', type: 'fitness', connected: false, lastSync: '2 days ago' },
  ];

  const vitalsData = {
    heartRate: {
      current: 72,
      unit: 'bpm',
      status: 'normal',
      trend: 'stable',
      icon: 'heart',
      color: '#EF4444',
      history: [68, 70, 72, 71, 73, 72, 71],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      range: { min: 60, max: 100 },
    },
    bloodPressure: {
      current: '120/80',
      unit: 'mmHg',
      status: 'normal',
      trend: 'improving',
      icon: 'fitness',
      color: '#3B82F6',
      systolicHistory: [122, 120, 118, 120, 119, 120, 121],
      diastolicHistory: [82, 80, 78, 80, 79, 80, 81],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      range: { systolic: { min: 90, max: 120 }, diastolic: { min: 60, max: 80 } },
    },
    oxygen: {
      current: 98,
      unit: '%',
      status: 'normal',
      trend: 'stable',
      icon: 'speedometer',
      color: '#10B981',
      history: [97, 98, 98, 97, 98, 98, 98],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      range: { min: 95, max: 100 },
    },
    weight: {
      current: 175,
      unit: 'lbs',
      status: 'normal',
      trend: 'decreasing',
      icon: 'scale',
      color: '#8B5CF6',
      history: [178, 177, 176, 176, 175, 175, 175],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      range: { min: 160, max: 180 },
    },
  };

  const aiInsights = [
    {
      type: 'positive',
      title: 'Great Progress!',
      message: 'Your blood pressure has improved by 5% this week.',
      icon: 'trending-up',
      color: '#10B981',
    },
    {
      type: 'warning',
      title: 'Attention Needed',
      message: 'Your resting heart rate has been elevated in the evenings.',
      icon: 'alert-circle',
      color: '#F59E0B',
    },
    {
      type: 'tip',
      title: 'Health Tip',
      message: 'Consider measuring your BP at the same time daily for