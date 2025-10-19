// File 4: MedicationTrackerScreen.js
// Medication Tracker with reminders, logging, and drug information

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MedicationTrackerScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('today'); // 'today', 'schedule', 'history'
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: 'Metoprolol',
      dosage: '50mg',
      frequency: 'Twice daily',
      times: ['8:00 AM', '8:00 PM'],
      taken: [true, false],
      skipped: [false, false],
      color: '#EF4444',
      reminders: true,
      refillDate: '2025-11-15',
      pillsRemaining: 45,
      purpose: 'Beta-blocker for high blood pressure',
      sideEffects: ['Dizziness', 'Fatigue', 'Cold hands'],
      precautions: ['Avoid alcohol', 'Monitor blood pressure regularly'],
    },
    {
      id: 2,
      name: 'Aspirin',
      dosage: '81mg',
      frequency: 'Once daily',
      times: ['12:00 PM'],
      taken: [false],
      skipped: [false],
      color: '#3B82F6',
      reminders: true,
      refillDate: '2025-12-01',
      pillsRemaining: 60,
      purpose: 'Blood thinner to prevent clots',
      sideEffects: ['Stomach upset', 'Easy bruising'],
      precautions: ['Take with food', 'Inform doctor of bleeding'],
    },
    {
      id: 3,
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      times: ['8:00 PM'],
      taken: [false],
      skipped: [false],
      color: '#10B981',
      reminders: true,
      refillDate: '2025-11-20',
      pillsRemaining: 30,
      purpose: 'ACE inhibitor for blood pressure',
      sideEffects: ['Dry cough', 'Dizziness'],
      precautions: ['Stay hydrated', 'Avoid potassium supplements'],
    },
  ]);

  // Reminder notifications
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5); // HH:MM format

      medications.forEach(med => {
        if (med.reminders) {
          med.times.forEach((time, index) => {
            if (time === currentTime && !med.taken[index] && !med.skipped[index]) {
              Alert.alert(
                'Medication Reminder',
                `Time to take ${med.name} (${med.dosage})`,
                [
                  { text: 'Mark Taken', onPress: () => handleMarkAsTaken(med.id, index) },
                  { text: 'Skip', onPress: () => handleMarkAsSkipped(med.id, index) },
                  { text: 'Remind Later', style: 'cancel' },
                ]
              );
            }
          });
        }
      });
    };

    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [medications]);

  const adherenceData = {
    thisWeek: 92,
    thisMonth: 88,
    streak: 12,
  };

  const missedDoses = [
    { medication: 'Aspirin', time: 'Yesterday, 12:00 PM', reason: 'Forgot' },
    { medication: 'Metoprolol', time: 'Oct 15, 8:00 PM', reason: 'Not available' },
  ];

  const handleMarkAsTaken = (medId, timeIndex) => {
    setMedications(prevMeds =>
      prevMeds.map(med =>
        med.id === medId
          ? {
              ...med,
              taken: med.taken.map((taken, idx) => (idx === timeIndex ? true : taken)),
              skipped: med.skipped.map((skipped, idx) => (idx === timeIndex ? false : skipped)),
            }
          : med
      )
    );
    console.log(`Marked medication ${medId} at time ${timeIndex} as taken`);
  };

  const handleMarkAsSkipped = (medId, timeIndex) => {
    setMedications(prevMeds =>
      prevMeds.map(med =>
        med.id === medId
          ? {
              ...med,
              taken: med.taken.map((taken, idx) => (idx === timeIndex ? false : taken)),
              skipped: med.skipped.map((skipped, idx) => (idx === timeIndex ? true : skipped)),
            }
          : med
      )
    );
    console.log(`Marked medication ${medId} at time ${timeIndex} as skipped`);
  };

  const handleViewDetails = (medication) => {
    setSelectedMedication(medication);
    setShowDetailsModal(true);
  };

  const handleRefillRequest = (medId) => {
    console.log(`Refill requested for medication ${medId}`);
    Alert.alert(
      'Refill Request',
      'Your refill request has been sent to your pharmacy. You will receive a confirmation shortly.',
      [{ text: 'OK' }]
    );
  };

  const handleViewLeaflet = (medication) => {
    console.log(`Viewing leaflet for ${medication.name}`);
    // In a real app, this would open a PDF or web view with the medication leaflet
    Alert.alert(
      'Medication Leaflet',
      `Detailed information for ${medication.name} would be displayed here. This includes full prescribing information, interactions, and complete side effects.`,
      [{ text: 'Close' }]
    );
  };

  const renderTodayView = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Adherence Overview */}
      <View style={styles.adherenceCard}>
        <Text style={styles.adherenceTitle}>Medication Adherence</Text>
        <View style={styles.adherenceStats}>
          <View style={styles.adherenceStat}>
            <View style={styles.streakContainer}>
              <Ionicons name="flame" size={24} color="#F59E0B" />
              <Text style={styles.adherenceValue}>{adherenceData.streak}</Text>
            </View>
            <Text style={styles.adherenceLabel}>Day Streak</Text>
          </View>
          <View style={styles.adherenceDivider} />
          <View style={styles.adherenceStat}>
            <Text style={styles.adherenceValue}>{adherenceData.thisWeek}%</Text>
            <Text style={styles.adherenceLabel}>This Week</Text>
          </View>
          <View style={styles.adherenceDivider} />
          <View style={styles.adherenceStat}>
            <Text style={styles.adherenceValue}>{adherenceData.thisMonth}%</Text>
            <Text style={styles.adherenceLabel}>This Month</Text>
          </View>
        </View>
      </View>

      {/* Today's Medications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Schedule</Text>
        {medications.map((med) => (
          <View key={med.id} style={styles.medicationCard}>
            <View style={[styles.medicationIndicator, { backgroundColor: med.color }]} />
            <View style={styles.medicationContent}>
              <View style={styles.medicationHeader}>
                <View style={styles.medicationInfo}>
                  <Text style={styles.medicationName}>{med.name}</Text>
                  <Text style={styles.medicationDosage}>{med.dosage} - {med.frequency}</Text>
                </View>
                <TouchableOpacity onPress={() => handleViewDetails(med)}>
                  <Ionicons name="information-circle-outline" size={24} color="#2563EB" />
                </TouchableOpacity>
              </View>

              {/* Time Slots */}
              {med.times.map((time, index) => (
                <View key={index} style={styles.timeSlot}>
                  <View style={styles.timeInfo}>
                    <Ionicons 
                      name={med.taken[index] ? "checkmark-circle" : "time-outline"} 
                      size={20} 
                      color={med.taken[index] ? "#10B981" : "#9CA3AF"} 
                    />
                    <Text style={[styles.timeText, med.taken[index] && styles.timeTextTaken]}>
                      {time}
                    </Text>
                  </View>
                  {!med.taken[index] && !med.skipped[index] ? (
                    <View style={styles.actionButtons}>
                      <TouchableOpacity
                        style={styles.markButton}
                        onPress={() => handleMarkAsTaken(med.id, index)}
                      >
                        <Text style={styles.markButtonText}>Mark Taken</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.skipButton}
                        onPress={() => handleMarkAsSkipped(med.id, index)}
                      >
                        <Text style={styles.skipButtonText}>Skip</Text>
                      </TouchableOpacity>
                    </View>
                  ) : med.taken[index] ? (
                    <View style={styles.takenBadge}>
                      <Text style={styles.takenBadgeText}>Taken</Text>
                    </View>
                  ) : (
                    <View style={styles.skippedBadge}>
                      <Text style={styles.skippedBadgeText}>Skipped</Text>
                    </View>
                  )}
                </View>
              ))}

              {/* Refill Alert */}
              {med.pillsRemaining < 30 && (
                <View style={styles.refillAlert}>
                  <Ionicons name="warning" size={16} color="#F59E0B" />
                  <Text style={styles.refillAlertText}>
                    {med.pillsRemaining} pills remaining - Refill by {med.refillDate}
                  </Text>
                  <TouchableOpacity onPress={() => handleRefillRequest(med.id)}>
                    <Text style={styles.refillLink}>Request</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>

      {/* Missed Doses */}
      {missedDoses.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Missed Doses</Text>
          {missedDoses.map((missed, index) => (
            <View key={index} style={styles.missedCard}>
              <View style={styles.missedIcon}>
                <Ionicons name="alert-circle" size={24} color="#EF4444" />
              </View>
              <View style={styles.missedInfo}>
                <Text style={styles.missedMedication}>{missed.medication}</Text>
                <Text style={styles.missedTime}>{missed.time}</Text>
                <Text style={styles.missedReason}>Reason: {missed.reason}</Text>
                <TouchableOpacity style={styles.encouragementButton}>
                  <Text style={styles.encouragementText}>Get Back on Track</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Add Medication Button */}
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add-circle" size={24} color="#2563EB" />
        <Text style={styles.addButtonText}>Add New Medication</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderScheduleView = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medication Schedule</Text>
        {medications.map((med) => (
          <View key={med.id} style={styles.scheduleCard}>
            <View style={[styles.scheduleIndicator, { backgroundColor: med.color }]} />
            <View style={styles.scheduleContent}>
              <View style={styles.scheduleHeader}>
                <Text style={styles.scheduleName}>{med.name}</Text>
                <Switch value={med.reminders} />
              </View>
              <Text style={styles.scheduleDosage}>{med.dosage}</Text>
              <View style={styles.scheduleTimesContainer}>
                {med.times.map((time, index) => (
                  <View key={index} style={styles.scheduleTimeChip}>
                    <Ionicons name="alarm-outline" size={14} color="#6B7280" />
                    <Text style={styles.scheduleTimeText}>{time}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity style={styles.editScheduleButton}>
                <Text style={styles.editScheduleText}>Edit Schedule</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderHistoryView = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Adherence History</Text>
        {/* Week view */}
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
          <View key={index} style={styles.historyDayCard}>
            <View style={styles.historyDayHeader}>
              <Text style={styles.historyDay}>{day}</Text>
              <Text style={styles.historyDate}>Oct {18 - (6 - index)}</Text>
            </View>
            <View style={styles.historyDoses}>
              {[1, 2, 3, 4].map((dose) => (
                <View
                  key={dose}
                  style={[
                    styles.historyDot,
                    Math.random() > 0.2 ? styles.historyDotTaken : styles.historyDotMissed,
                  ]}
                />
              ))}
            </View>
            <Text style={styles.historyPercentage}>
              {Math.floor(Math.random() * 20 + 75)}%
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medication Tracker</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'today' && styles.activeTab]}
          onPress={() => setActiveTab('today')}
        >
          <Text style={[styles.tabText, activeTab === 'today' && styles.activeTabText]}>
            Today
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'schedule' && styles.activeTab]}
          onPress={() => setActiveTab('schedule')}
        >
          <Text style={[styles.tabText, activeTab === 'schedule' && styles.activeTabText]}>
            Schedule
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            History
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === 'today' && renderTodayView()}
        {activeTab === 'schedule' && renderScheduleView()}
        {activeTab === 'history' && renderHistoryView()}
      </View>

      {/* Medication Details Modal */}
      <Modal
        visible={showDetailsModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowDetailsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Medication Details</Text>
              <TouchableOpacity onPress={() => setShowDetailsModal(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {selectedMedication && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.detailSection}>
                  <Text style={styles.detailMedName}>{selectedMedication.name}</Text>
                  <Text style={styles.detailDosage}>{selectedMedication.dosage}</Text>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Purpose</Text>
                  <Text style={styles.detailText}>{selectedMedication.purpose}</Text>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Frequency</Text>
                  <Text style={styles.detailText}>{selectedMedication.frequency}</Text>
                  <View style={styles.detailTimesContainer}>
                    {selectedMedication.times.map((time, index) => (
                      <View key={index} style={styles.detailTimeChip}>
                        <Text style={styles.detailTimeText}>{time}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Common Side Effects</Text>
                  {selectedMedication.sideEffects.map((effect, index) => (
                    <View key={index} style={styles.sideEffectItem}>
                      <View style={styles.sideEffectBullet} />
                      <Text style={styles.sideEffectText}>{effect}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Precautions</Text>
                  {selectedMedication.precautions.map((precaution, index) => (
                    <View key={index} style={styles.precautionItem}>
                      <View style={styles.precautionBullet} />
                      <Text style={styles.precautionText}>{precaution}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Supply Status</Text>
                  <View style={styles.supplyInfo}>
                    <View style={styles.supplyItem}>
                      <Text style={styles.supplyValue}>{selectedMedication.pillsRemaining}</Text>
                      <Text style={styles.supplyLabel}>Pills Remaining</Text>
                    </View>
                    <View style={styles.supplyItem}>
                      <Text style={styles.supplyValue}>{selectedMedication.refillDate}</Text>
                      <Text style={styles.supplyLabel}>Refill By</Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.detailButton}
                  onPress={() => handleViewLeaflet(selectedMedication)}
                >
                  <Ionicons name="document-text-outline" size={20} color="#fff" />
                  <Text style={styles.detailButtonText}>View Full Leaflet</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.detailButton, styles.detailButtonSecondary]}
                  onPress={() => handleRefillRequest(selectedMedication.id)}
                >
                  <Ionicons name="refresh-outline" size={20} color="#2563EB" />
                  <Text style={styles.detailButtonTextSecondary}>Request Refill</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
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
    backgroundColor: '#10B981',
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
    paddingVertical: 14,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  activeTabText: {
    color: '#10B981',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  adherenceCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  adherenceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  adherenceStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  adherenceStat: {
    alignItems: 'center',
  },
  adherenceValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 4,
  },
  adherenceLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  adherenceDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  medicationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  medicationIndicator: {
    width: 4,
  },
  medicationContent: {
    flex: 1,
    padding: 16,
  },
  medicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  medicationDosage: {
    fontSize: 13,
    color: '#6B7280',
  },
  timeSlot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  timeTextTaken: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  markButton: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  markButtonText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  takenBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  takenBadgeText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
  },
  skippedBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  skippedBadgeText: {
    fontSize: 12,
    color: '#DC2626',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  skipButton: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  skipButtonText: {
    fontSize: 12,
    color: '#D97706',
    fontWeight: '600',
  },
  refillAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    gap: 8,
  },
  refillAlertText: {
    flex: 1,
    fontSize: 12,
    color: '#92400E',
  },
  refillLink: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F59E0B',
  },
  missedCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    marginBottom: 8,
  },
  missedIcon: {
    marginRight: 12,
  },
  missedInfo: {
    flex: 1,
  },
  missedMedication: {
    fontSize: 14,
    fontWeight: '600',
    color: '#991B1B',
    marginBottom: 2,
  },
  missedTime: {
    fontSize: 12,
    color: '#DC2626',
    marginBottom: 4,
  },
  missedReason: {
    fontSize: 12,
    color: '#B91C1C',
    fontStyle: 'italic',
  },
  encouragementButton: {
    marginTop: 8,
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  encouragementText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
  },
  scheduleCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  scheduleIndicator: {
    width: 4,
  },
  scheduleContent: {
    flex: 1,
    padding: 16,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  scheduleName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  scheduleDosage: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 12,
  },
  scheduleTimesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  scheduleTimeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  scheduleTimeText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '600',
  },
  editScheduleButton: {
    alignSelf: 'flex-start',
  },
  editScheduleText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
  },
  historyDayCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  historyDayHeader: {
    width: 60,
  },
  historyDay: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  historyDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  historyDoses: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
  },
  historyDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  historyDotTaken: {
    backgroundColor: '#10B981',
  },
  historyDotMissed: {
    backgroundColor: '#E5E7EB',
  },
  historyPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
    width: 50,
    textAlign: 'right',
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
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  detailSection: {
    marginBottom: 24,
  },
  detailMedName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  detailDosage: {
    fontSize: 16,
    color: '#6B7280',
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  detailTimesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  detailTimeChip: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  detailTimeText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
  },
  sideEffectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sideEffectBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F59E0B',
    marginRight: 12,
  },
  sideEffectText: {
    fontSize: 14,
    color: '#374151',
  },
  precautionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  precautionBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3B82F6',
    marginRight: 12,
  },
  precautionText: {
    fontSize: 14,
    color: '#374151',
  },
  supplyInfo: {
    flexDirection: 'row',
    gap: 16,
  },
  supplyItem: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  supplyValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  supplyLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 8,
  },
  detailButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  detailButtonSecondary: {
    backgroundColor: '#EFF6FF',
  },
  detailButtonTextSecondary: {
    color: '#2563EB',
  },
});

export default MedicationTrackerScreen;
