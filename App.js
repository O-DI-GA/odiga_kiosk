import * as React from "react";
import { StyleSheet, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Linking from "expo-linking";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { Provider } from "react-redux";
import store from "./store/store";

import Payment from "./screens/Payment";
import QRcode from "./screens/QRcode";
import Main from "./screens/Main";
import TableNumSetting from "./screens/TableNumSetting";

const Stack = createStackNavigator();

export default function App() {
  const linking = {
    prefixes: [Linking.createURL("/"), "odiga://"],
    config: {
      screens: {
        Payment: "payment",
      },
    },
  };

  React.useEffect(() => {
    if (Platform.OS === "android") {
      const hideNavigationBar = async () => {
        await NavigationBar.setVisibilityAsync("hidden");
      };
      hideNavigationBar();
    }
  }, []);

  return (
    <>
      <Provider store={store}>
        <StatusBar hidden={true} />
        <NavigationContainer linking={linking}>
          <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{
              headerShown: false, // 모든 화면의 헤더 숨기기
            }}
          >
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="TableNumSetting" component={TableNumSetting} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="QRcode" component={QRcode} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
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
