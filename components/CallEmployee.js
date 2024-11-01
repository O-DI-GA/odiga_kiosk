import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {postRequest} from "../utils/api";

export const CallEmployee = ({ tableNumber, storeId, onClose }) => {

    const [orderList] = React.useState([
        "물", "숟가락", "앞치마", "앞접시" , "휴지", "직원호출", "젓가락", "물티슈"
    ])
    const [selectedItems, setSelectedItems] = React.useState([]);

    const handleSelectItem = (item) => {
        setSelectedItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.menuName === item);
            if (existingItem) {
                // 이미 선택된 항목이 있으면 수량 증가
                return prevItems.map((i) =>
                    i.menuName === item ? { ...i, menuCount: i.menuCount + 1 } : i
                );
            } else {
                // 새로 선택된 항목 추가
                return [...prevItems, { menuName: item, menuCount: 1 }];
            }
        });
    };

    const handleIncrease = (item) => {
        setSelectedItems((prevItems) =>
            prevItems.map((i) =>
                i.menuName === item ? { ...i, menuCount: i.menuCount + 1 } : i
            )
        );
    };

    const handleDecrease = (item) => {
        setSelectedItems((prevItems) => {
            const updatedItems = prevItems.map((i) =>
                i.menuName === item ? { ...i, menuCount: i.menuCount - 1 } : i
            );
            // 수량이 0인 항목을 필터링하여 제거
            return updatedItems.filter((i) => i.menuCount > 0);
        });
    };

    // TODO : 직원호출 API 수정
    const call = async () => {
        console.log("직원 호출 목록 : ", selectedItems);
        /*
        if (selectedItems && selectedItems.length > 0) {
            const orderPayload = {
                tableOrderMenuforRegisters: selectedItems.map((item) => {
                    console.log("Item structure:", item);
                    return {
                        menuName: item.menuName,
                        menuCount: item.menuCount,
                    };
                }),
            };


            try {
                const response = await postRequest(
                    `/table/${storeId}/order/${tableNumber}`,
                    orderPayload
                );
                console.log("서버 응답:", response);
            } catch (err) {
                console.log("주문 전송 오류:", err);
            }
        } else {
            console.log("장바구니가 비어 있습니다.");
        }
        */
    }

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
                            style={styles.orderButton}
                            onPress={() => handleSelectItem(item)}
                        >
                            <Text style={styles.orderButtonText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.rightBox}>
                    {selectedItems.map((item) => (
                        <View key={item.menuName} style={styles.selectedItemRow}>
                            <Text style={styles.selectedItemText}>{item.menuName}</Text>
                            <TouchableOpacity onPress={() => handleDecrease(item.menuName)} style={styles.adjustButton}>
                                <Text style={styles.adjustButtonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{item.menuCount}</Text>
                            <TouchableOpacity onPress={() => handleIncrease(item.menuName)} style={styles.adjustButton}>
                                <Text style={styles.adjustButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                    <TouchableOpacity style={styles.callButton} onPress={() => call()}>
                        <Text style={styles.callButtonText}>요청하기</Text>
                    </TouchableOpacity>
                </View>
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
    orderButtonText: {
        color: "#333",
    },
    rightBox: {
        marginTop: 20,
    },
    selectedItemRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    selectedItemText: {
        color: "#fff",
        fontSize: 16,
        flex: 1,
    },
    adjustButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#666",
        alignItems: "center",
        justifyContent: "center",
    },
    adjustButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    quantityText: {
        color: "#fff",
        fontSize: 16,
        marginHorizontal: 10,
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
