import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    status: {
        fontSize: 20,
        color: '#FFD700', // Gold color for status to make it pop
        marginBottom: 20,
    },
    rideDetailCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.3,
        elevation: 5,
        width: '90%',
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    rideDetailText: {
        fontSize: 18,
        marginBottom: 10,
        color: '#666',
    },
    pendingButton: {
        backgroundColor: '#00897B', // A teal shade
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
        color: '#666',
    },
    pendingButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },

})

export default styles;