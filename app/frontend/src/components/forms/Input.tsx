import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableOpacity,
} from "react-native";
import { Label, View, Input, Text } from "tamagui";

import { TextInputMask, TextInputMaskTypeProp } from "react-native-masked-text";

interface Props {
  labelText: string;
  labelId: string;
  onChange: (text: string, labelId: string) => void;
  value: string;
  type?: TextInputMaskTypeProp;
  children: React.ReactNode;
  required?: boolean;
  secureTextEntry?: boolean;
  maxLength?: number
}

export default function InputC({
  labelText,
  labelId,
  onChange,
  value,
  children,
  secureTextEntry,
  type,
  maxLength
}: Props) {
  return (
    <View>
      <View className="flex justify-between align-center">
        <Label
          htmlFor={labelId}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          <Text className="text-white">{children}</Text>
        </Label>
      </View>
      <View className="">
        {type ? (
          <TextInputMask
          type={type}
          id={labelId}
          className="block w-full bg-zinc-700 rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-purple-800 ring-inset placeholder:text-white focus:border-purple-d focus:ring-purple-d focus:outline-none focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
            onChange(event.nativeEvent.text, labelId)
          }
          value={value}
          placeholder={labelText}
          placeholderTextColor={"#A8A8A8"}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength ? maxLength : 50}
        />
        ) : (
          <Input
          id={labelId}
          className="block w-full bg-zinc-700 rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-purple-800 ring-inset placeholder:text-white focus:border-purple-d focus:ring-purple-d focus:outline-none focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
            onChange(event.nativeEvent.text, labelId)
          }
          value={value}
          placeholder={labelText}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength ? maxLength : 50}
        />
        )}
      </View>
    </View>
  );
}
