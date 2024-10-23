import React from "react";
import {ScrollView, View, Text, Image, StyleSheet, Pressable} from "react-native";
import {useDispatch} from "react-redux";
import {addItemToCart} from "../store/cartSlice";

const Menu = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    const menuItem = {
      menuId: item.menuId,
      menuImageUrl: item.menuImageUrl,
      menuName: item.menuName,
      menuPrice: item.menuPrice,
      quantity: 1,
    };
    // 리덕스 스토어에 메뉴 저장
    dispatch(addItemToCart(menuItem));
  }

  return (
    <ScrollView contentContainerStyle={styles.menuList}>
      {items.length === 0 ? (
        <Text style={styles.noMenuText}>메뉴가 없습니다</Text>
      ) : (
        items.map((item) => (
          <Pressable key={item.menuId} style={styles.menuItem} onPress={() => handleAddToCart(item)}>
            <Image source={{ uri: item.menuImageUrl }} style={styles.image} />
            <View style={styles.menuInfo}>
              <Text style={styles.menuName}>{item.menuName}</Text>
              <Text style={styles.menuPrice}>{item.menuPrice}원</Text>
            </View>
          </Pressable>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  menuList: {
    paddingTop: 40,
    paddingBottom: 120,
    paddingHorizontal: 50,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  menuItem: {
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    borderRadius: 20,
    width: 200,
    height: 200,
  },
  image: {
    width: 200,
    height: 125,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  menuInfo: {
    backgroundColor: "#424242",
    flexDirection: "column",
    gap: 5,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  menuName: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  menuPrice: {
    fontSize: 20,
    color: "#fff",
  },
  noMenuText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    width: "100%",
  },
});

export default Menu;
