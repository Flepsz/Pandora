import React from "react";
import { Image, View } from "react-native";

export default function TopBrand() {
	return (
		<View className="flex items-center justify-center h-32 pt-4 mb-4 rounded-b-3xl bg-purple-d">
			<Image
				source={require("../../../assets/logo-white.png")}
				className="h-14 w-14"
			/>
		</View>
	);
}
