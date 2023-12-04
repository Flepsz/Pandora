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
    <Form onSubmit={onSubmit}>
      <Text className="mb-4">
        {isRegister
          ? "Please register for an account"
          : "Please login to your account"}
      </Text>
      <View>{children}</View>
      <View className="flex flex-col flex-wrap w-56 gap-3 pt-1 pb-1 mx-auto mt-5 mb-12 text-center md:w-72">
        <Button
          onPress={onSubmit}
          disabled={isLoading}
          className="flexCenter gap-3 text-white bg-[#530082] py-2 px-6 rounded-lg cursor-pointer group relative overflow-hidden xl:py-3 xl:px-7 xl:scale-125"
        >
          <View className="absolute inset-0 w-0 bg-dough transition-all duration-[250ms] ease-out group-hover:w-full"></View>
          <View className="relative font-bold text-white group-hover:text-[#530082]">
            {isLoading ? <Spinner sm /> : `${btnText}`}
          </View>
        </Button>
        {isRegister ? null : <a href="#!">Forgot password?</a>}
      </View>
    </Form>
  );
}
