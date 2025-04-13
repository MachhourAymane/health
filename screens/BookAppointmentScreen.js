// AppointmentsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, 
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
  Alert,
  Platform} from 'react-native';
  
  
import { Ionicons } from '@expo/vector-icons';
import { createAppointment, getDoctors } from '../config/api';
//import DateTimePicker from '@react-native-community/datetimepicker';


const BookAppointmentScreen = ({navigation}) => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

 // Add these handler functions
  const onDateChange = (event, selectedDate) => {
  const currentDate = selectedDate || date;
  setShowDatePicker(Platform.OS === 'ios');
  setSelectedDate(currentDate);
};

const onTimeChange = (event, selectedTime) => {
  const currentTime = selectedTime || time;
  setShowTimePicker(Platform.OS === 'ios');
  setSelectedTime(currentTime);
};


  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setIsLoading(true);
    try {
      const response = await getDoctors();
      setDoctors(response.data);
    } catch (error) {
      setError('Error fetching doctors list');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedDoctor) {
      Platform.OS === 'web'
      ? window.alert('Please select a doctor')
      : Alert.alert('Error', 'Please select a doctor');
    return;
    }

    setIsSaving(true);
    try {
      const appointmentData = {
        userId: 1,
        doctorId: selectedDoctor.userId,
        doctorInfo: {
          name: selectedDoctor.name,
          specialization: selectedDoctor.specialization,
          // Add other doctor info as needed
        },
        userInfo: {
          name: "John Doe", // You might want to get this from user context/state
          email: "john@example.com",
          phone: "1234567890"
        },
        time: selectedTime.toLocaleTimeString('en-US', { 
        hour: '2-digit',
        minute: '2-digit',
        hour12: true 
      }),
        date: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
        status: "pending" // You might want to add a status field
      };
  
      console.log('New Appointment Data:', appointmentData); // For debugging
      const response = await createAppointment(appointmentData);

      // Add your API call here to save the appointment
      //await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      if (response.success) {
      Platform.OS === 'web'
      ? (window.confirm('Appointment booked successfully') && navigation.goBack())
      :
      Alert.alert(
        'Success',
        'Appointment booked successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    }
    } catch (error) {
      Platform.OS === 'web'
      ? (window.alert('Failed to book appointment') && navigation.goBack())
      :
      Alert.alert('Error', 'Failed to book appointment');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    console.log("cancel !!")
    Platform.OS === 'web'
      ? (window.confirm('Are you sure you want to cancel?') && navigation.goBack())
      :
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };


  const DoctorItem = ({ doctor, onSelect }) => (
    <TouchableOpacity
      style={styles.doctorItem}
      onPress={() => {
        onSelect(doctor);
        setShowDoctorModal(false);
      }}
    >
      <Text style={styles.doctorName}>{doctor.name}</Text>
      <Text style={styles.doctorSpeciality}>{doctor.specialization}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Appointment</Text>

      {/* Doctor Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Doctor</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowDoctorModal(true)}
        >
          <Text style={styles.dropdownButtonText}>
            {selectedDoctor ? selectedDoctor.name : 'Choose a doctor'}
          </Text>
          <Ionicons name="chevron-down" size={24} color="#2196F3" />
        </TouchableOpacity>
      </View>
      {/* Date Selection 
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Date</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dropdownButtonText}>
            {selectedDate.toLocaleDateString()}
          </Text>
          <Ionicons name="calendar" size={24} color="#2196F3" />
        </TouchableOpacity>
      </View>
      */}
      {/* 
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Time</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.dropdownButtonText}>
            {selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          <Ionicons name="time" size={24} color="#2196F3" />
        </TouchableOpacity>
      </View>
      Time Selection */}  
      {/* Date Picker Modal 
      {showDatePicker && (
        <DateTimePicker
          testID="datePicker"
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={new Date()}
        />
      )}
      */}  
      {/* Time Picker Modal 
      {showTimePicker && (
        <DateTimePicker
          testID="timePicker"
          value={selectedTime}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={onTimeChange}
        />
      )}
        */}

      {/* Doctors Selection Modal */}
      <Modal
        visible={showDoctorModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Doctor</Text>
              <TouchableOpacity
                onPress={() => setShowDoctorModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {isLoading ? (
              <ActivityIndicator size="large" color="#2196F3" />
            ) : (
              <FlatList
                data={doctors}
                renderItem={({ item }) => (
                  <DoctorItem
                    doctor={item}
                    onSelect={setSelectedDoctor}
                  />
                )}
                keyExtractor={(item, index) => item.userId.toString() || index.toString()}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            )}
          </View>
        </View>
      </Modal>

      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.button, styles.cancelButton]} 
          onPress={handleCancel}
          disabled={isSaving}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.saveButton]} 
          onPress={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.saveButtonText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  doctorItem: {
    padding: 16,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
  },
  doctorSpeciality: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  saveButton: {
    backgroundColor: '#2196F3',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '600',
  },
  dateTimeButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 8,
  },
  dateTimeText: {
    fontSize: 16,
    color: '#333',
  },
});

export default BookAppointmentScreen;
