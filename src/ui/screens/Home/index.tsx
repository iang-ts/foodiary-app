import { WelcomeModal } from "@ui/components/WelcomeModal";
import { View } from "react-native";

export function Home() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <WelcomeModal />
    </View>
  )
}
