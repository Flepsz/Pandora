import * as EntIcon from "react-native-vector-icons/Entypo";
import { Button } from "tamagui";
import useRegisterCard from "../../hooks/use-registercard";

export default function AddCard({ onCardAdded }: { onCardAdded: () => void }) {
  const {
		isLoading,
    onSubmit
	} = useRegisterCard()

  const handlePress = async () => {
    await onSubmit();
    onCardAdded(); 
  };

  return (
    <Button className="bg-white h-full" onPress={handlePress} disabled={isLoading}><EntIcon.default name="plus" size={30} /></Button>
  )
}
