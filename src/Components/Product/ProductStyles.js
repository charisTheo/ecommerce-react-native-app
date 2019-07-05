import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  card: {
    position: 'relative',
    width: 350,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 10},
    shadowOpacity: 1.0,
    shadowRadius: 2,
    elevation: 4,
    marginVertical: 20,
  },
  actionButtonsContainer: {
    borderTopColor: '#eee',
    borderTopWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    paddingTop: 20
  },
  spinnerContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    opacity: 0.6,
    zIndex: 10
  }
})