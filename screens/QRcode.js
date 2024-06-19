import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const QRcode = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { qrValue } = route.params || {}; // 전달된 qrValue를 가져옴
  console.log(qrValue);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={24} color="#000000" />
      </TouchableOpacity>
      <Text style={styles.title}>QR 코드</Text>
      <View style={styles.qr}>
        <QRCode value={qrValue} size={200} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#424242",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 30,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },
  title: {
    color: "#ffffff",
    fontSize: 30,
    marginBottom: 20,
  },
  qr: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 20,
  },
});

export default QRcode;
