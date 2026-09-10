import {Component, createContext} from 'react'

export const CartContext = createContext({
  cartList: [],
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

class CartContextProvider extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = dish => {
    this.setState(prevState => {
      const existingDish = prevState.cartList.find(
        eachItem => eachItem.dish_id === dish.dish_id,
      )

      if (existingDish) {
        return {
          cartList: prevState.cartList.map(eachItem =>
            eachItem.dish_id === dish.dish_id
              ? {
                  ...eachItem,
                  quantity: eachItem.quantity + 1,
                }
              : eachItem,
          ),
        }
      }

      return {
        cartList: [...prevState.cartList, {...dish, quantity: 1}],
      }
    })
  }

  removeCartItem = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(
        eachItem => eachItem.dish_id !== dishId,
      ),
    }))
  }

  incrementCartItemQuantity = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem =>
        eachItem.dish_id === dishId
          ? {
              ...eachItem,
              quantity: eachItem.quantity + 1,
            }
          : eachItem,
      ),
    }))
  }

  decrementCartItemQuantity = dishId => {
    this.setState(prevState => {
      const updatedCartList = prevState.cartList
        .map(eachItem =>
          eachItem.dish_id === dishId
            ? {
                ...eachItem,
                quantity: eachItem.quantity - 1,
              }
            : eachItem,
        )
        .filter(eachItem => eachItem.quantity > 0)

      return {
        cartList: updatedCartList,
      }
    })
  }

  render() {
    const {cartList} = this.state

    const contextValue = {
      cartList,
      removeAllCartItems: this.removeAllCartItems,
      addCartItem: this.addCartItem,
      removeCartItem: this.removeCartItem,
      incrementCartItemQuantity: this.incrementCartItemQuantity,
      decrementCartItemQuantity: this.decrementCartItemQuantity,
    }

    return (
      <CartContext.Provider value={contextValue}>
        {this.props.children}
      </CartContext.Provider>
    )
  }
}

export default CartContextProvider
