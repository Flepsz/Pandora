import { RefreshControl, SafeAreaView, View } from "react-native";
import { Text, XStack, YStack, ScrollView, Button } from "tamagui";
import User from "../components/User";
import { ArrowLeftRight, Download } from "@tamagui/lucide-icons";
import { CompositeNavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import RecentHistory from "../components/RecentHistory";
import CardList from "../components/Card/CardList";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useRetrieveOneAccountQuery,
  useRetrieveUserQuery,
} from "../redux/features/authApiSlice";
import {
  setName,
  selectName,
  selectAccount,
} from "../redux/features/authSlice";
import { useAppDispatch } from "../redux/hooks";

export type HomeScreenNavigatioProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Home">,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function HomeScreen() {
  const { data: userData } = useRetrieveUserQuery();

  const account = useSelector(selectAccount);

  const {
    data: accData,
    isLoading,
    isError,
    refetch,
  } = useRetrieveOneAccountQuery({
    account,
  });

  const dispatch = useAppDispatch();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  useEffect(() => {
    if (userData) {
      dispatch(setName(userData.first_name));
    }
    refetch();
  }, [dispatch, userData, refetch]);

  const name = useSelector(selectName);

  return (
    <SafeAreaView className="">
      <ScrollView
        className="flex flex-col gap-5 p-3 pt-12"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <YStack className="flex flex-col bg-primary">
          <XStack className="items-start justify-between">
            <User avatar={userData?.photo_logo} name={name} />
          </XStack>
        </YStack>
        <Text className="text-2xl font-bold text-white">
          Balance: {accData?.balance}
        </Text>
        <YStack>
          <XStack className="flex gap-3 mb-1">
            <Text className="text-lg font-bold text-white">Cards</Text>
          </XStack>
          <CardList horizontal />
        </YStack>

        <View>
          <Text className="text-lg font-bold text-white">History</Text>

          <RecentHistory />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
