import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, StyleSheet } from "react-native";

function ReporteItem(props) {
    const navigator = useNavigation();

    function goToEdit() {
        navigator.navigate('Edit', { id: props.id });
    }

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{props.name}</Text>
                <Text style={styles.date}>{props.date}</Text>
                {props.location && props.location.lat !== undefined && props.location.lng !== undefined ? (
                    <Text style={styles.location}>
                        Ubicación: {props.location.lat.toFixed(3)}, {props.location.lng.toFixed(3)}
                    </Text>
                ) : (
                    <Text style={styles.location}>Ubicación no disponible</Text>
                )}
            </View>
            <Pressable style={styles.editButton} onPress={goToEdit}>
                <Text style={styles.buttonText}>Editar</Text>
            </Pressable>
        </View>
    );
}

export default ReporteItem;

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
        marginHorizontal: 20,
        backgroundColor: '#2C3E50',
        padding: 20,
        borderRadius: 15,
        width: '90%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textContainer: {
        marginBottom: 12,
    },
    title: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    date: {
        color: '#BDC3C7',
        fontSize: 14,
        marginBottom: 4,
    },
    location: {
        color: '#A9CCE3',
        fontSize: 16,
        marginTop: 4,
    },
    editButton: {
        backgroundColor: '#E67E22',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});