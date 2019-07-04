import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import MainScreen from './src/screens/Main/MainScreen';
// import FavouritesScreen from './src/screens/Favourites/FavouritesScreen';
// import WishListScreen from './src/screens/WishList/WishListScreen';
// import ShoppingCartScreen from './src/screens/ShoppingCart/ShoppingCartScreen';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';

import configureStore from './src/store/configureStore';
import startTabs from './src/screens/MainTabs/startMainTabs';

const store = configureStore();

Navigation.registerComponent("EcommerceApp.MainScreen", 
  () => MainScreen,
  store,
  Provider
);
// Navigation.registerComponent("EcommerceApp.FavouritesScreen", 
// () => FavouritesScreen,
// store,
// Provider
// );
// Navigation.registerComponent("EcommerceApp.WishListScreen", 
// () => FavouritesScreen,
// store,
// Provider
// );
// Navigation.registerComponent("EcommerceApp.ShoppingCartScreen", 
//   () => ShoppingCartScreen,
//   store,
//   Provider
// );
Navigation.registerComponent("EcommerceApp.SideDrawer", 
  () => SideDrawer,
  store,
  Provider
);

// export default App = () => Navigation.startSingleScreenApp({
//   screen: {
//     screen: "EcommerceApp.MainScreen",
//     title: "Products list"
//   }
// });

export default App = () => startTabs();