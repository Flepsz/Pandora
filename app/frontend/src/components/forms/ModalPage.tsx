import { FormEvent } from "react";
import { Button, Form, Text, View } from "tamagui";
import Spinner from "../common/Spinner";

interface FormsI {
  isRegister?: boolean;
  isCustomerNP?: boolean;
  children: React.ReactNode;
  isLoading: boolean;
  btnText: string;
  onSubmit: () => void;
}

export default function ModalPage({
  isRegister,
  isCustomerNP,
  children,
  isLoading,
  btnText,
  onSubmit,
}: FormsI) {
  return (
    <Form onSubmit={onSubmit} className="flex flex-col justify-center h-screen">
      <Text className="mb-4 text-white">
        {isRegister
          ? "Please register for an account"
          : "Please login to your account"}
      </Text>
      <View className="flex flex-col" space="$3">{children}</View>
      <View className="flex flex-col flex-wrap w-56 gap-3 pt-1 pb-1 mx-auto mt-5 mb-12 text-center md:w-72">
        <Button
          onPress={onSubmit}
          disabled={isLoading}
          className="flexCenter text-white bg-[#530082] py-2 px-6 rounded-lg cursor-pointer "
        >
            {isLoading ? <Spinner sm /> : <Text className="text-white font-bold text-xl">{btnText}</Text>}
        </Button>
      </View>
    </Form>
  );
}
