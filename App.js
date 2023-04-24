import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useFonts, SedgwickAveDisplay_400Regular } from '@expo-google-fonts/sedgwick-ave-display';
import Ionicons from '@expo/vector-icons/Ionicons';

import LoadingScreen from './components/LoadingScreen';
import HomeScreen from './components/HomeScreen';
import WishlistScreen from './components/WishlistScreen';
import ProductScreen from './components/ProductScreen';
import CartScreen from './components/CartScreen';


const HomeStack = createNativeStackNavigator();

function HomeStackScreen({ products, toggleFavorite, cart, addToCart }) {
  let [fontsLoaded] = useFonts({
    SedgwickAveDisplay_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="Signature" 
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#F77F00',
            fontFamily: 'SedgwickAveDisplay_400Regular',
            fontSize: 50,
            textTransform: 'lowercase'
          }
        }}
      >
        {(props) => <HomeScreen {...props} products={products} toggleFavorite={toggleFavorite} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="Product Details">
        {(props) => <ProductScreen {...props} products={products} toggleFavorite={toggleFavorite} cart={cart} addToCart={addToCart} />}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  );
}

const WishlistStack = createNativeStackNavigator();

function WishlistStackScreen({ products, toggleFavorite, cart, addToCart }) {
  let favoriteProducts = products.filter(product => product.isFavorited === true)
  return (
    <WishlistStack.Navigator>
      <WishlistStack.Screen name="Wishlist" options={{ headerTitleAlign: 'center' }}>
        {(props) => <WishlistScreen {...props} products={favoriteProducts} toggleFavorite={toggleFavorite} />}
      </WishlistStack.Screen>
      <WishlistStack.Screen name="Product Details">
        {(props) => <ProductScreen {...props} products={products} toggleFavorite={toggleFavorite} cart={cart} addToCart={addToCart} />}
      </WishlistStack.Screen>
    </WishlistStack.Navigator>
  );
}

const CartStack = createNativeStackNavigator();

function CartStackScreen({ cart, addToCart, removeFromCart }) {
  return (
    <CartStack.Navigator>
      <CartStack.Screen name="Cart" options={{ headerTitleAlign: 'center' }}>
        {(props) => <CartScreen {...props} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />}
      </CartStack.Screen>
    </CartStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function App() {
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState([]);
  const [cartData, setCartData] = useState([]);

  function modifyData(data) {
    // console.log(data);

    let preferedItems = data.filter((item) => item.category !== 'electronics');
    let modifiedData = (preferedItems.map((item, index) => {
      return ({
        ...item,
        id: index + 1,
        isFavorited: false
      })
    }))

    console.log(modifiedData);
    setProductData(modifiedData);
    setLoading(false);
  }

  function toggleFavorite(id, title) {
    console.log(title + " was pressed")
    setProductData(prevData => prevData.map((product) => {
      if (product.id === id)
        return {
          ...product,
          isFavorited: !product.isFavorited
        }
      else 
        return product;
    }))
  }

  function cartHasItem(id) {
    for (let i = 0; i < cartData.length; i++)
      if (cartData[i].id === id)
        return true;

    return false;
  }

  function addToCart(id, index, amount, title) {
    if (cartHasItem(id)) {
      setCartData(prevCart => prevCart.map(item => {
        if (item.id === id)
          return ({
            ...productData[id - 1],
            quantity: item.quantity + amount,
          })
        else
          return item;
      }))
      // console.log('cart has item')
    }
    else
      setCartData(prevCart => ([
        ...prevCart,
        {
          ...productData[id - 1],
          quantity: amount,
        }
      ]))
    // console.log(title + " added to cart")
    // console.log(cartData)
  }

  function removeFromCart(id, title) {
    setCartData(prevCart => prevCart.filter(item => item.id !== id))
    console.log(title + " was removed")
  }

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setTimeout(() => modifyData(data), 1500))
  }, [])

  return (
    <NavigationContainer>
      { loading ? <LoadingScreen /> : 
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
              } 
              else if (route.name === 'WishlistScreen') {
                iconName = focused ? 'heart' : 'heart-outline';
              }
              else if (route.name === 'CartScreen') {
                iconName = focused ? 'cart' : 'cart-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#F77F00',
            tabBarInactiveTintColor: '#000000',
          })}
        >
        <Tab.Screen 
          options={{headerShown: false}} 
          name="Home" 
          children={(props) => <HomeStackScreen {...props} products={productData} toggleFavorite={toggleFavorite} cart={cartData} addToCart={addToCart} />} 
        />
        <Tab.Screen 
          options={{headerShown: false}} 
          name="WishlistScreen" 
          children={(props) => <WishlistStackScreen {...props} products={productData} toggleFavorite={toggleFavorite} cart={cartData} addToCart={addToCart} />} 
        />
        <Tab.Screen 
          options={{headerShown: false}} 
          name="CartScreen" 
          children={(props) => <CartStackScreen {...props} cart={cartData} addToCart={addToCart} removeFromCart={removeFromCart} />} />
      </Tab.Navigator>}
    </NavigationContainer>
  );
}

export default App;