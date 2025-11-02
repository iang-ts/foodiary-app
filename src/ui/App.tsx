import {
  HostGrotesk_400Regular,
  HostGrotesk_500Medium,
  HostGrotesk_600SemiBold,
  useFonts,
} from '@expo-google-fonts/host-grotesk';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Greettings } from './screens/Greetings';


export default function App() {
  const [isFontsLoaded, isFontsError] = useFonts({
    HostGrotesk_400Regular,
    HostGrotesk_500Medium,
    HostGrotesk_600SemiBold,
  });

  if (!isFontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Greettings />
    </SafeAreaProvider>
  )
}
