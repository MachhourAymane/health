import axios from 'axios';

const API_URL = 'http://localhost:5000/api/doctor'; // L'URL de l'API du backend

// Récupérer tous les médecins
export const getDoctors = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-all-doctors`);  // Appel GET pour récupérer tous les médecins
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
