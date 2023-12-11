import { Avatar, Button, Text, View, YStack } from "tamagui";
import { useFocusEffect } from "@react-navigation/native";
import {
	useRetrieveUserQuery,
	useUpdateUserPhotoMutation,
} from "../redux/features/authApiSlice";
import { useCallback, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

interface ProfilePicPropsI {
	avatar?: string;
}

export default function ProfilePic({ avatar }: ProfilePicPropsI) {
	const [photo, setPhoto] = useState<string | null>(
    "https://static-00.iconduck.com/assets.00/profile-major-icon-512x512-xosjbbdq.png"
  );
  const [imgPick, setImgPick] = useState<string | null>(null);

	const { data: userData, refetch: refetchUser } = useRetrieveUserQuery();
	const [updateUserPhoto, { isLoading: isUpdating }] =
		useUpdateUserPhotoMutation();

	useEffect(() => {
		if (userData) {
			const profilePhoto = userData?.photo_logo;
			profilePhoto && setPhoto(profilePhoto);
		}
	}, [userData, imgPick]);

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);
		
		if (!result.canceled) {
			try {
				const profilePic = result.assets[0].uri
				await updateUserPhoto({ profilePic }).unwrap();
				setImgPick(profilePic);
			} catch (error) {
				alert(`Erro ao atualizar a imagem`);
				console.log(error);
				
			}
		} else {
			alert("Erro ao escolher a imagem.");
		}
	};

	useFocusEffect(
		useCallback(() => {
			refetchUser();
		}, [refetchUser])
	);

	return (
		<View className="w-full h-[40%] flex justify-center items-center text-center">
			<YStack className="flex flex-col gap-4">
				<Avatar size="$13" circular>
					<Avatar.Image src={photo} className="" />
					<Avatar.Fallback backgroundColor="$gray5" />
				</Avatar>
				<Button className="rounded-full bg-purple-l" onPress={pickImage}>
					<Text className="text-base font-bold text-center text-white">
						Change Photo
					</Text>
				</Button>
			</YStack>
		</View>
	);
}
