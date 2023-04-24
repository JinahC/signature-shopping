import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Image } from '@rneui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';

import QuantityCounter from './QuantityCounter';

export default function ProductScreen({route, products, toggleFavorite, addToCart}) {
    const { id, index } = route.params;
    const [count, setCount] = useState(1);

    // console.log(index)
    // console.log(products)

    function handleChange(operation) {
        if (operation === 'INCREASE')
            setCount(prevCount => prevCount + 1)
        else if (operation === 'DECREASE')
            setCount(prevCount => prevCount - 1)
    }

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <View style={styles.columns}>
                    <Image
                        source={{ uri: products[index].image }}
                        containerStyle={styles.productImage}
                        resizeMode={'cover'}
                    />
                    <View>
                        <Text style={styles.productTitle}>{products[index].title}</Text>
                        <Text style={styles.productPrice}>${products[index].price.toFixed(2)}</Text>
                        <QuantityCounter amount={count} handleChange={handleChange} />
                    </View>
                </View>
                <Text style={styles.productDesc}>{products[index].description}</Text>
            </View>
            <View style={[styles.columns, styles.bottom]}>
                <Button
                    buttonStyle={{
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 30,
                    }}
                    containerStyle={{
                        width: 49,
                    }}
                    onPress={() => toggleFavorite(id, products[index].title)}
                >
                    <Ionicons name={products[index].isFavorited ? "heart" : "heart-outline"} size={48} color="#F77F00" />
                </Button>
                <Button
                    title="Add to Cart"
                    titleStyle={{
                        fontWeight: 'bold'
                    }}
                    buttonStyle={{
                        backgroundColor: '#7209B7',
                        borderRadius: 3,
                    }}
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 20,
                        marginVertical: 10,
                    }}
                    onPress={() => addToCart(id, index, count, products[index].title)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    infoContainer: {
        maxWidth: 800
    },
    columns: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 30
    },
    productImage: {
        width: 250,
        height: 250,
    },
    productTitle: {
        fontSize: 50,
        fontWeight: 'bold',
        marginLeft: 15,
        maxWidth: 565
    },
    productPrice: {
        fontSize: 35,
        marginLeft: 15,
        marginBottom: 40
    },
    productDesc: {
        fontSize: 16,
    },
    bottom: {
        position: 'absolute',
        bottom: -32
    }
});