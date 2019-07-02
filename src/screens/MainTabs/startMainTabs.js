import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === "android" ? "md-book" : "ios-book", 30),
        Icon.getImageSource(Platform.OS === "android" ? "md-cart" : "ios-cart", 30),
        Icon.getImageSource(Platform.OS === "android" ? "md-menu" : "ios-menu", 30)
    ]).then((icons) => {    
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: 'ExampleApp.FindPlaceScreen',
                    label: "Find Place",
                    title: "Find Place",
                    icon: icons[0],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: icons[2],
                                title: "Menu",
                                id: 'SideDrawerToggle'
                            }
                        ]
                    }
                },
                {
                    screen: 'ExampleApp.SharePlaceScreen',
                    label: "Share Place",
                    title: "Share Place",
                    icon: icons[1],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: icons[2],
                                title: "Menu",
                                id: 'SideDrawerToggle'                                
                            }
                        ]
                    }
                }
            ],
            tabsStyle: {
                tabBarSelectedButtonColor: "orange"
            },
            drawer: {
                left: {
                    screen: 'ExampleApp.SideDrawer'
                }
            },
            appStyle: {
                tabBarSelectedButtonColor: "orange"
            },
        });
    });
    
}

export default startTabs;