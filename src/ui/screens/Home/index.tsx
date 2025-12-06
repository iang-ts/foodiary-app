import { useAuth } from "@app/contexts/AuthContext/useAuth";
import { AppText } from "@ui/components/AppText";
import { Button } from "@ui/components/Button";
import { WelcomeModal } from "@ui/components/WelcomeModal";
import { View } from "react-native";

export function Home() {
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <WelcomeModal />

      <AppText>acabei de logar</AppText>

      <Button
        onPress={signOut}
      >
        Sair
      </Button>
    </View>
  )
}
