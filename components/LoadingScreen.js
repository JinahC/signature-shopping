import { StyleSheet, Text, View } from 'react-native';
import { useFonts, SedgwickAveDisplay_400Regular } from '@expo-google-fonts/sedgwick-ave-display';

export default function LoadingScreen() {
    let [fontsLoaded] = useFonts({
        SedgwickAveDisplay_400Regular,
    });
    
    if (!fontsLoaded) {
        return null;
    } 
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Signature</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F77F00',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 100,
        fontFamily: 'SedgwickAveDisplay_400Regular', 
        textTransform: 'lowercase',
        letterSpacing: 3
    }
});