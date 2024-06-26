import { combineReducers } from 'redux';

//This is intended to hold an array of objects. Each object will be a wine sku, how many bottles are ordered, and the unit price at time of order.
//Format object as {sku: xxxxx, quantity: xxxxx, price: xxxxx}
const cartWines = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'UPDATE_CART_QUANTITY':
      const { sku, quantity } = action.payload;
      return state.map((item) =>
        item.wine_sku === sku ? { ...item, number_bottles: quantity } : item
      );
    case 'REMOVE_ITEM_FROM_CART':
      const skuToRemove = action.payload;
      return state.filter((item) => item.wine_sku !== skuToRemove);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

//This is intended to hold order#, client id, date, total, and discount at time of checkout
//Format as {order_id: xxxxx, client_id: xxxxx, date: xxxxx, cost: xxxxx, discount: xxxxx}
const cartInfo = (state = {}, action) => {
  switch (action.type) {
    case 'ORDER_INFO':
      return action.payload;
    default:
      return state;
  }
};

//This is to be an array of all client orders, for use by admin
const orders = (state = [], action) => {
  switch (action.type) {
    case 'SET_ORDERS':
      return action.payload;
    default:
      return state;
  }
};

//This is to be an array of orders, for the retailer or wholesaler cuttently logged in (if any)
const clientOrders = (state = [], action) => {
  switch (action.type) {
    case 'SET_CLIENT_ORDERS':
      return action.payload;
    default:
      return state;
  }
};

const orderCount = (state = 0, action) => {
  switch (action.type) {
    case 'SET_ORDER_COUNT':
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  cartWines, //This is the storage for our wines
  cartInfo, //This is the storage for the order number, date, etc.
  orders, //This is intended to hold order data for an admin
  clientOrders, //This will hold all of the orders for a logged in client
  orderCount //This will hold the current order count
});
