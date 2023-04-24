import { ButtonGroup } from "@rneui/themed";
import { StyleSheet, View } from "react-native";

export default function CategoryFilter({ selectedIndex, handleSelection }) {
    return (
        <View>
            <ButtonGroup
                buttons={["Women's Clothing", "Men's Clothing", "Jewelry"]}
                selectedIndex={selectedIndex}
                onPress={(value) => handleSelection(value)}
                textStyle={{
                    color: '#000',
                    fontSize: 14
                }}
                buttonStyle={{
                    minWidth: 150, 
                    backgroundColor: '#fff',
                    borderRadius: 7, 
                    borderColor: 'black', 
                    borderWidth: 1,
                    paddingVertical: 7,
                    paddingHorizontal: 15
                }}
                selectedTextStyle={{ color: '#FFF', fontWeight: 'bold' }}
                selectedButtonStyle={{ backgroundColor: '#F77F00', borderWidth: 0, }}
                buttonContainerStyle={{ border: 'none', margin: 5 }}
                innerBorderStyle={{ border: 'none' }}
                containerStyle={{ marginVertical: 20, border: 'none' }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});