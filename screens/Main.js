import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Menu from "../components/Menu";

const Main = ({ navigation }) => {
  const [menuData] = useState([
    {
      categoryName: "메인",
      menuList: [
        {
          menuId: 1,
          menuName: "모둠전",
          menuImageUrl:
            "https://mblogthumb-phinf.pstatic.net/MjAyMTAzMzBfMTQz/MDAxNjE3MTAwOTQwMjMy.ArHeejNO2oDXDJlGEbMR0-TXmRyDzzmfQIztuTDkkxAg.-TCpbNBNCpHKMIt6FlBe-iyluIEimOIHA1Fdjs8fmUAg.JPEG.modern-house/20210325%EF%BC%BF222610.jpg?type=w800",
          menuPrice: 111,
        },
        {
          menuId: 2,
          menuName: "해물파전",
          menuImageUrl:
            "https://mblogthumb-phinf.pstatic.net/MjAyMjA4MTZfMTgy/MDAxNjYwNjQwMTg3NjU3.AXRyV4WVcYDgepRQEDosBTOH5N0jq9XEoC-De0qlMCwg.C8B5JVeu8x-0mUdn8gz-zf1kIrVExZDQjMk9I84ibq8g.JPEG.kimjh4648/_KS_0064.jpg?type=w800",
          menuPrice: 222,
        },
        {
          menuId: 3,
          menuName: "육전",
          menuImageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOFSpMc_WsNI-oCMwjkXiIbGpywfJv_kxZZA&s",
          menuPrice: 333,
        },
        {
          menuId: 4,
          menuName: "김치전",
          menuImageUrl:
            "https://i.namu.wiki/i/QhirmuIzH17W2latKFMsNcdimWEn_MofWBpXQBAJ12OjV3Tr0ZTuTnLki0nHtoq9rsCcP8-TyInEwpy6Auebng.webp",
          menuPrice: 333,
        },
        {
          menuId: 5,
          menuName: "감자전",
          menuImageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnppjuXE17nWy8lOCrxB9zyxvHUT7omBnpkQ&s",
          menuPrice: 333,
        },
        {
          menuId: 6,
          menuName: "배추전",
          menuImageUrl:
            "https://mblogthumb-phinf.pstatic.net/MjAyNDA2MzBfMjgy/MDAxNzE5NzI1NTAwOTQw.OpHm7YX9tFKBtmU_w3mw3sS5I9leGy6iu8Qf5cmMjCsg.tCc5RXAnoN6cfm6f23-BASMj-9ne7V5odHPsIBzDAuMg.JPEG/20240629_224215.jpg?type=w800",
          menuPrice: 333,
        },
        {
          menuId: 7,
          menuName: "부대찌개",
          menuImageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx5SZrHozw3yI7ZaTmyDg5a_KuaGyJao-AIQ&s",
          menuPrice: 333,
        },
        {
          menuId: 8,
          menuName: "짬뽕탕",
          menuImageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTiqiwePBv6ZbbezBWRUFCAmTrT11SYs_8wQ&s",
          menuPrice: 333,
        },
        {
          menuId: 9,
          menuName: "바지락 칼국수",
          menuImageUrl:
            "https://thumbnews.nateimg.co.kr/view610///news.nateimg.co.kr/orgImg/kh/2023/01/21/news-p.v1.20230119.d8b6ae19511e4bf0aa9639a4362dbb08_P1.jpg",
          menuPrice: 333,
        },
        {
          menuId: 10,
          menuName: "두부 김치",
          menuImageUrl:
            "https://img.danawa.com/images/descFiles/6/38/5037428_1_16509621802618894.jpeg",
          menuPrice: 333,
        },
        {
          menuId: 11,
          menuName: "무뼈 닭발",
          menuImageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqeD50IYCU2zp4y4yWiAELT8q9oNklh3DpQw&s",
          menuPrice: 333,
        },
      ],
    },
    {
      categoryName: "사이드",
      menuList: [
        {
          menuId: 2,
          menuName: "라면",
          menuImageUrl:
            "https://img4.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202403/20/moneytoday/20240320064406240lqcj.jpg",
          menuPrice: 444,
        },
        {
          menuId: 4,
          menuName: "콘치즈",
          menuImageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRffXfl570V76LKihgKo_HlckmVxE9ErVJBnQ&s",
          menuPrice: 555,
        },
        {
          menuId: 6,
          menuName: "파인애플 샤베트",
          menuImageUrl:
            "https://img.bizthenaum.co.kr/img2022/pineappesharbet_06.jpg",
          menuPrice: 666,
        },
      ],
    },
    {
      categoryName: "음료",
      menuList: [],
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("메인");

  const selectedMenuList =
    menuData.find((category) => category.categoryName === selectedCategory)
      ?.menuList || [];

  return (
    <View style={styles.container}>
      <View style={styles.sideBar}>
        <TouchableOpacity
          onPress={() => navigation.navigate("TableNumSetting")}
        >
          <View style={styles.tableNum}>
            <View style={styles.tableNumDark}></View>
            <Text style={{ fontSize: 20 }}>테이블 번호</Text>
            <Text style={{ fontSize: 40, fontWeight: "bold" }}>6</Text>
          </View>
        </TouchableOpacity>
        <ScrollView
          style={{ flex: 1, marginTop: 160 }}
          contentContainerStyle={styles.categoryContainer}
        >
          {menuData.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.category,
                selectedCategory === category.categoryName &&
                  styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(category.categoryName)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category.categoryName &&
                    styles.selectedCategoryText,
                ]}
              >
                {category.categoryName}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.menuContainer}>
        <Menu items={selectedMenuList} />
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
    flex: 1,
    flexWrap: "wrap",
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
