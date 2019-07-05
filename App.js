import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import MainScreen from './src/screens/Main/MainScreen';
import WishListScreen from './src/screens/WishList/WishListScreen';
import ShoppingCartScreen from './src/screens/ShoppingCart/ShoppingCartScreen';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';

import configureStore from './src/store/configureStore';
import startTabs from './src/screens/MainTabs/startMainTabs';

const store = configureStore();

Navigation.registerComponent("EcommerceApp.MainScreen", 
  () => MainScreen,
  store,
  Provider
);
Navigation.registerComponent("EcommerceApp.WishListScreen", 
  () => WishListScreen,
  store,
  Provider
);
Navigation.registerComponent("EcommerceApp.ShoppingCartScreen", 
  () => ShoppingCartScreen,
  store,
  Provider
);
Navigation.registerComponent("EcommerceApp.SideDrawer", 
  () => SideDrawer,
  store,
  Provider
);

export default App = () => startTabs();