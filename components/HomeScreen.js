import { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import CategoryFilter from './CategoryFilter';
import ProductItem from './ProductItem';

export default function HomeScreen({ navigation, products, toggleFavorite}) {
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
        <View style={styles.container}>
            <CategoryFilter selectedIndex={filterState.filterIndex} handleSelection={handleSelection} />
            <FlatList data={filterState.filterIndex === '' ? products : filterState.filteredProducts} renderItem={renderItem} numColumns={4} key={4}></FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});