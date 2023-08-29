import { NavigationContainer } from "@react-navigation/native";
import { TailwindProvider } from "tailwind-rn";

import utilities from "./tailwind.json";

export default function App() {
  return (
    // @ts-ignore - TailwindProvider is missing a type definition
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </TailwindProvider>
  );
}
