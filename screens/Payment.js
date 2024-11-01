import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getRequest } from "../utils/api";
import {getStoreName} from "../utils/tokenUtils";
import Icon from "react-native-vector-icons/Ionicons";

const Payment = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { storeId, tableNumber } = route.params || {}; // storeId, tableNumber 받아오기
  const [storeName, setStoreName] = useState("");

  const [orderId, setOrderId] = useState(0);
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  // 스토어에 저장된 storeName 불러오기
  const fetchStoreName = async () => {
    const receivedStoreName = await getStoreName();
    if (receivedStoreName) {
      setStoreName(receivedStoreName);
    }
  };

  // 주문내역 불러오기
  const fetchData = async () => {
    try {
      const response = await getRequest(`/table/${storeId}/order/${tableNumber}`);
      console.log("주문내역 응답: ", response.data.tableOrderMenus);
      // console.log("응답.데이터: ", response.data);
      if (response && response.data) {
        setOrderId(response.data.tableOrderHistoryId);
        setData(response.data.tableOrderMenus);
        setTotalPrice(response.data.totalTableOrderPrice);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreName().then(res => {
      console.log("주문내역 가게 이름 : ",storeName);
      console.log("주문내역 가게 아이디 : ",storeId);
      console.log("주문내역 테이블 아이디 : ",tableNumber);
    });

    fetchData(); // 주문내역 불러오기
  }, [storeId, tableNumber, storeName]);

  const handlePress = () => {
    const orderDetails = {
      storeId: storeId,
      orderId: orderId,
      storeName: storeName,
    };
    console.log(orderDetails);

    // 주문 내역을 QR로 넘겨줌
    const qrValue = { order: orderDetails };

    // QR 코드 화면으로 이동
    navigation.navigate("QRcode", { qrValue });
  };

  const handleOffline = () => {
    Alert.alert("알림", "카운터에서 결제해주세요.");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={24} color="#000000" />
      </TouchableOpacity>
      <View style={styles.row}>
        <View style={styles.orderContainer}>
          <Text style={styles.orderText}>주문내역</Text>
          <View style={styles.menuContainer}>
            <View style={styles.menuTitle}>
              <Text style={[styles.menuText, styles.menuItemName]}>메뉴</Text>
              <Text style={[styles.menuText, styles.menuItemQuantity]}>
                수량
              </Text>
              <Text style={[styles.menuText, styles.menuItemPrice]}>가격</Text>
            </View>

            {data.map((item, index) => (
              <View key={index} style={styles.menuItem}>
                <Text style={[styles.menuText, styles.menuItemName]}>
                  {item.menuName}
                </Text>
                <Text style={[styles.menuText, styles.menuItemQuantity]}>
                  {item.menuCount}
                </Text>
                <Text style={[styles.menuText, styles.menuItemPrice]}>
                  {item.menuTotalPrice.toLocaleString()}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.total}>
            <Text style={styles.totalText}>합계</Text>
            <Text style={styles.totalText}>
              {totalPrice.toLocaleString()}원
            </Text>
          </View>
        </View>
        <View style={styles.payContainer}>
          <Text style={styles.payText}>결제 방법</Text>
          <TouchableOpacity
            style={[styles.payButton, styles.odigaPay]}
            onPress={handlePress}
          >
            <Text style={[styles.payButtonText, styles.bold]}>ODIGA</Text>
            <Text style={styles.payButtonText}>앱으로 결제</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.payButton} onPress={handleOffline}>
            <Text style={styles.payButtonText}>현장 결제</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#424242",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 30,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 150,
  },
  orderContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 50,
    height: 700,
    width: 500,
    padding: 30,
  },
  orderText: {
    fontSize: 30,
    paddingBottom: 30,
    textAlign: "center",
  },
  menuContainer: {
    flex: 1,
    borderTopWidth: 2,
    borderStyle: "dashed",
    borderColor: "gray",
    padding: 20,
  },
  menuTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 15,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  menuText: {
    fontSize: 20,
  },
  menuItemName: {
    flex: 2,
  },
  menuItemQuantity: {
    flex: 1,
    textAlign: "center",
  },
  menuItemPrice: {
    flex: 1,
    textAlign: "right",
  },
  total: {
    marginHorizontal: 5,
    padding: 12,
    justifyContent: "space-between",
    flexDirection: "row",
    borderTopWidth: 2,
    borderStyle: "dashed",
    borderColor: "gray",
    paddingVertical: 10,
  },
  totalText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  payContainer: {
    gap: 10,
  },
  payText: {
    color: "#ffffff",
    fontSize: 30,
    textAlign: "center",
  },
  payButton: {
    backgroundColor: "#FFF9C4",
    padding: 60,
    borderRadius: 20,
  },
  odigaPay: {
    backgroundColor: "#FFD600",
    padding: 40,
  },
  payButtonText: {
    fontSize: 25,
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
});

export default Payment;
