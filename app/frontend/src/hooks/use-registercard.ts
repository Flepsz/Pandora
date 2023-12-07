import {
  useRegisterCardMutation,
  useRegisterTransactionMutation,
} from "../redux/features/authApiSlice";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { selectAccount } from "../redux/features/authSlice";

export default function useRegisterCard() {
  const [register, { isLoading }] = useRegisterCardMutation();

  const account = useSelector(selectAccount);

  const onSubmit = () => {
    register({ account })
      .unwrap()
      .then(() => {
        Toast.show({ type: "success", text1: "Card created with success" });
      })
      .catch((error) => {
        const errorMessage = error.data.status;
				Toast.show({
					type: "error",
					text1: "Failed to register card",
					text2: errorMessage,
				});
      });
  };

  return {
    account,
    isLoading,
    onSubmit,
  };
}
