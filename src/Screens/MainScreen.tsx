import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import {Provider} from 'react-redux';
import {RealmProvider} from '@realm/react';
import {Profile, SavedBook} from '../db/modelClass';

const Tab = createBottomTabNavigator();

const MainScreen: FC = () => {
  return (
    <RealmProvider schema={[SavedBook]}>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Saved" component={SearchScreen} />
      </Tab.Navigator>
    </RealmProvider>
  );
};

export default MainScreen;
