import axios from 'axios';

const API_URL = 'http://localhost:5000/api/doctor'; 
const API_URL_APPT = 'http://localhost:5000/api/appointments';

// Récupérer tous les médecins
export const getDoctors = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-all-doctors`);  
    return response.data; // Retourner les données reçues
  } catch (error) {
    console.error('Error fetching doctors', error);
    throw error;
  }
};

// Obtenir les informations d'un médecin par ID
export const getDoctorInfoById = async (doctorId) => {
  try {
    const response = await axios.post(`${API_URL}/get-doctor-info-by-id`, { doctorId });
    return response.data;
  } catch (error) {
    console.error('Error fetching doctor info', error);
    throw error;
  }
};

// Mettre à jour le profil d'un médecin
export const updateDoctorProfile = async (userId, doctorData) => {
  try {
    const response = await axios.post(`${API_URL}/update-doctor-profile`, {
      userId,
      ...doctorData,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating doctor profile', error);
    throw error;
  }
};
// Function to log in a user
export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, loginData);
    return response.data; // Assuming the response contains fields like "success" and "message"
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Function to register a user
export const registerUser = async (registerData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, registerData);
    return response.data; // Assuming the response contains fields like "success" and "message"
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};
export const createAppointment = async (appointmentData) => {
  try {
    console.log("create appointment ...")
    const response = await axios.post(`${API_URL_APPT}/book-appointment`, appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
    };
