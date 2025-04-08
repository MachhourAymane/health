import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import moment from "moment";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/user/get-appointments-by-user-id", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setAppointments(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text>Doctor: {item.doctorInfo.firstName} {item.doctorInfo.lastName}</Text>
      <Text>Phone: {item.doctorInfo.phoneNumber}</Text>
      <Text>
        Date & Time: {moment(item.date).format("DD-MM-YYYY")}{" "}
        {moment(item.time).format("HH:mm")}
      </Text>
      <Text>Status: {item.status}</Text>
    </View>
  );

  useEffect(() => {
    getAppointmentsData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Appointments</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  pageTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: { padding: 15, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 10 },
});

export default AppointmentsScreen;
