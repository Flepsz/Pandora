import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import "../../globals.css";
import React, { useLayoutEffect } from "react";
import ProfileScreen from "../screens/ProfileScreen";
import AuthScreen from "../screens/auth/AuthScreen";
import RegisterCNP from "../screens/auth/register/RegisterCNP";
import RegisterCLP from "../screens/auth/register/RegisterCLP";
import LoginCLP from "../screens/auth/login/LoginCLP";
import LoginCNP from "../screens/auth/login/LoginCNP";
import { useNavigation } from "@react-navigation/native";

export type RootStackParamList = {
  UserProfile: { avatar?: string };
  Main: undefined;
  Auth: undefined;
  RegisterCNP: undefined;
  RegisterCLP: undefined;
  LoginCNP: undefined;
  LoginCLP: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <RootStack.Navigator initialRouteName="Auth">
      <RootStack.Group>
        <RootStack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="RegisterCNP"
          component={RegisterCNP}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="RegisterCLP"
          component={RegisterCLP}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="LoginCNP"
          component={LoginCNP}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="LoginCLP"
          component={LoginCLP}
          options={{ headerShown: false }}
        />
      </RootStack.Group>
      <RootStack.Group>
        <RootStack.Screen name="Main" component={TabNavigator} />
      </RootStack.Group>
      <RootStack.Group>
        <RootStack.Screen
          name="UserProfile"
          options={{ headerShown: false }}
          component={ProfileScreen}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}
