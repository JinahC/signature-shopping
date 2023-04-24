import { Text, View, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function QuantityCounter({amount, handleChange}) {
    return (
        <View style={styles.container}>
            <Button
                title=""
                buttonStyle={{
                    backgroundColor: '#000000',
                    borderWidth: 0,
                    borderRadius: 30,
                    paddingVertical: 0,
                    paddingHorizontal: 10
                }}
                containerStyle={{
                    width: 30,
                }}
                disabled={amount === 1 ? true : false}
                onPress={() => handleChange('DECREASE')}
            >
                <MaterialCommunityIcons name={"minus"} size={29} color="#FFFFFF" />
            </Button>
            <Text style={styles.count}>{amount}</Text>
            <Button
                title=""
                buttonStyle={{
                    backgroundColor: '#000000',
                    borderWidth: 0,
                    borderRadius: 30,
                    paddingVertical: 0,
                    paddingHorizontal: 10
                }}
                containerStyle={{
                    width: 30,
                }}
                onPress={() => handleChange('INCREASE')}
            >
                <MaterialCommunityIcons name={"plus"} size={29} color="#FFFFFF" />
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15
        // justifyContent: 'center',
    },
    count: {
        fontSize: 25,
        marginHorizontal: 12
    }
});