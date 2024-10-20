import React from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";

const Menu = ({ items }) => {
  return (
    <ScrollView contentContainerStyle={styles.menuList}>
      {items.length === 0 ? (
        <Text style={styles.noMenuText}>메뉴가 없습니다</Text>
      ) : (
        items.map((item) => (
          <View key={item.menuId} style={styles.menuItem}>
            <Image source={{ uri: item.menuImageUrl }} style={styles.image} />
            <View style={styles.menuInfo}>
              <Text style={styles.menuName}>{item.menuName}</Text>
              <Text style={styles.menuPrice}>{item.menuPrice}원</Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  menuList: {
    paddingTop: 40,
    paddingBottom: 120,
    paddingHorizontal: 100,
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
