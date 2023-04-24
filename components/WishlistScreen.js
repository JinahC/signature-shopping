import { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import CategoryFilter from './CategoryFilter';
import ProductItem from './ProductItem';

export default function WishlistScreen({ navigation, products, toggleFavorite }) {
    const filters = ["women's clothing", "men's clothing", "jewelery"];
    const [filterState, setFilterState] = useState({
        filterIndex: '',
        filteredProducts: []
    })

    function handleSelection(value) {
        if (value === filterState.filterIndex)
            setFilterState(prevState => {
                return ({
                    ...prevState,
                    filterIndex: ''
                })
            });
        else {
            setFilterState({
                filterIndex: value,
                filteredProducts: products.filter((product => filters[value] === product.category))
            })
            console.log(filterState.filteredProducts);
        }
    }

    let renderItem = ({ item, index }) => {
        return (
            <ProductItem
                {...item}
                index={index}
                toggleFavorite={toggleFavorite}
            />
        )
    }

    return (
        <>
            {products.length < 1 ? 
                <View style={styles.container}>
                    <MaterialCommunityIcons name={"heart-broken"} size={50} color="#000000" />
                    <Text style={styles.text}>You have no products in your Wishlist</Text>
                </View> :
                <View style={styles.container}>
                    <CategoryFilter selectedIndex={filterState.filterIndex} handleSelection={handleSelection} />
                    <FlatList data={filterState.filterIndex === '' ? products : filterState.filteredProducts} renderItem={renderItem} numColumns={4} key={4}></FlatList>
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
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10
    }
});