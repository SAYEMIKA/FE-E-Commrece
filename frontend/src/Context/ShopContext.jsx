import React, { createContext, useState } from "react";
import all_product from '../Components/Assets/all_product'


export const ShopContext = createContext(null);
    const getDefaultCart = ()=>{
        // initialize cart object using product ids so keys match product.id values
        const cart = {};
        for (const product of all_product) {
            cart[product.id] = 0;
        }
        return cart;
    }

    const ShopContextProvider = (props) => {

    const [cartItems,setCartItems] = useState(getDefaultCart());

    const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        console.log(cartItems);
    }

     const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const quantity = cartItems[itemId];
            if (quantity > 0) {
                const itemInfo = all_product.find((product) => product.id === Number(itemId));
                if (!itemInfo) continue; // defensive: skip if product not found
                // products use `new_price` in data; fallback to `price` or 0 if absent
                const unitPrice = itemInfo.new_price ?? itemInfo.price ?? 0;
                totalAmount += unitPrice * quantity;
            }
        }
        return totalAmount;
    }

const getTotalCartItems = () => {
    let totalItems = 0;
    for (const itemId in cartItems) 
    {
        if(cartItems[itemId]>0)
        {
            totalItems += cartItems[itemId];
        }
    }
    return totalItems;
}

     const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;