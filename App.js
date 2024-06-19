import * as React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Payment from "./screens/Payment";
import QRcode from "./screens/QRcode";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Payment"
        screenOptions={{
          headerShown: false, // 모든 화면의 헤더 숨기기
        }}
      >
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="QRcode" component={QRcode} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
