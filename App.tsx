import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import MainScreen from './src/Screens/MainScreen';

export type RootStackParams = {
  MainScreen: any;
};

const App = () => {
  const Stack = createNativeStackNavigator<RootStackParams>();

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator
          initialRouteName="MainScreen"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="MainScreen" component={MainScreen} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
