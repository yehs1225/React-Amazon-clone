export const initialState={
    basket:[],
    user:null
};
export const getBasketTotal = (basket)=>
    basket?.reduce((amount,item)=>item.price + amount,0);
const reducer =(state,action)=>{
    switch(action.type){
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket:[...state.basket,action.item],
            };
        case 'REMOVE_FROM_BASKET':
            //find index of the item we want to remove
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id===action.id
            );
            //copy the array of items
            let newBasket = [...state.basket];
            //condition : whether the array is empty or not
            if(index>=0){
                //remove the item
                newBasket.splice(index,1);
            }else{
                console.warn(
                    `Cant remove product (id:${action.id}) as its not in the basket!`
                )
            }
            return{
                ...state,
                basket:newBasket
            }
        case 'SET_USER':
            return{
                ...state,
                user:action.user
            }
        default:
            return state;
    }
}
export default reducer;