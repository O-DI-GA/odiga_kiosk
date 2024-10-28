import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Menu from "../components/Menu";
import Cart from "../components/Cart";
import { getStoreId, getTableNum } from "../utils/tokenUtils";
import { getTokenRequest } from "../utils/api";

const Main = ({ navigation }) => {
  const [menuData, setMenuData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [tableNumber, setTableNumber] = useState(null);
  const [storeId, setStoreId] = useState(null);

  // 테이블 번호 불러오기
  const fetchTableNumber = async () => {
    try {
      const response = await getTableNum();
      if (response) {
        setTableNumber(response);
      }
    } catch (error) {
      console.log("테이블 번호 불러오기 실패");
    }
  };

  // 가게 아이디 불러오기
  const fetchStoreId = async () => {
    try {
      const response = await getStoreId();
      if (response) {
        setStoreId(response);
      }
    } catch (err) {
      console.log("가게 아이디 불러오기 실패");
    }
  };

  // 카테고리 불러오기 및 첫 번째 카테고리 선택
  const fetchCategories = async () => {
    if (storeId) {
      try {
        const resCategories = await getTokenRequest(`/owner/${storeId}/category`);
        setCategoryList(resCategories.data);
        console.log("카테고리 조회 결과: ", resCategories.data);

        // 첫 번째 카테고리를 기본 선택
        if (resCategories.data.length > 0) {
          setSelectedCategory(resCategories.data[0].categoryId);
        }
      } catch (error) {
        console.log("카테고리 조회 실패", error);
      }
    }
  };

  // 선택된 카테고리의 메뉴 불러오기
  const fetchMenu = async (categoryId) => {
    if (storeId && categoryId) {
      try {
        const resMenu = await getTokenRequest(`/owner/${storeId}/category/${categoryId}/menu`);
        const formattedMenu = resMenu.data.map((item) => ({
          menuId: item.menuId,
          menuName: item.menuName,
          menuImageUrl: item.menuImage,
          menuPrice: item.price,
        }));
        setMenuData(formattedMenu);
      } catch (error) {
        console.log("메뉴 조회 실패", error);
      }
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await fetchTableNumber();
      await fetchStoreId();
    };
    initialize();
  }, []);

  useEffect(() => {
    if (storeId) {
      fetchCategories();
    }
  }, [storeId]);

  // `selectedCategory`가 변경될 때마다 해당 카테고리의 메뉴를 불러옴
  useEffect(() => {
    if (selectedCategory) {
      fetchMenu(selectedCategory);
    }
  }, [selectedCategory]);

  return (
      <View style={styles.container}>
        <View style={styles.sideBar}>
          <TouchableOpacity onPress={() => navigation.navigate("TableNumSetting")}>
            <View style={styles.tableNum}>
              <View style={styles.tableNumDark}></View>
              <Text style={{ fontSize: 20 }}>테이블 번호</Text>
              <Text style={{ fontSize: 40, fontWeight: "bold" }}>{tableNumber}</Text>
            </View>
          </TouchableOpacity>
          <ScrollView style={{ flex: 1, marginTop: 160 }} contentContainerStyle={styles.categoryContainer}>
            {categoryList.map((category) => (
                <TouchableOpacity
                    key={category.categoryId}
                    style={[
                      styles.category,
                      selectedCategory === category.categoryId && styles.selectedCategory,
                    ]}
                    onPress={() => setSelectedCategory(category.categoryId)}
                >
                  <Text
                      style={[
                        styles.categoryText,
                        selectedCategory === category.categoryId && styles.selectedCategoryText,
                      ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.menuContainer}>
          <Menu items={menuData} />
        </View>

        <View style={styles.cartContainer}>
          <Cart />
        </View>

        <View style={styles.bottomBar}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.staff}>
              <Text style={styles.staffText}>🔔 직원 호출</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.payment}>
              <Text style={styles.bottomBarText}>💰 결제</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.orderHistory}>
              <Text style={styles.bottomBarText}>🧾 주문 내역</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.order}>
              <Text style={styles.orderText}>🛒 주문하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    flexDirection: "row",
  },
  sideBar: {
    width: 200,
    height: "100%",
    backgroundColor: "#323232",
    flexDirection: "column",
  },
  tableNum: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "80%",
    backgroundColor: "#FFD600",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 0,
    gap: 5,
  },
  tableNumDark: {
    backgroundColor: "#DBB801",
    height: 25,
    width: "100%",
    marginTop: -10,
  },
  categoryContainer: {
    width: "100%",
    paddingBottom: 120,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  category: {
    width: "80%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5A5A5A",
    borderRadius: 15,
  },
  categoryText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  selectedCategory: {
    backgroundColor: "#FFF6D4",
  },
  selectedCategoryText: {
    color: "#000",
  },
  menuContainer: {
    flex: 4,
    flexWrap: "wrap",
  },
  cartContainer: {
    flex: 1.5,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 100,
    backgroundColor: "#323232",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 50,
  },
  staff: {
    backgroundColor: "#FFD600",
    width: 160,
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  staffText: {
    fontSize: 20,
    color: "#000",
  },
  bottomBarText: {
    fontSize: 20,
    color: "#fff",
  },
  order: {
    backgroundColor: "#FFBF00",
    width: 160,
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  orderText: {
    fontSize: 20,
    color: "#000",
  },
});

export default Main;