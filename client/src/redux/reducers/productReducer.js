import { ActionTypes } from "../constants/action-types"


export const initialState = {
    basket : [ ],
    // toastMsg:"",
    // isLogin: 
} 


export const productReducer = (state = initialState,{type,payload}) => {

    switch (type) {
    case ActionTypes.ADD_TO_BASKET :
        let newBaskets = [...state.basket]
        let ind 
        ind = newBaskets.findIndex((ele)=>{
            return ele.id === payload.id
        })
        if(ind >= 0){
            newBaskets[ind].quantity += 1
            return {
                ...state,quantity: newBaskets[ind].quantity + 1
                // ,toastMsg:"Quantity Increased by 1"
            }
        }
        else{
            newBaskets.push({...state, ...payload,quantity:1})
            return {
                ...state,basket:newBaskets
                // ,toastMsg:"Product Added Successfully"
            }
        }
       
   
    case ActionTypes.REMOVE_FROM_BASKET:   
  
    let newBasket = [...state.basket]
    const index = state.basket.findIndex((basketItem) => basketItem.id  === payload)
   
    if(index >= 0){
        if(newBasket[index].quantity === 1){
            newBasket.splice(index,1)
            return {...state, basket:newBasket,toastMsg:"Product Removed Successfully"} 
        }else{
           newBasket[index].quantity = newBasket[index].quantity-1 
           return {...state, basket:newBasket, toastMsg:"Quantity Decreased by 1"} 
        }  
        
    }else{
        console.warn(`Can't remove Product (id:${payload})`)
    }
    break

    // case 'RESET_TOAST':
    //     return {...state,toastMsg:""}
        
    case ActionTypes.RESET_PRODUCTS:
        let emptyBasket =[]
        return {...state, basket: emptyBasket }

    // case 'LOGIN_DATA':
    //     localStorage.setItem("UserData" ,JSON.stringify({...payload}))
    //   return {...state,isLogin: {...payload}}
    
    // case 'SIGN_OUT':
    //     let clearLoginData ={}
    //     localStorage.removeItem("UserData")
    //     return {...state, isLogin: clearLoginData }

    default:
        return state
}}

// export default reducer