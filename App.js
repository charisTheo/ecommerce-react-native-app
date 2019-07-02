import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';

import configureStore from './src/store/configureStore';

const store = configureStore();

Navigation.registerComponent("ExampleApp.AuthScreen", 
  () => AuthScreen,
  store, 
  Provider
);
Navigation.registerComponent("ExampleApp.SharePlaceScreen", 
  () => SharePlaceScreen,
  store, 
  Provider
);
Navigation.registerComponent("ExampleApp.FindPlaceScreen", 
  () => FindPlaceScreen, 
  store, 
  Provider
);
Navigation.registerComponent("ExampleApp.PlaceDetailScreen", 
  () => PlaceDetailScreen,
  store,
  Provider
);
Navigation.registerComponent("ExampleApp.SideDrawer", 
  () => SideDrawer,
  store,
  Provider
);

export default App = () => Navigation.startSingleScreenApp({
  screen: {
    // TODO: change to ExampleApp.AuthScreen for authentication
    screen: "ExampleApp.FindPlaceScreen",
    title: "Share a new place"
  }
});