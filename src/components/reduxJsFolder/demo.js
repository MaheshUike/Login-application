const redux = require('redux');
const createStore = redux.createStore;

const BUY_CAKE = "buy_cake";

const order_cake = () => {
  return {
    type: BUY_CAKE,
    quantity: 1,
  };
};

// here we have created the action
//now its time to create the reducer

const initialState = {
  numberOfCake: 10,

};

//(previousState,action )=>newState

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numberOfCake: state.numberOfCake - 1,
      };
    default:
      return state;
  }
};


const store = createStore(reducer);
console.log("Initial State", store.getState());
const unsubscribe = store.subscribe(()=> console.log('updated state' , store.getState()));

store.dispatch(order_cake());
store.dispatch(order_cake());
store.dispatch(order_cake());
unsubscribe()