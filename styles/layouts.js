import { StyleSheet} from "react-native";

const styles= StyleSheet.create({
    container: {
        flex: 1,
      },
      background: {
        flex: 1,
      },
      content: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
      },
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 40,
      },
      menu: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        paddingVertical: 30,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
      },
      menuText: {
        fontSize: 18,
        marginLeft: 15,
        color: '#00987B',
      },
      logoutButton: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 30,
      },
      logoutText: {
        fontSize: 18,
        color: '#00987B',
        fontWeight: 'bold',
      },
      logo: {
        width: 150, // Adjust width as necessary
        height: 150, // Adjust height as necessary
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 20,
      },
})

export default styles;