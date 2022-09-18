import {StatusBar} from 'react-native';
import { Background } from './src/components/Background';
import {Home} from './src/screens/Home';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter';
import { Loading } from './src/components/Loading';

export default function App() {
  
const [fontsLoaded]  =useFonts({
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
})

  return (
    <Background>
     <StatusBar
     barStyle="light-content"
     background-color="transparent"
     translucent
     />
      {fontsLoaded ? <Home/> : <Loading/> }
    </Background>
  );
}

