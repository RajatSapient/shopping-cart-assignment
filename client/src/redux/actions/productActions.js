import { ActionTypes } from "../constants/action-types"

export const addToBasket = (product) => {
    return{
        type: ActionTypes.ADD_TO_BASKET,
        payload:product 
    }
} 

export const removeFromBasket = (product) => {
    return {
        type:ActionTypes.REMOVE_FROM_BASKET,
        payload:product
    }
}

export const resetBasket = () => {
    return {
        type:ActionTypes.RESET_PRODUCTS
    }
}