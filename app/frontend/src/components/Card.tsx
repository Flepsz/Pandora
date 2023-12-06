import { Text, View, XStack, YStack, styled } from "tamagui";
import { Image } from 'expo-image';
import imgFlags from "../utils/imgFlags";

interface CardPropsI {
	color: string;
	last_numbers?: string;
	exp_date?: Date;
	owner?: string;
  flag: string;
}

export const XStackCard = styled(XStack, {
	acceptsClassName: true,
	height: "$14",
	padding: "$4",

	variants: {
		bgColor: {
			purple: {
				bg: "#661395",
			},
			green: {
				bg: "#09B78C",
			},
		},
	} as const,

	defaultVariants: {
		bgColor: "purple",
	},
});

export default function Card({ color, last_numbers, exp_date, owner, flag }: CardPropsI) {
  const imgFlagSrc = imgFlags[flag]
  
  
	return (
		<XStackCard bgColor={color} className="mr-4 w-80 rounded-3xl">
			<YStack className="flex flex-col justify-between flex-1">
				<XStack className="flex justify-between">
					<XStack className="flex flex-col">
						<Text className="text-xs font-semibold text-white">
							Pandora Debit
						</Text>
						<XStack className="flex flex-row gap-0.5 items-center">
							<View className="w-[3px] h-[3px] bg-white rounded-full"></View>
							<View className="w-[3px] h-[3px] bg-white rounded-full"></View>
							<View className="w-[3px] h-[3px] bg-white rounded-full"></View>
							<View className="w-[3px] h-[3px] bg-white rounded-full"></View>
							<Text className="pl-1 text-[9px] text-center text-white">
								{last_numbers}
							</Text>
						</XStack>
					</XStack>
					<XStack className="flex flex-col items-end">
						<Text className="text-xs text-white ">
							CVV:{" "}
							<XStack className="flex gap-0.5">
								<View className="w-[3px] h-[3px] bg-white rounded-full"></View>
								<View className="w-[3px] h-[3px] bg-white rounded-full"></View>
								<View className="w-[3px] h-[3px] bg-white rounded-full"></View>
							</XStack>
						</Text>
					</XStack>
				</XStack>
        <XStack>
          <Text className="text-3xl font-extrabold text-white">My Card</Text>
        </XStack>
        <XStack className="flex justify-between">
          <XStack className="flex flex-col">
            <Text className="text-xs font-semibold text-white">Exp: {exp_date}</Text>
            <Text className="text-xs font-light text-white">{owner}</Text>
          </XStack>
          <Image source={imgFlagSrc} className="w-12 h-7" contentFit="fill" />
        </XStack>
			</YStack>
		</XStackCard>
	);
}
