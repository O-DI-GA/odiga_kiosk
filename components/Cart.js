import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "../store/cartSlice";

const Cart = () => {
  const items = useSelector((state) => state.cart.items); // Redux store에서 cart items 가져오기
  const dispatch = useDispatch();

  const handleIncrease = (menuId) => {
    dispatch(increaseQuantity(menuId)); // 수량 증가
  };

  const handleDecrease = (menuId) => {
    dispatch(decreaseQuantity(menuId)); // 수량 감소
  };

  // 가격 합계 계산
  const totalPrice = items.reduce(
    (total, item) => total + item.menuPrice * item.quantity,
    0
  );

  return (
    <View style={styles.wrapper}>
      {/* 선택한 메뉴 렌더링 */}
      <ScrollView style={styles.cartScrollView}>
        <View style={styles.cartContainer}>
          {items.length === 0 ? (
            <Text style={styles.emptyText}>담긴 메뉴가 없습니다.</Text>
          ) : (
            items.map((item) => (
              <View key={item.menuId} style={styles.cartItem}>
                <Image
                  source={{ uri: item.menuImageUrl }}
                  style={styles.image}
                />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.menuName}</Text>
                  <View style={styles.quantityBox}>
                    <Text style={styles.itemPrice}>{item.menuPrice}원</Text>
                    <View style={styles.quantityControls}>
                      <Pressable
                        onPress={() => handleDecrease(item.menuId)}
                        style={styles.quantityButton}
                      >
                        <Text style={styles.quantityText}>-</Text>
                      </Pressable>
                      <Text style={styles.itemQuantity}>{item.quantity}</Text>
                      <Pressable
                        onPress={() => handleIncrease(item.menuId)}
                        style={styles.quantityButton}
                      >
                        <Text style={styles.quantityText}>+</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
      {/* 가격 합계 표시 */}
      <View style={styles.totalContainer}>
        <View style={styles.totalBox}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalPriceText}>{totalPrice} 원</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#424242",
    paddingBottom: 110,
  },
  cartScrollView: {
    marginBottom: 20, // 가격 표시 부분을 위해 여백
  },
  cartContainer: {
    justifyContent: "center",
    padding: 10,
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
    marginTop: "100%",
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#202020",
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemInfo: {
    marginLeft: 15,
    justifyContent: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent : "space-between",
  },
  itemPrice: {
    fontSize: 16,
    color: "#fff",
    width : 80
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  quantityButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffbf00",
    width: 20,
    borderRadius: 100,
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 16,
    color: "#000",
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  totalContainer: {
    paddingHorizontal: 10,
  },
  totalBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#202020",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderWidth: 2,
    borderColor: "#F5A62E",
    borderRadius: 10,
  },
  totalText: {
    fontSize: 20,
    color: "#fff",
  },
  totalPriceText: {
    fontSize: 20,
    color: "#fff",
  },
});

export default Cart;
