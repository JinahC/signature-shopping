import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Image } from '@rneui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ProductItem({ id, image, title, price, isFavorited, toggleFavorite }) {
    const navigation = useNavigation();
    return (
        <View style={styles.productContainer}>
            <TouchableHighlight onPress={() => navigation.navigate('Product Details', 
                { 
                    index: id - 1,
                    id: id
                })}
            >
                <View>
                    <Image
                        source={{ uri: image }}
                        containerStyle={styles.productImage}
                        resizeMode={'cover'}
                    />
                    <Text>{title}</Text>
                    <Text>${price.toFixed(2)}</Text>
                </View>
            </TouchableHighlight>
            <Button
                title=""
                buttonStyle={{
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 30,
                    // padding: 10
                }}
                containerStyle={{
                    width: 30,
                    position: 'absolute',
                    bottom: 5,
                    right: 5
                }}
                onPress={() => toggleFavorite(id, title)}
            >
                <Ionicons name={isFavorited ? "heart" : "heart-outline"} size={29} color="#F77F00" />
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    productContainer: {
        flex: 1,
        justifyContent: 'center',
        maxWidth: 150,
        marginHorizontal: 40,
        marginVertical: 30,
        paddingBottom: 25,
    },
    productImage: {
        width: 150,
        height: 150,
    }
});