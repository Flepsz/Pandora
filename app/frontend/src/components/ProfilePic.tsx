import { Avatar, Button, Text, View, XStack, YStack } from "tamagui";
import {
	usePatchUserPhotoMutation,
	useRetrieveUserQuery,
} from "../redux/features/authApiSlice";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

interface ProfilePicPropsI {
	avatar?: string;
}

export default function ProfilePic({ avatar }: ProfilePicPropsI) {
	const [Photo, setPhoto] = useState(
		"https://static-00.iconduck.com/assets.00/profile-major-icon-512x512-xosjbbdq.png"
	);
	const [imgPick, setImgPick] = useState();

	useEffect(() => {
		async function fetchData() {
			const {
				data: userData,
				isLoading,
				isError,
				refetch,
			} = useRetrieveUserQuery();
			const profilePhoto = userData?.photo_logo;
			profilePhoto && setPhoto(profilePhoto);
		}
		fetchData();
	}, [imgPick]);

	async function pickImage() {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			const [updatePhoto, { isLoading: isUpdating }] =
				usePatchUserPhotoMutation();
			const profilePic = result.assets[0];

			try {
				await updatePhoto({ profilePic })
					.unwrap()
					.then(() => {
						setImgPick(profilePic);
					});
			} catch (error) {
				alert(`Erro ao atualizar a imagem`);
			}
		} else {
			alert("Erro ao escolher a imagem.");
		}
	}

	return (
		<View className="w-full h-[40%] flex justify-center items-center text-center">
			<YStack className="flex flex-col gap-4">
				<Avatar size="$13" circular>
					<Avatar.Image src={Photo} className="" />
					<Avatar.Fallback backgroundColor="$gray5" />
				</Avatar>
				<Button className="rounded-full bg-purple-l" onPress={() => pickImage}>
					<Text className="text-base font-bold text-center text-white">
						Change Photo
					</Text>
				</Button>
			</YStack>
		</View>
	);
}
