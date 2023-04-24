import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Button, Divider } from '@rneui/themed';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import CartItem from './CartItem';

export default function CartScreen({ cart, addToCart, removeFromCart }) {
    const [calculations, setCalculations] = useState({
        subtotal: 0,
        tax: 0,
        total: 0
    })

    function calculate() {
        let curSubtotal = 0;
        for (let i = 0; i < cart.length; i++)
            curSubtotal += cart[i].quantity * cart[i].price;

        let curTax = curSubtotal * 0.065;
        let curTotal = curSubtotal + curTax;
        
        setCalculations({
            subtotal: curSubtotal,
            tax: curTax,
            total: curTotal
        })
    }

    useEffect(() => {
        if (cart.length > 0)
            calculate();
    }, [cart])

    let renderItem = ({ item }) => {
        return (
            <CartItem
                {...item}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
            />
        )
    }

    return (
        <>
            {cart.length < 1 ?
                <View style={styles.container}>
                    <MaterialCommunityIcons name={"cart-off"} size={50} color="#000000" />
                    <Text style={styles.emptyCart}>You have no products in your Cart</Text>
                </View> :
                <View style={styles.container}>
                    <FlatList data={cart} renderItem={renderItem}></FlatList>
                    <Divider
                        style={{ width: "80%", margin: 20 }}
                        color="#F77F00"
                        insetType="left"
                        width={1}
                        orientation="horizontal"
                    />
                    <View style={styles.calculations}>
                        <Text style={styles.calcCategory}>Subtotal</Text>
                        <Text style={styles.calcCategory}>${calculations.subtotal.toFixed(2)}</Text>
                    </View>
                    <View style={styles.calculations}>
                        <Text style={styles.calcCategory}>Tax</Text>
                        <Text style={styles.calcCategory}>${calculations.tax.toFixed(2)}</Text>
                    </View>
                    <View style={styles.calculations}>
                        <Text style={[styles.calcCategory, styles.bold]}>Total</Text>
                        <Text style={[styles.calcCategory, styles.bold]}>${calculations.total.toFixed(2)}</Text>
                    </View>
                    <Button
                        title="Checkout"
                        titleStyle={{
                            fontWeight: 'bold'
                        }}
                        buttonStyle={{
                            backgroundColor: '#7209B7',
                            borderRadius: 30,
                        }}
                        containerStyle={{
                            width: 300,
                            marginHorizontal: 0,
                            marginVertical: 10,
                        }}
                    />
                </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyCart: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10
    },
    calculations: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300,
    },
    calcCategory: {
        fontSize: 18,
        marginBottom: 10
    },
    bold: {
        fontWeight: 'bold'
    }
});