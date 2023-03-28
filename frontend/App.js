import { useFonts } from 'expo-font';
import AppNav from './navigation/AppNav';
import { AuthProvider } from './context/AuthContext';
// import AppLoading from 'expo-app-loading';
// import * as SplashScreen from 'expo-splash-screen';



let customFonts = {
  'DM-Sans': require('./assets/fonts/DMSans-Regular.ttf'),
  'DM-Sans-Bold': require('./assets/fonts/DMSans-Bold.ttf'),
};


export default function App() {

  const [isLoaded] = useFonts(customFonts);
  if (!isLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}
