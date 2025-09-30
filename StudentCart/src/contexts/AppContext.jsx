import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  // User authentication
  user: null,
  isLoggedIn: false,
  
  // Cart management
  cart: [],
  cartCount: 0,
  
  // Orders
  orders: [],
  
  // Addresses
  addresses: [
    {
      id: 1,
      name: 'John Doe',
      phone: '+91 98765 43210',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true
    }
  ],
  
  // UI state
  isDarkMode: false,
  activeModal: null,
  
  // Items data
  items: [],
  categories: [
    {
      id: 'electronics',
      name: 'Electronics',
      icon: '📱',
      description: 'Laptops, phones, gadgets',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'books',
      name: 'Books',
      icon: '📚',
      description: 'Textbooks, novels, study materials',
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 'furniture',
      name: 'Furniture',
      icon: '🪑',
      description: 'Desks, chairs, storage',
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'clothing',
      name: 'Clothing',
      icon: '👕',
      description: 'Clothes, shoes, accessories',
      color: 'from-pink-500 to-rose-600'
    }
  ]
};

// Action types
export const ActionTypes = {
  // User actions
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  UPDATE_USER: 'UPDATE_USER',
  
  // Cart actions
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_CART_ITEM: 'UPDATE_CART_ITEM',
  CLEAR_CART: 'CLEAR_CART',
  
  // Order actions
  ADD_ORDER: 'ADD_ORDER',
  UPDATE_ORDER: 'UPDATE_ORDER',
  CANCEL_ORDER: 'CANCEL_ORDER',
  
  // Address actions
  ADD_ADDRESS: 'ADD_ADDRESS',
  UPDATE_ADDRESS: 'UPDATE_ADDRESS',
  DELETE_ADDRESS: 'DELETE_ADDRESS',
  SET_DEFAULT_ADDRESS: 'SET_DEFAULT_ADDRESS',
  
  // UI actions
  TOGGLE_DARK_MODE: 'TOGGLE_DARK_MODE',
  SET_ACTIVE_MODAL: 'SET_ACTIVE_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  
  // Items actions
  SET_ITEMS: 'SET_ITEMS',
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  DELETE_ITEM: 'DELETE_ITEM'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true
      };
      
    case ActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        cart: [],
        cartCount: 0
      };
      
    case ActionTypes.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
      
    case ActionTypes.ADD_TO_CART:
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          cartCount: state.cartCount + 1
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
          cartCount: state.cartCount + 1
        };
      }
      
    case ActionTypes.REMOVE_FROM_CART:
      const itemToRemove = state.cart.find(item => item.id === action.payload);
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
        cartCount: state.cartCount - (itemToRemove?.quantity || 0)
      };
      
    case ActionTypes.UPDATE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        cartCount: state.cart.reduce((total, item) => total + item.quantity, 0)
      };
      
    case ActionTypes.CLEAR_CART:
      return {
        ...state,
        cart: [],
        cartCount: 0
      };
      
    case ActionTypes.ADD_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders],
        cart: [],
        cartCount: 0
      };
      
    case ActionTypes.UPDATE_ORDER:
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id
            ? { ...order, ...action.payload.updates }
            : order
        )
      };
      
    case ActionTypes.CANCEL_ORDER:
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload
            ? { ...order, status: 'cancelled' }
            : order
        )
      };
      
    case ActionTypes.ADD_ADDRESS:
      return {
        ...state,
        addresses: [...state.addresses, action.payload]
      };
      
    case ActionTypes.UPDATE_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.map(addr =>
          addr.id === action.payload.id
            ? { ...addr, ...action.payload.updates }
            : addr
        )
      };
      
    case ActionTypes.DELETE_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.filter(addr => addr.id !== action.payload)
      };
      
    case ActionTypes.SET_DEFAULT_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.map(addr => ({
          ...addr,
          isDefault: addr.id === action.payload
        }))
      };
      
    case ActionTypes.TOGGLE_DARK_MODE:
      return {
        ...state,
        isDarkMode: !state.isDarkMode
      };
      
    case ActionTypes.SET_ACTIVE_MODAL:
      return {
        ...state,
        activeModal: action.payload
      };
      
    case ActionTypes.CLOSE_MODAL:
      return {
        ...state,
        activeModal: null
      };
      
    case ActionTypes.SET_ITEMS:
      return {
        ...state,
        items: action.payload
      };
      
    case ActionTypes.ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload]
      };
      
    case ActionTypes.UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.updates }
            : item
        )
      };
      
    case ActionTypes.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
      
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      dispatch({ type: ActionTypes.TOGGLE_DARK_MODE });
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Save theme changes
  useEffect(() => {
    if (state.isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [state.isDarkMode]);

  // Load saved user data
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      dispatch({ type: ActionTypes.LOGIN, payload: JSON.parse(savedUser) });
    }
  }, []);

  // Save user data changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [state.user]);

  // Load saved cart data
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      dispatch({ type: ActionTypes.SET_ITEMS, payload: cartData });
    }
  }, []);

  // Save cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  const value = {
    state,
    dispatch,
    // Helper functions
    addToCart: (item) => dispatch({ type: ActionTypes.ADD_TO_CART, payload: item }),
    removeFromCart: (itemId) => dispatch({ type: ActionTypes.REMOVE_FROM_CART, payload: itemId }),
    updateCartItem: (itemId, quantity) => dispatch({ 
      type: ActionTypes.UPDATE_CART_ITEM, 
      payload: { id: itemId, quantity } 
    }),
    clearCart: () => dispatch({ type: ActionTypes.CLEAR_CART }),
    login: (user) => dispatch({ type: ActionTypes.LOGIN, payload: user }),
    logout: () => dispatch({ type: ActionTypes.LOGOUT }),
    toggleDarkMode: () => dispatch({ type: ActionTypes.TOGGLE_DARK_MODE }),
    openModal: (modalName) => dispatch({ type: ActionTypes.SET_ACTIVE_MODAL, payload: modalName }),
    closeModal: () => dispatch({ type: ActionTypes.CLOSE_MODAL }),
    addOrder: (order) => dispatch({ type: ActionTypes.ADD_ORDER, payload: order }),
    addAddress: (address) => dispatch({ type: ActionTypes.ADD_ADDRESS, payload: address }),
    updateAddress: (id, updates) => dispatch({ 
      type: ActionTypes.UPDATE_ADDRESS, 
      payload: { id, updates } 
    }),
    deleteAddress: (id) => dispatch({ type: ActionTypes.DELETE_ADDRESS, payload: id }),
    setDefaultAddress: (id) => dispatch({ type: ActionTypes.SET_DEFAULT_ADDRESS, payload: id })
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
