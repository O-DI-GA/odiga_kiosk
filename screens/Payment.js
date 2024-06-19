import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const Payment = () => {
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
            <View style={styles.menuItem}>
              <Text style={[styles.menuText, styles.menuItemName]}>햄버거</Text>
              <Text style={[styles.menuText, styles.menuItemQuantity]}>10</Text>
              <Text style={[styles.menuText, styles.menuItemPrice]}>
                60,000
              </Text>
            </View>
            <View style={styles.menuItem}>
              <Text style={[styles.menuText, styles.menuItemName]}>
                감자튀김
              </Text>
              <Text style={[styles.menuText, styles.menuItemQuantity]}>10</Text>
              <Text style={[styles.menuText, styles.menuItemPrice]}>
                30,000
              </Text>
            </View>
          </View>
          <View style={styles.total}>
            <Text style={styles.totalText}>합계</Text>
            <Text style={styles.totalText}>130,000원</Text>
          </View>
        </View>
        <View style={styles.payContainer}>
          <Text style={styles.payText}>결제 방법</Text>
          <TouchableOpacity style={[styles.payButton, styles.odigaPay]}>
            <Text style={[styles.payButtonText, styles.bold]}>ODIGA</Text>
            <Text style={styles.payButtonText}>앱으로 결제</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.payButton}>
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
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    left: 50,
    gap: 240,
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
