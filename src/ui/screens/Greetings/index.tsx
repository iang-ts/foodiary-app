import grettingsBg from '@ui/assets/greettings-bg/image.jpg';
import { Button } from '@ui/components/Button';
import { Logo } from '@ui/components/Logo';
import { ImageBackground } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

export function Greettings() {
  return (
    <ImageBackground
      source={grettingsBg}
      resizeMode="cover"
      style={styles.container}
    >
      <SafeAreaView>
        <Logo />
        <Button>
          Hello
        </Button>
      </SafeAreaView>
    </ImageBackground>
  )
}
