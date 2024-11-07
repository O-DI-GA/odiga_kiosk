import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import {Alert} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { postRequest } from "../utils/api";

export const CallEmployee = ({ tableNumber, storeId, onClose }) => {
    const orderList = [
        "물", "숟가락", "앞치마", "앞접시", "휴지", "직원호출", "젓가락", "물티슈"
    ];
    const [selectedItem, setSelectedItem] = React.useState(null);

    const handleSelectItem = (item) => {
        // 이미 선택된 항목을 다시 선택하면 선택 해제
        // 다른 거 선택하면 그걸로 설정
        setSelectedItem((prevItem) => (prevItem === item ? null : item));
    };

    const call = async () => {
        if (selectedItem) {
            const payload = {
                callMessage: selectedItem,
                tableNumber: tableNumber
            };

            console.log("직원 호출 요청: ", payload);

            try {
                const response = await postRequest(
                    `/table/${storeId}/order/call`,
                    payload
                );
                console.log("서버 응답:", response);
                if (response && response.httpStatusCode === 200) {
                    Alert.alert("성공적으로 요청되었습니다.");
                    onClose(); // 요청 성공 시 모달 닫기
                }
            } catch (err) {
                console.log("직원 호출 오류:", err);
            }
        } else {
            console.log("항목을 선택해 주세요.");
        }
    };

    return (
        <View style={styles.modalContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>🔔 직원 호출</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Ionicons name="close" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.leftBox}>
                    {orderList.map((item) => (
                        <TouchableOpacity
                            key={item}
                            style={[
                                styles.orderButton,
                                selectedItem === item && styles.selectedOrderButton
                            ]}
                            onPress={() => handleSelectItem(item)}
                        >
                            <Text
                                style={[
                                    styles.orderButtonText,
                                    selectedItem === item && styles.selectedOrderButtonText
                                ]}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.callButton} onPress={call}>
                    <Text style={styles.callButtonText}>요청하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    container: {
        width: "80%",
        backgroundColor: "#333",
        borderRadius: 10,
        padding: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerText: {
        color: "#fff",
        fontSize: 20,
    },
    closeButton: {
        padding: 10,
    },
    leftBox: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        marginTop: 20,
    },
    orderButton: {
        backgroundColor: "#fff",
        padding: 10,
        margin: 5,
        borderRadius: 5,
        width: "40%",
        alignItems: "center",
    },
    selectedOrderButton: {
        backgroundColor: "#FF5733",
    },
    orderButtonText: {
        color: "#333",
    },
    selectedOrderButtonText: {
        color: "#fff",
    },
    callButton: {
        backgroundColor: "#FF5733",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    callButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});