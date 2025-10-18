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
      message: 'Consider measuring your BP at the same time daily for consistency.',
      icon: 'bulb',
      color: '#2563EB',
    },
  ];

  const handleSyncDevice = (deviceId) => {
    console.log(`Syncing device ${deviceId}`);
    alert('Device syncing...');
  };

  const handleManualEntry = () => {
    console.log('Manual entry:', manualValues);
    setShowManualEntry(false);
    setManualValues({});
    alert('Vitals recorded successfully!');
  };

  const handleAlertDoctor = (vital) => {
    console.log(`Alerting doctor about ${vital}`);
    alert('Alert sent to your healthcare provider');
  };

  const renderChart = () => {
    const vital = vitalsData[selectedVital];
    let chartData;

    if (selectedVital === 'bloodPressure') {
      chartData = {
        labels: vital.labels,
        datasets: [
          {
            data: vital.systolicHistory,
            color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
            strokeWidth: 2,
          },
          {
            data: vital.diastolicHistory,
            color: (opacity = 1) => `rgba(147, 197, 253, ${opacity})`,
            strokeWidth: 2,
          },
        ],
        legend: ['Systolic', 'Diastolic'],
      };
    } else {
      chartData = {
        labels: vital.labels,
        datasets: [
          {
            data: vital.history,
            color: (opacity = 1) => `${vital.color}${Math.round(opacity * 255).toString(16)}`,
            strokeWidth: 2,
          },
        ],
      };
    }

    return (
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 48}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => vital.color.replace(')', `, ${opacity})`).replace('#', 'rgba(').replace(/^rgba\((.*)\)$/, (m, p1) => {
            const hex = vital.color.replace('#', '');
            const r = parseInt(hex.substr(0, 2), 16);
            const g = parseInt(hex.substr(2, 2), 16);
            const b = parseInt(hex.substr(4, 2), 16);
            return `rgba(${r}, ${g}, ${b}, ${opacity})`;
          }),
          labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
          propsForDots: {
            r: '5',
            strokeWidth: '2',
          },
        }}
        bezier
        style={styles.chart}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vitals Monitoring</Text>
        <TouchableOpacity onPress={() => setShowManualEntry(true)}>
          <Ionicons name="add-circle-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Connected Devices */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connected Devices</Text>
          {connectedDevices.map((device) => (
            <View key={device.id} style={styles.deviceCard}>
              <View style={[styles.deviceIcon, !device.connected && styles.deviceDisconnected]}>
                <Ionicons
                  name={device.type === 'watch' ? 'watch' : device.type === 'bp' ? 'fitness' : 'watch'}
                  size={24}
                  color={device.connected ? '#10B981' : '#9CA3AF'}
                />
              </View>
              <View style={styles.deviceInfo}>
                <Text style={styles.deviceName}>{device.name}</Text>
                <Text style={styles.deviceSync}>Last sync: {device.lastSync}</Text>
              </View>
              <TouchableOpacity
                style={[styles.syncButton, !device.connected && styles.syncButtonDisabled]}
                onPress={() => handleSyncDevice(device.id)}
              >
                <Ionicons
                  name="sync"
                  size={16}
                  color={device.connected ? '#2563EB' : '#9CA3AF'}
                />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.addDeviceButton}>
            <Ionicons name="add" size={20} color="#2563EB" />
            <Text style={styles.addDeviceText}>Add New Device</Text>
          </TouchableOpacity>
        </View>

        {/* AI Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Health Insights</Text>
          {aiInsights.map((insight, index) => (
            <View key={index} style={[styles.insightCard, { borderLeftColor: insight.color }]}>
              <View style={[styles.insightIcon, { backgroundColor: insight.color + '20' }]}>
                <Ionicons name={insight.icon} size={20} color={insight.color} />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>{insight.title}</Text>
                <Text style={styles.insightMessage}>{insight.message}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Vital Signs Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Track Your Vitals</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.vitalSelector}>
            {Object.keys(vitalsData).map((key) => {
              const vital = vitalsData[key];
              const isSelected = selectedVital === key;
              return (
                <TouchableOpacity
                  key={key}
                  style={[styles.vitalSelectorCard, isSelected && styles.vitalSelectorCardActive]}
                  onPress={() => setSelectedVital(key)}
                >
                  <View style={[styles.vitalSelectorIcon, { backgroundColor: vital.color + '20' }]}>
                    <Ionicons name={vital.icon} size={24} color={vital.color} />
                  </View>
                  <Text style={[styles.vitalSelectorLabel, isSelected && styles.vitalSelectorLabelActive]}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Text>
                  <Text style={[styles.vitalSelectorValue, isSelected && styles.vitalSelectorValueActive]}>
                    {vital.current}
                  </Text>
                  <Text style={styles.vitalSelectorUnit}>{vital.unit}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Current Vital Details */}
        <View style={styles.section}>
          <View style={styles.vitalDetailCard}>
            <View style={styles.vitalDetailHeader}>
              <View>
                <Text style={styles.vitalDetailLabel}>
                  {selectedVital.replace(/([A-Z])/g, ' $1').trim()}
                </Text>
                <View style={styles.vitalDetailValueContainer}>
                  <Text style={[styles.vitalDetailValue, { color: vitalsData[selectedVital].color }]}>
                    {vitalsData[selectedVital].current}
                  </Text>
                  <Text style={styles.vitalDetailUnit}>{vitalsData[selectedVital].unit}</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, styles[`status_${vitalsData[selectedVital].status}`]]}>
                <Text style={styles.statusText}>{vitalsData[selectedVital].status}</Text>
              </View>
            </View>

            <View style={styles.trendContainer}>
              <Ionicons
                name={vitalsData[selectedVital].trend === 'improving' || vitalsData[selectedVital].trend === 'decreasing' ? 'trending-down' : vitalsData[selectedVital].trend === 'stable' ? 'remove' : 'trending-up'}
                size={16}
                color={vitalsData[selectedVital].trend === 'improving' || vitalsData[selectedVital].trend === 'stable' ? '#10B981' : '#F59E0B'}
              />
              <Text style={styles.trendText}>
                {vitalsData[selectedVital].trend.charAt(0).toUpperCase() + vitalsData[selectedVital].trend.slice(1)}
              </Text>
            </View>

            {/* Chart */}
            <View style={styles.chartContainer}>
              {renderChart()}
            </View>

            {/* Normal Range */}
            <View style={styles.rangeContainer}>
              <Text style={styles.rangeLabel}>Normal Range:</Text>
              <Text style={styles.rangeValue}>
                {selectedVital === 'bloodPressure'
                  ? `${vitalsData[selectedVital].range.systolic.min}-${vitalsData[selectedVital].range.systolic.max} / ${vitalsData[selectedVital].range.diastolic.min}-${vitalsData[selectedVital].range.diastolic.max} mmHg`
                  : `${vitalsData[selectedVital].range.min}-${vitalsData[selectedVital].range.max} ${vitalsData[selectedVital].unit}`}
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleAlertDoctor(selectedVital)}
              >
                <Ionicons name="alert-circle-outline" size={20} color="#EF4444" />
                <Text style={styles.actionButtonText}>Alert Doctor</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="download-outline" size={20} color="#2563EB" />
                <Text style={styles.actionButtonText}>Export Data</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Recent Readings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Readings</Text>
          {['Today 8:30 AM', 'Today 12:45 PM', 'Yesterday 8:00 AM'].map((time, index) => (
            <View key={index} style={styles.readingCard}>
              <View style={styles.readingTimeContainer}>
                <Ionicons name="time-outline" size={16} color="#6B7280" />
                <Text style={styles.readingTime}>{time}</Text>
              </View>
              <Text style={styles.readingValue}>
                {vitalsData[selectedVital].history[index] || vitalsData[selectedVital].current} {vitalsData[selectedVital].unit}
              </Text>
              <View style={[styles.readingStatus, styles.status_normal]}>
                <Text style={styles.readingStatusText}>Normal</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Manual Entry Modal */}
      <Modal
        visible={showManualEntry}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowManualEntry(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Manual Entry</Text>
              <TouchableOpacity onPress={() => setShowManualEntry(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Heart Rate (bpm)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="72"
                  keyboardType="numeric"
                  value={manualValues.heartRate}
                  onChangeText={(value) => setManualValues({ ...manualValues, heartRate: value })}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Blood Pressure (Systolic/Diastolic)</Text>
                <View style={styles.bpInputContainer}>
                  <TextInput
                    style={[styles.input, styles.bpInput]}
                    placeholder="120"
                    keyboardType="numeric"
                    value={manualValues.systolic}
                    onChangeText={(value) => setManualValues({ ...manualValues, systolic: value })}
                  />
                  <Text style={styles.bpSeparator}>/</Text>
                  <TextInput
                    style={[styles.input, styles.bpInput]}
                    placeholder="80"
                    keyboardType="numeric"
                    value={manualValues.diastolic}
                    onChangeText={(value) => setManualValues({ ...manualValues, diastolic: value })}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Oxygen Saturation (%)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="98"
                  keyboardType="numeric"
                  value={manualValues.oxygen}
                  onChangeText={(value) => setManualValues({ ...manualValues, oxygen: value })}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Weight (lbs)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="175"
                  keyboardType="numeric"
                  value={manualValues.weight}
                  onChangeText={(value) => setManualValues({ ...manualValues, weight: value })}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Notes (Optional)</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Any observations..."
                  multiline
                  numberOfLines={3}
                  value={manualValues.notes}
                  onChangeText={(value) => setManualValues({ ...manualValues, notes: value })}
                />
              </View>

              <TouchableOpacity style={styles.submitButton} onPress={handleManualEntry}>
                <Text style={styles.submitButtonText}>Save Readings</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#3B82F6',
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
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  deviceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  deviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  deviceDisconnected: {
    backgroundColor: '#F3F4F6',
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  deviceSync: {
    fontSize: 12,
    color: '#6B7280',
  },
  syncButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  syncButtonDisabled: {
    backgroundColor: '#F3F4F6',
  },
  addDeviceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  addDeviceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
  },
  insightCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  insightMessage: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  vitalSelector: {
    flexDirection: 'row',
  },
  vitalSelectorCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 140,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  vitalSelectorCardActive: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  vitalSelectorIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  vitalSelectorLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    textAlign: 'center',
  },
  vitalSelectorLabelActive: {
    color: '#2563EB',
    fontWeight: '600',
  },
  vitalSelectorValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  vitalSelectorValueActive: {
    color: '#2563EB',
  },
  vitalSelectorUnit: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  vitalDetailCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  vitalDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  vitalDetailLabel: {
    fontSize: 14,
    color: '#6B7280',
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  vitalDetailValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  vitalDetailValue: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  vitalDetailUnit: {
    fontSize: 16,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  status_normal: {
    backgroundColor: '#D1FAE5',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#065F46',
    textTransform: 'capitalize',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  trendText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
  chartContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  chart: {
    borderRadius: 16,
  },
  rangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  rangeLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginRight: 8,
  },
  rangeValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    gap: 6,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  readingCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  readingTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  readingTime: {
    fontSize: 13,
    color: '#6B7280',
  },
  readingValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginHorizontal: 12,
  },
  readingStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  readingStatusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#065F46',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#fff',
  },
  bpInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bpInput: {
    flex: 1,
  },
  bpSeparator: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default VitalsMonitoringScreen;