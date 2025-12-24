// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import XMBMenu from './components/XMBMenu';

// Books
import BooksScreen from './screens/books/BooksScreen';
import FictionScreen from './screens/books/FictionScreen';
import NonFictionScreen from './screens/books/NonFictionsScreen';

// Core
import HomeScreen from './screens/core/HomeScreen';
import SettingsScreen from './screens/core/SettingsScreen';
import IntroScreen from './screens/core/IntroScreen';

// Auth
import LoginScreen from './screens/auth/LoginScreen';
import SignupScreen from './screens/auth/SignupScreen';
import SelectRoleScreen from './screens/auth/SelectRoleScreen';
import RegistrationByRoleScreen from './screens/auth/RegistrationByRoleScreen';

// Wellness
import RoutineScreen from './screens/wellness/RoutineScreen';
import SpfScreen from './screens/wellness/SpfScreen';
import MoisturizingScreen from './screens/wellness/MoisturizingScreen';
import YogaScreen from './screens/wellness/YogaScreen';
import HairScreen from './screens/wellness/HairScreen';
import FaceScreen from './screens/wellness/FaceScreen';
import BodyScreen from './screens/wellness/BodyScreen';
import ArmsScreen from './screens/wellness/ArmsScreen';
import LegsScreen from './screens/wellness/LegsScreen';
import FeetScreen from './screens/wellness/FeetScreen';
import HealthProviderScreen from './screens/wellness/HealthProviderScreen';
import MentalWellnessScreen from './screens/wellness/MentalWellnessScreen';
import SkincareScreen from './screens/wellness/SkincareScreen';

// Fitness flows
import WorkoutScreen from './screens/fitnessFlows/WorkoutScreen';
import CardioScreen from './screens/fitnessFlows/CardioScreen';
import BeginnerWorkoutFlow from './screens/fitnessFlows/BeginnerWorkoutFlow';
import IntermediateWorkoutFlow from './screens/fitnessFlows/IntermediateWorkoutFlow';
import AdvancedWorkoutFlow from './screens/fitnessFlows/AdvancedWorkoutFlow';
import ProWorkoutFlow from './screens/fitnessFlows/ProWorkoutFlow';


// Marketplace
import ProductsScreen from './screens/marketplace/ProductsScreen';
import DealsScreen from './screens/marketplace/DealsScreen';
import RestaurantScreen from './screens/marketplace/RestaurantScreen';
import OffersScreen from './screens/marketplace/OffersScreen';
import NearMeLocationScreen from './screens/marketplace/NearMeLocationScreen';
import CustomerMarketplace from './screens/marketplace/CustomerMarketplace';
import MarketplaceSellerScreen from './screens/marketplace/MarketplaceSellerScreen';
import Vendor from './screens/marketplace/Vendor';
import SellerOrdersScreen from './screens/marketplace/SellerOrdersScreen';
import SellerProductsScreen from './screens/marketplace/SellerProductsScreen';
import SellerProfileScreen from './screens/marketplace/SellerProfileScreen';

// Owner / Trainer / Payments
import GymOwnerScreen from './screens/owner/GymOwnerScreen';
import GymManagementScreen from './screens/owner/GymManagementScreen';
import MemberManagementScreen from './screens/owner/MemberManagementScreen';
import OwnerTrainerManagementScreen from './screens/owner/TrainerManagementScreen';
import BroadcastScreen from './screens/owner/BroadcastScreen';
import SendReminderScreen from './screens/owner/sendReminderScreen';
import AddTrainerScreen from './screens/owner/AddTrainerScreen';
import EditUpgradeTrainerScreen from './screens/owner/EditUpgradeTrainerScreen';
import AddMemberScreen from './screens/owner/AddMemberScreen';
import EditUpgradeMemberScreen from './screens/owner/EditUpgradeMemberScreen';
import RemoveMemberScreen from './screens/owner/RemoveMemberScreen';

import CustomerPaymentScreen from './screens/payments/CustomerPaymentScreen';

// Trainer Management (Member side)
import TrainerManagementScreen from './screens/trainerManagement/TrainerManagementScreen';
import HireTrainerScreen from './screens/trainerManagement/HireTrainerScreen';
import ChangeTrainerScreen from './screens/trainerManagement/ChangeTrainerScreen';
import FireTrainerScreen from './screens/trainerManagement/FireTrainerScreen';
import ManageTrainerScreen from './screens/trainerManagement/ManageTrainerScreen';

// News / Reports
import NewsScreen from './screens/NewsScreen';
import UserActivityReportScreen from './screens/owner/UserActivityReportScreen';
import MemberActivityDetailScreen from './screens/owner/MemberActivityDetailScreen';
import GymEquipment from './screens/owner/GymEquipment';

// Trainer screens
import TrainerScreen from './screens/trainer/TrainerScreen';
import TrainerHomeScreen from './screens/trainer/TrainerHomeScreen';
import TrainerClientsScreen from './screens/trainer/TrainerClientsScreen';
import TrainerCalendarScreen from './screens/trainer/TrainerCalendarScreen';
import TrainerPaymentScreen from './screens/trainer/TrainerPaymentScreen';
import TrainerNotificationsScreen from './screens/trainer/TrainerNotificationsScreen';
import TrainerProfileScreen from './screens/trainer/TrainerProfileScreen';

// Member
import Breakfast from './screens/member/Breakfast';
import Lunch from './screens/member/Lunch';
import NutritionScreen from './screens/member/NutritionScreen';
import DailyTipsScreen from './screens/member/DailyTipsScreen';
import TrendsScreen from './screens/member/TrendsScreen';
import Diet from './screens/member/Diet';
import MyTrackerScreen from './screens/member/MyTrackerScreen';
import MyExercisesScreen from './screens/member/MyExercisesScreen';
import FoodScreen from './screens/member/FoodScreen';
import MusicScreen from './screens/member/MusicScreen';
import PhotoScreen from './screens/member/PhotoScreen';
import PayFeesScreen from './screens/member/PayFeesScreen';
import MessageTrainerScreen from './screens/member/messagTrainer';

// ✅ MEMBER IMPORTS (NO ../)
import MemberHomeScreen from './screens/member/MemberHome';
import MyProfile from './screens/member/MyProfile';
import MyCalendar from './screens/member/MyCalendar';
import MyNotifications from './screens/member/MyNotifications';
import MyPayment from './screens/member/MyPayment';
import MySubscription from './screens/member/MySubcription';
import MyWorkoutTracker from './screens/member/MyWorkoutTracker';

import MarketplaceHomeScreen from './screens/marketplace/MarketplaceHomeScreen';
import MarketplaceProfile from './screens/marketplace/MarketplaceProfile';
import MarketplaceServices from './screens/marketplace/MarketplaceServices';
import MarketplaceProducts from './screens/marketplace/MarketplaceProducts';
import MarketplacePayments from './screens/marketplace/MarketplacePayments';
import MarketplaceNotifications from './screens/marketplace/MarketplaceNotifications';


// Owner Screens

import OwnerDashboardScreen from './screens/owner/OwnerDashboardScreen';
import OwnerProfile from './screens/owner/OwnerProfile';
import OwnerCalendar from './screens/owner/OwnerCalendar';
import OwnerMember from './screens/owner/OwnerMember';
import OwnerTrainerPage from './screens/owner/OwnerTrainerPage';
import OwnerMarket from './screens/owner/OwnerMarket';
import OwnerNotifications from './screens/owner/OwnerNotifications';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            animation: 'slide_from_right',
            headerStyle: { backgroundColor: '#020617' },
            headerTintColor: '#e5e7eb',
            headerTitleStyle: { fontWeight: '700' },
          }}
          initialRouteName="Intro"
        >

          {/* Core */}
          <Stack.Screen name="Intro" component={IntroScreen} options={{ title: 'Welcome' }} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
          <Stack.Screen name="XMB" component={XMBMenu} options={{ title: 'Menu' }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />

          {/* Books */}
          <Stack.Screen name="BooksScreen" component={BooksScreen} options={{ title: 'Books' }} />
          <Stack.Screen name="FictionScreen" component={FictionScreen} options={{ title: 'Fiction' }} />
          <Stack.Screen name="NonFictionScreen" component={NonFictionScreen} options={{ title: 'Non-Fiction' }} />

          {/* Auth */}
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Sign Up' }} />
          <Stack.Screen name="SelectRole" component={SelectRoleScreen} options={{ title: 'Select Role' }} />
          <Stack.Screen name="RegistrationByRole" component={RegistrationByRoleScreen} options={{ title: 'Registration' }} />

          {/* Wellness */}
          <Stack.Screen name="Routine" component={RoutineScreen} options={{ title: 'Routine' }} />
          <Stack.Screen name="Spf" component={SpfScreen} options={{ title: 'SPF & Sun Care' }} />
          <Stack.Screen name="Moisturizing" component={MoisturizingScreen} options={{ title: 'Moisturizing' }} />
          <Stack.Screen name="Yoga" component={YogaScreen} options={{ title: 'Yoga' }} />
          <Stack.Screen name="Hair" component={HairScreen} options={{ title: 'Hair Care' }} />
          <Stack.Screen name="Face" component={FaceScreen} options={{ title: 'Face Care' }} />
          <Stack.Screen name="Body" component={BodyScreen} options={{ title: 'Body Care' }} />
          <Stack.Screen name="Arms" component={ArmsScreen} options={{ title: 'Arms Care' }} />
          <Stack.Screen name="Legs" component={LegsScreen} options={{ title: 'Legs Care' }} />
          <Stack.Screen name="Feet" component={FeetScreen} options={{ title: 'Feet Care' }} />
          <Stack.Screen name="MentalWellness" component={MentalWellnessScreen} options={{ title: 'Mental Wellness' }} />
          <Stack.Screen name="HealthProvider" component={HealthProviderScreen} options={{ title: 'Health Provider' }} />
          <Stack.Screen name="Skincare" component={SkincareScreen} options={{ title: 'Skincare' }} />

          {/* Fitness */}
          <Stack.Screen name="Workout" component={WorkoutScreen} options={{ title: 'Workout' }} />
          <Stack.Screen name="Cardio" component={CardioScreen} options={{ title: 'Cardio' }} />
          <Stack.Screen name="BeginnerWorkoutFlow" component={BeginnerWorkoutFlow} options={{ title: 'Beginner Workout' }} />
          <Stack.Screen name="IntermediateWorkoutFlow" component={IntermediateWorkoutFlow} options={{ title: 'Intermediate Workout' }} />
          <Stack.Screen name="AdvancedWorkoutFlow" component={AdvancedWorkoutFlow} options={{ title: 'Advanced Workout' }} />
          <Stack.Screen name="ProWorkoutFlow" component={ProWorkoutFlow} options={{ title: 'Pro Workout' }} />

          {/* Member */}
          <Stack.Screen name="Nutrition" component={NutritionScreen} options={{ title: 'Nutrition' }} />
          <Stack.Screen name="Breakfast" component={Breakfast} options={{ title: 'Breakfast' }} />
          <Stack.Screen name="Lunch" component={Lunch} options={{ title: 'Lunch' }} />
          <Stack.Screen name="DailyTips" component={DailyTipsScreen} options={{ title: 'Daily Tips' }} />
          <Stack.Screen name="Trends" component={TrendsScreen} options={{ title: 'Trends' }} />
          <Stack.Screen name="Diet" component={Diet} options={{ title: 'Diet' }} />
          <Stack.Screen name="Food" component={FoodScreen} options={{ title: 'Food' }} />
          <Stack.Screen name="Music" component={MusicScreen} options={{ title: 'Music' }} />
         <Stack.Screen name="Photo" component={PhotoScreen} options={{ title: 'Photos' }} />
          <Stack.Screen name="MyTracker" component={MyTrackerScreen} options={{ title: 'My Tracker' }} />
          <Stack.Screen name="MyExercisesScreen" component={MyExercisesScreen} options={{ title: 'My Exercises' }} />
          <Stack.Screen name="PayFeesScreen" component={PayFeesScreen} options={{ title: 'Pay Fees' }} />
          <Stack.Screen name="MessageTrainerScreen" component={MessageTrainerScreen} options={{ title: 'Message Trainer' }} /> 

          <Stack.Screen
  name="MemberHome"
  component={MemberHomeScreen}
  options={{ title: "Member Home" }}
/>

<Stack.Screen
  name="MyProfile"
  component={MyProfile}
  options={{ title: "My Profile" }}
/>

<Stack.Screen
  name="MyCalendar"
  component={MyCalendar}
  options={{ title: "My Calendar" }}
/>

<Stack.Screen
  name="MySubscription"
  component={MySubscription}
  options={{ title: "My Subscriptions" }}
/>

<Stack.Screen
  name="MyPayment"
  component={MyPayment}
  options={{ title: "My Payments" }}
/>

<Stack.Screen
  name="MyNotifications"
  component={MyNotifications}
  options={{ title: "Notifications" }}
/>

<Stack.Screen
  name="MyWorkoutTracker"
  component={MyWorkoutTracker}
  options={{ title: "Workout Tracker" }} />

  {/*market place */}

  <Stack.Screen
  name="MarketplaceHome"
  component={MarketplaceHomeScreen}
  options={{ title: "Marketplace Home" }}
/>
<Stack.Screen
  name="MarketplaceProfile"
  component={MarketplaceProfile}
  options={{ title: "My Profile" }}
/>
<Stack.Screen
  name="MarketplaceServices"
  component={MarketplaceServices}
  options={{ title: "My Services" }}
/>
<Stack.Screen
  name="MarketplaceProducts"
  component={MarketplaceProducts}
  options={{ title: "My Products" }}
/>
<Stack.Screen
  name="MarketplacePayments"
  component={MarketplacePayments}
  options={{ title: "My Payments" }}
/>
<Stack.Screen
  name="MarketplaceNotifications"
  component={MarketplaceNotifications}
  options={{ title: "My Notifications" }}
/>

  {/*owner dashboard */}

  <Stack.Screen name="OwnerDashboard" component={OwnerDashboardScreen} />
  <Stack.Screen name="OwnerProfile" component={OwnerProfile} />
  <Stack.Screen name="OwnerCalendar" component={OwnerCalendar} />
  <Stack.Screen name="OwnerMember" component={OwnerMember} />
  <Stack.Screen name="OwnerTrainerPage" component={OwnerTrainerPage} /> 
  <Stack.Screen name="OwnerMarket" component={OwnerMarket} />
  <Stack.Screen name="OwnerNotifications" component={OwnerNotifications} /> 



          {/* Marketplace */}
          <Stack.Screen name="Products" component={ProductsScreen} options={{ title: 'Products' }} />
          <Stack.Screen name="Deals" component={DealsScreen} options={{ title: 'Deals' }} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} options={{ title: 'Restaurant' }} />
          <Stack.Screen name="NearMeLocation" component={NearMeLocationScreen} options={{ title: 'Near Me' }} />
          <Stack.Screen name="Offers" component={OffersScreen} options={{ title: 'Offers' }} />
          <Stack.Screen name="CustomerMarketplace" component={CustomerMarketplace} options={{ title: 'Customer Marketplace' }} />
          <Stack.Screen name="Vendor" component={Vendor} options={{ title: 'Vendor' }} />
          <Stack.Screen name="MarketplaceSeller" component={MarketplaceSellerScreen} options={{ title: 'Marketplace Seller' }} />
          <Stack.Screen name="SellerOrders" component={SellerOrdersScreen} options={{ title: 'Seller Orders' }} />
          <Stack.Screen name="SellerProducts" component={SellerProductsScreen} options={{ title: 'Seller Products' }} />
          <Stack.Screen name="SellerProfile" component={SellerProfileScreen} options={{ title: 'Seller Profile' }} />

          {/* Owner / Trainer / Payments */}
          <Stack.Screen name="GymOwner" component={GymOwnerScreen} options={{ title: 'Owner Dashboard' }} />
          <Stack.Screen name="GymManagement" component={GymManagementScreen} options={{ title: 'Gym Management' }} />
          <Stack.Screen name="CustomerPayment" component={CustomerPaymentScreen} options={{ title: 'Payment' }} />
          <Stack.Screen name="MemberManagement" component={MemberManagementScreen} options={{ title: 'Member Management' }} />
          <Stack.Screen name="OwnerTrainerManagement" component={OwnerTrainerManagementScreen} options={{ title: 'Trainer Management (Owner)' }} />
          <Stack.Screen name="Broadcast" component={BroadcastScreen} options={{ title: 'Broadcast' }} />
          <Stack.Screen name="SendReminder" component={SendReminderScreen} options={{ title: 'Send Reminder' }} />
          <Stack.Screen name="AddTrainer" component={AddTrainerScreen} options={{ title: 'Add Trainer' }} />
          <Stack.Screen name="EditUpgradeTrainer" component={EditUpgradeTrainerScreen} options={{ title: 'Edit / Upgrade Trainer' }} />
          <Stack.Screen name="AddMember" component={AddMemberScreen} options={{ title: 'Add Member' }} />
          <Stack.Screen name="EditUpgradeMember" component={EditUpgradeMemberScreen} options={{ title: 'Edit / Upgrade Member' }} />
          <Stack.Screen name="RemoveMember" component={RemoveMemberScreen} options={{ title: 'Remove Member' }} />

          {/* Trainer Management (Member side) */}
          <Stack.Screen name="TrainerManagement" component={TrainerManagementScreen} options={{ title: 'Trainer Management' }} />
          <Stack.Screen name="HireTrainer" component={HireTrainerScreen} options={{ title: 'Hire Trainer' }} />
          <Stack.Screen name="ChangeTrainer" component={ChangeTrainerScreen} options={{ title: 'Change Trainer' }} />
          <Stack.Screen name="FireTrainer" component={FireTrainerScreen} options={{ title: 'Fire Trainer' }} />
          <Stack.Screen name="ManageTrainer" component={ManageTrainerScreen} options={{ title: 'Manage Trainer' }} />

          {/* News / Reports */}
          <Stack.Screen name="News" component={NewsScreen} options={{ title: 'News' }} />
          <Stack.Screen name="UserActivityReport" component={UserActivityReportScreen} options={{ title: 'User Activity' }} />
          <Stack.Screen name="MemberActivityDetail" component={MemberActivityDetailScreen} options={{ title: 'Member Detail' }} />
          <Stack.Screen name="GymEquipment" component={GymEquipment} options={{ title: 'Gym Equipment' }} />

          {/* Trainer screens */}
          <Stack.Screen name="TrainerScreen" component={TrainerScreen} options={{ title: 'Trainer' }} />
          <Stack.Screen name="TrainerHomeScreen" component={TrainerHomeScreen} options={{ title: 'Trainer Home' }} />
          <Stack.Screen name="TrainerClientsScreen" component={TrainerClientsScreen} options={{ title: 'Trainer Clients' }} />
          <Stack.Screen name="TrainerCalendarScreen" component={TrainerCalendarScreen} options={{ title: 'Trainer Calendar' }} />
          <Stack.Screen name="TrainerPaymentScreen" component={TrainerPaymentScreen} options={{ title: 'Trainer Payment' }} />
          <Stack.Screen name="TrainerProfileScreen" component={TrainerProfileScreen} options={{ title: 'Trainer Profile' }} />
           <Stack.Screen name="TrainerNotifications"  component={TrainerNotificationsScreen} options={{ title: 'TrainerNotifications' }} />

        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
