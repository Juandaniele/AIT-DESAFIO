import { TYPES } from "../actions/actions";

export const initialState = {
    products:[
    ],
    cart: [],
};

export function foodReducer(state, action) {
    switch(action.type){
        case TYPES.LOAD_PRODUCTS:{
        
            return{
                ...state,
                products: action.payload
            }
        }
        case TYPES.ADD_TO_CART:{
            
            let nuevo = state.products.find(product => product._id === action.payload)
            let itemInCart = state.cart.find(e=> e._id === nuevo._id)
            
            return itemInCart ? {
                ...state,
                cart: state.cart.map(e => e._id === nuevo._id ? {...e, quantity: e.quantity + 1} : e)
            } : {...state, cart: [...state.cart, {...nuevo, quantity: 1}]}
        }
        case TYPES.REMOVE_ONE_FROM_CART:{
            
            let itemToDelete = state.cart.find((e) => e._id === action.payload);

            return itemToDelete.quantity > 1
              ? {
                  ...state,
                  cart: state.cart.map((e) =>
                    e._id === action.payload
                      ? { ...e, quantity: e.quantity - 1 }
                      : e
                  ),
                }
              : {
                  ...state,
                  cart: state.cart.filter((e) => e._id !== action.payload),
                };
        }
        
        case TYPES.REMOVE_ALL_FROM_CART:{
            return {
                ...state,
                cart: state.cart.filter(e => e._id !== action.payload)}
            }
        case TYPES.CLEAR_CART:{
            return {
                ...state,
                cart: []
            }
        }
        case TYPES.SALE:{
            return {
                ...state,
                cart:[]
            }
        }
        default:
            return state
    }
}