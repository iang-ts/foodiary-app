import { theme } from "@ui/styles/theme";
import { Modal, StatusBar, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../AppText";
import { Button } from "../Button";
import { styles } from "./styles";

export function WelcomeModal() {
  return (
    <Modal
      visible
      transparent
      statusBarTranslucent
      animationType="fade"
    >
      <StatusBar
        barStyle={"light-content"}
        animated
      />

      <View style={styles.container}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.wrapper}>
            <View style={styles.content}>
              <View style={styles.header}>
                <View style={styles.icon}>
                  <AppText>🥦</AppText>
                </View>

                <View style={styles.headerContent}>
                  <AppText
                    align="center"
                    size="3xl"
                    weight="semiBold"
                    color={theme.colors.gray[100]}
                    style={styles.title}
                  >
                    Seu plano de dieta para <Text style={styles.titleHighlight}>Perder Peso</Text> está pronto!
                  </AppText>
                  <AppText
                    align="center"
                    color={theme.colors.gray[600]}
                  >
                    Essa é a recomendação diária recomendada para seu plano. Fique tranquilo, você poderá editar depois caso deseje.
                  </AppText>
                </View>
              </View>
            </View>

            <View style={styles.footer}>
              <Button>
                Começar meu plano
              </Button>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      </View>
    </Modal>
  )
}
