import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getRequest } from "../utils/api";

const Payment = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRequest("api/v1/table/1/order/1");
        console.log("응답: ", response);
        console.log("응답.데이터: ", response.data);
        if (response && response.data) {
          setData(response.data.tableOrderMenuListDtoList);
          setTotalPrice(response.data.totalOrderPrice);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePress = () => {
    const orderDetails = {
      items: data,
      total: totalPrice,
    };
    console.log(orderDetails);

    // 주문 내역을 QR로 넘겨줌
    const qrValue = { order: orderDetails };

    // QR 코드 화면으로 이동
    navigation.navigate("QRcode", { qrValue });
  };

  const handleOffline = () => {
    Alert.alert("알림", "카운터로 가세요");
  };
  return (
    <View style={styles.container}>
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
          <TouchableOpacity style={styles.payButton}>
            <Text style={styles.payButtonText} onPress={handleOffline}>
              현장 결제
            </Text>
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
