import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Image } from '@rneui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';

import QuantityCounter from './QuantityCounter';

export default function CartItem({ id, image, title, price, quantity, addToCart, removeFromCart }) {
    const [count, setCount] = useState(quantity);
    let total = quantity * price;

    function handleChange(operation) {
        let storedCount = count;
        if (operation === 'INCREASE') {
            storedCount++;
            setCount(prevCount => prevCount + 1)
        }
        else if (operation === 'DECREASE') {
            storedCount--;
            setCount(prevCount => prevCount - 1)
        }

        addToCart(id, id - 1, storedCount - quantity, title) 
    }

    return (
        <View style={styles.container}>
            <View style={styles.columns}>
                <Image
                    source={{ uri: image }}
                    containerStyle={styles.productImage}
                    resizeMode={'cover'}
                />
                <View>
                    <Text style={styles.productTitle}>{title}</Text>
                    <Text style={styles.productPrice}>${price.toFixed(2)}</Text>
                    <QuantityCounter amount={count} handleChange={handleChange} />
                    <Button
                        titleStyle={{ 
                            color: '#7209B7',
                            marginRight: 8,
                            fontSize: 14
                        }}
                        buttonStyle={{
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            paddingVertical: 0,
                            paddingHorizontal: 0,
                            margin: 0,
                            alignItems: 'center',
                            justifyContent: 'flex-start'
                        }}
                        containerStyle={{
                            // width: 200,
                            marginLeft: 25,
                            marginTop: 15,
                            marginBottom: 0,
                            padding: 0,
                        }}
                        onPress={() => removeFromCart(id, title)}
                    >
                        Remove
                        <Ionicons name={"trash-outline"} size={20} color="#7209B7" />
                    </Button>
                </View>
            </View>
            <Text style={styles.total}><Text style={styles.bold}>Total:</Text> ${total.toFixed(2)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        width: 550,
        marginVertical: 7,
        padding: 10,
        // backgroundColor: '#ffaa00'
    },
    productImage: {
        width: 150,
        height: 150,
    },
    columns: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10
    },
    productTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15,
        maxWidth: 285
    },
    productPrice: {
        fontSize: 18,
        marginLeft: 15,
        marginBottom: 15
    },
    total: {
        alignSelf: 'flex-end',
        fontSize: 20
    },
    bold: {
        fontWeight: 'bold'
    }
});