export const initialState = {
    basket :[],
    toastMsg:""
} 
export const getBasketTotal = (basket) =>
basket?.reduce((amount,item) => item.price * item.quantity + amount,0)

const reducer = (state,action) => {
console.log(state,"State si")
    switch (action.type) {
    case 'ADD_TO_BASKET':
        let newBaskets = [...state.basket]
        let ind = -1
        ind = newBaskets.findIndex((ele)=>{
            return ele.id == action.payload.id
        })

        if(ind >= 0){
            newBaskets[ind].quantity = newBaskets[ind].quantity+1
            return {
                ...state,basket:newBaskets,toastMsg:"Quantity Increased by 1"
            }
        }
        else{
            newBaskets.push({...action.payload,quantity:1})
            return {
                ...state,basket:newBaskets,toastMsg:"Product Added Successfully"
            }
        }
  
   
    case 'REMOVE_FROM_BASKET':   
  
    let newBasket = [...state.basket]
    const index = state.basket.findIndex((basketItem) => basketItem.id  === action.id)
    console.log(index,"Index is")
   
    if(index >= 0){
        if(newBasket[index].quantity === 1){
            newBasket.splice(index,1)
            return {...state, basket:newBasket,toastMsg:"Product Removed Successfully"} 
        }else{
           newBasket[index].quantity = newBasket[index].quantity-1 
           return {...state, basket:newBasket,toastMsg:"Quantity Decreased by 1"} 
        }  
        
    }else{
        console.warn(`Can't remove Product (id:${action.id})`)
    }

    case 'RESET_TOAST':
        return {...state,toastMsg:""}

    case 'RESET_PRODUCTS':
        let emptyBasket =[]
    return {...state, basket: emptyBasket }
       
    default:
        return state
}}

export default reducer