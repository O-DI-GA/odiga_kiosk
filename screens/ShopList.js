import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getTokenRequest } from "../utils/api";
import { saveStoreId, saveStoreName } from "../utils/tokenUtils";

function ShopList() {
  const navigation = useNavigation();

  const [shopList, setShopList] = React.useState([]);

  React.useEffect(() => {
    try {
      const fetchShopList = async () => {
        return await getTokenRequest("/owner/store");
      };

      fetchShopList()
        .then((res) => {
          // console.log(res.data)
          setShopList(res.data);
        })
        .catch((err) => {
          console.log("가게 리스트 요청 오류");
        });
    } catch (error) {}
  }, []);

  // 가게 아이디 저장
  const handleStoreSelect = async (storeId, storeName) => {
    try {
      await saveStoreId(storeId);
      await saveStoreName(storeName);
      navigation.navigate("TableNumSetting");
    } catch (err) {}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}> 가게를 선택해주세요 </Text>
      <ScrollView>
        <View style={styles.listContainer}>
          {shopList && shopList.length === 0 && <Text>가게가 없습니다.</Text>}
          {shopList.map(({ address, phoneNumber, storeId, storeName }) => (
            <TouchableOpacity
              key={storeId}
              style={styles.listCard}
              onPress={() => handleStoreSelect(storeId, storeName)}
            >
              <Text style={styles.storeName}> {storeName} </Text>
              <View style={styles.storeInfoBox}>
                <Text style={styles.storeInfo}> {address} </Text>
                <Text style={styles.storeInfo}> {phoneNumber}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#202020",
    gap: 50,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginVertical: 60,
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "space-around",
    alignItems: "flex-start",
    paddingHorizontal: 60,
    paddingVertical: 10,
    gap: 50,
    marginBottom: 50,
  },
  listCard: {
    backgroundColor: "#424242",
    width: 210,
    height: 250,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  storeName: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  storeInfoBox: {
    borderTopWidth: 1,
    borderColor: "#FFF9C4",
    width: "100%",
    gap: 5,
    paddingTop: 10,
  },
  storeInfo: {
    fontSize: 13,
    color: "#fff",
  },
});

export default ShopList;
