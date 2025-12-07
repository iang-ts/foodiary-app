import { AppText } from "@ui/components/AppText";
import { View } from "react-native";
import { useHomeContext } from "../../context/usehomeContext";
import { CurrentGoal } from "../CurrentGoal";
import { DateSwitcher } from "../DateSwitcher";
import { UserHeader } from "../UserHeader";
import { styles } from "./styles";

export function Header() {
  const { isLoading } = useHomeContext();

  return (
    <View>
      <UserHeader />
      <View style={styles.container}>
        <DateSwitcher />
        <CurrentGoal />

        <View style={styles.divider} />
        <AppText
          weight="medium"
          style={[styles.mealsLable, { opacity: isLoading ? 0.5 : 1 }]}
        >
          REFEIÇÕES
        </AppText>
      </View>
    </View>
  )
}
