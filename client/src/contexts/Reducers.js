export const initialState = {
    basket :[],
    toastMsg:"",
    isLogin: { }
} 

export const getBasketTotal =  (basket) =>
basket?.reduce((amount,item) => item.price * item.quantity + amount,0)

const reducer = (state,action) => {

    switch (action.type) {
    case 'ADD_TO_BASKET':
        let newBaskets = [...state.basket]
        let ind 
        ind = newBaskets.findIndex((ele)=>{
            return ele.id === action.payload.id
        })
        if(ind >= 0){
            newBaskets[ind].quantity += 1
            return {
                ...state,quantity: newBaskets[ind].quantity + 1,toastMsg:"Quantity Increased by 1"
            }
        }
        else{
            newBaskets.push({...state, ...action.payload,quantity:1})
            return {
                ...state,basket:newBaskets,toastMsg:"Product Added Successfully"
            }
        }
   
    case 'REMOVE_FROM_BASKET':   
  
    let newBasket = [...state.basket]
    const index = state.basket.findIndex((basketItem) => basketItem.id  === action.id)
   
    if(index >= 0){
        if(newBasket[index].quantity === 1){
            newBasket.splice(index,1)
            return {...state, basket:newBasket,toastMsg:"Product Removed Successfully"} 
        }else{
           newBasket[index].quantity = newBasket[index].quantity-1 
           return {...state, basket:newBasket, toastMsg:"Quantity Decreased by 1"} 
        }  
        
    }else{
        console.warn(`Can't remove Product (id:${action.id})`)
    }
    break

    case 'RESET_TOAST':
        return {...state,toastMsg:""}
        
    case 'RESET_PRODUCTS':
        let emptyBasket =[]
        return {...state, basket: emptyBasket }

    case 'LOGIN_DATA':
        localStorage.setItem("UserData" ,JSON.stringify({...action.payload}))
      return {...state,isLogin: {...action.payload}}
    
    case 'SIGN_OUT':
        let clearLoginData ={}
        localStorage.removeItem("UserData" ,JSON.stringify({...action.payload}))
        return {...state, isLogin: clearLoginData }

    default:
        return state
}}

export default reducer