// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Background from './components/Background';
import XMBMenu from './components/XMBMenu';
import BooksScreen from './screens/BooksScreen';
import FictionScreen from './screens/FictionScreen';
import NonFictionScreen from './screens/NonFictionsScreen';
import HomeScreen from './screens/HomeScreen'; 
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen'
import RoutineScreen from './screens/RoutineScreen';
import SpfScreen from './screens/SpfScreen';
import MoisturizingScreen from './screens/MoisturizingScreen';
import YogaScreen from './screens/YogaScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import CardioScreen from './screens/CardioScreen';
import NutritionScreen from './screens/NutritionScreen'
import Breakfast from './screens/Breakfast';
import Lunch from './screens/Lunch';

import BeginnerWorkoutFlow from './screens/BeginnerWorkoutFlow';
import IntermediateWorkoutFlow from './screens/IntermediateWorkoutFlow';
import AdvancedWorkoutFlow from './screens/AdvancedWorkoutFlow';
import ProWorkoutFlow from './screens/ProWorkoutFlow';


import HairScreen from './screens/HairScreen';
import FaceScreen from './screens/FaceScreen';
import BodyScreen from './screens/BodyScreen';
import ArmsScreen from './screens/ArmsScreen';
import LegsScreen from './screens/LegsScreen';
import FeetScreen from './screens/FeetScreen';

import HealthProviderScreen from './screens/HealthProviderScreen';
import MentalWellnessScreen from './screens/MentalWellnessScreen';

import ProductsScreen from './screens/ProductsScreen';
import DealsScreen from './screens/DealsScreen';

import DailyTipsScreen from './screens/DailyTipsScreen';
import TrendsScreen from './screens/TrendsScreen';

import RestaurantScreen from './screens/RestaurantScreen';
import NewsScreen from './screens/NewsScreen';
import OffersScreen from './screens/OffersScreen';
import NearMeLocationScreen from './screens/NearMeLocationScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Background>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
            initialRouteName="HomeScreen" 
          >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="XMB" component={XMBMenu} />
            <Stack.Screen name="BooksScreen" component={BooksScreen} />
            <Stack.Screen name="FictionScreen" component={FictionScreen} />
            <Stack.Screen name="NonFictionScreen" component={NonFictionScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Routine" component={RoutineScreen} />
            <Stack.Screen name="Spf" component={SpfScreen} />
            <Stack.Screen name="Moisturizing" component={MoisturizingScreen} />
            <Stack.Screen name="Yoga" component={YogaScreen} />
            <Stack.Screen name="Workout" component={WorkoutScreen} />
            <Stack.Screen name="Cardio" component={CardioScreen} />
            <Stack.Screen name="Nutrition" component={NutritionScreen} />
            <Stack.Screen name="Breakfast" component={Breakfast} />
            <Stack.Screen name="Lunch" component={Lunch} />

            <Stack.Screen name="BeginnerWorkoutFlow" component={BeginnerWorkoutFlow} options={{ headerShown: false }} />
            <Stack.Screen name="IntermediateWorkoutFlow" component={IntermediateWorkoutFlow} options={{ headerShown: false }} />
            <Stack.Screen name="AdvancedWorkoutFlow" component={AdvancedWorkoutFlow} options={{ headerShown: false }}/>
            <Stack.Screen name="ProWorkoutFlow" component={ProWorkoutFlow} options={{ headerShown: false }} />

            <Stack.Screen name="Hair" component={HairScreen} />
            <Stack.Screen name="Face" component={FaceScreen} />
            <Stack.Screen name="Body" component={BodyScreen} />
            <Stack.Screen name="Arms" component={ArmsScreen} />
            <Stack.Screen name="Legs" component={LegsScreen} />
            <Stack.Screen name="Feet" component={FeetScreen} />
            
            <Stack.Screen name="Products" component={ProductsScreen} />
            <Stack.Screen name="Deals" component={DealsScreen} />
            <Stack.Screen name="DailyTips" component={DailyTipsScreen} />
            <Stack.Screen name="Trends" component={TrendsScreen} />
            <Stack.Screen name="MentalWellness" component={MentalWellnessScreen} />
            <Stack.Screen name="HealthProvider" component={HealthProviderScreen} />
           
            <Stack.Screen name='Restaurant' component={RestaurantScreen}/>
            <Stack.Screen name="News" component={NewsScreen} />
            <Stack.Screen name="NearMeLocation" component={NearMeLocationScreen} />
            <Stack.Screen name="Offers" component={OffersScreen} />


          </Stack.Navigator>
        </Background>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}


