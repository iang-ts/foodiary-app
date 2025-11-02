import grettingsBg from '@ui/assets/greettings-bg/image.jpg';
import { Logo } from '@ui/components/Logo';
import { ImageBackground } from "react-native";
import { styles } from './styles';

export function Greettings() {
  return (
    <ImageBackground
      source={grettingsBg}
      resizeMode="cover"
      style={styles.container}
    >
      <Logo />
    </ImageBackground>
  )
}
