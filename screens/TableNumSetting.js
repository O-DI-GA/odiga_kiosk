import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import {getTokenRequest} from "../utils/api";
import {getStoreId, saveTableNum} from "../utils/tokenUtils";

const TableNumSetting = () => {
  const navigation = useNavigation();

  const [storeId, setStoreId] = useState(null);
  const [tableCount, setTableCount] = useState(null);
  const [selectedTable, setSelectedTable] = useState("");

  // 테이블 개수 불러오기
  const fetchTableCount = async() => {
    try{
      const response = await getTokenRequest(`/store/${storeId}`);
      console.log("테이블 개수 API 결과 : ", response.data.tableCount)
      setTableCount(response.data.tableCount)
    }
    catch(err){
      console.log("테이블 수 요청 오류");
    }
  }

  React.useEffect(() => {
    try{
      // 스토어에 저장된 storeId 불러오기
      const fetchStoreId = async() => {
        const receivedStoreId = await getStoreId();
        if(receivedStoreId){
          setStoreId(receivedStoreId);
        }
      }
      fetchStoreId()
          .then(() => {
            fetchTableCount().then(r => {});
          })

    }
    catch(err){}
  },[storeId])

  // 테이블번호 설정하기
  const settingTableNumber = () => {
    console.log("선택된 테이블 아이디 : ", selectedTable)
    saveTableNum(selectedTable)
        .then((res) => {
          navigation.navigate("Main");
        })
        .catch((err) => {})
  }
  return (
    <View style={styles.container}>
      <View style={styles.tableNumSettingContainer}>
        <Text style={styles.title}>테이블 번호 설정</Text>
        <Text style={styles.tableCount}>전체 테이블 수: {tableCount}</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedTable}
            onValueChange={(itemValue) => setSelectedTable(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="테이블 번호 선택" value="" />
            {Array.from({ length: tableCount }, (_, index) => (
              <Picker.Item
                key={index + 1}
                label={`${index + 1}번 테이블`}
                value={`${index + 1}`}
              />
            ))}
          </Picker>
        </View>
        {selectedTable !== "" && (
          <Text style={styles.selectedText}>
            선택된 테이블 번호: {selectedTable}번
          </Text>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.calcel}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={styles.buttonText}>취소하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submit} onPress={() => settingTableNumber()}>
            <Text style={styles.buttonText}>설정하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#202020",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  tableNumSettingContainer: {
    width: "80%",
    height: "80%",
    paddingVertical: 40,
    paddingHorizontal: 100,
    backgroundColor: "#323232",
    borderRadius: 20,
    gap: 40,
    position: "relative",
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
  },
  tableCount: {
    color: "#fff",
    fontSize: 24,
  },
  pickerContainer: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#2A2A2A",
  },
  picker: {
    height: 100,
    width: "100%",
    color: "#fff",
    backgroundColor: "#2A2A2A",
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
    marginLeft: 120,
  },
  selectedText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 50,
    right: 100,
    left: "auto",
  },
  calcel: {
    backgroundColor: "#FFF6D4",
    height: 80,
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  submit: {
    backgroundColor: "#FFD600",
    height: 80,
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 28,
    fontWeight: "bold",
  },
});

export default TableNumSetting;
