import { View } from "react-native";
import InputM from "../components/InputM";
import { useState } from "react";

export default function HomeScreen() {
  const [test, setTest] = useState<string>("")
  return (
    <View>
      <InputM id="1" label="test" onChange={setTest} value={test} />
    </View>
  )
}

