import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import {CartContext} from '../../context/CartContext'
import './index.css'

class Cart extends Component {
  state = {
    restaurantDetails: {
      restaurantImage: '',
      restaurantName: 'UNI Resto Cafe',
    },
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const restaurant = data[0]

      this.setState({
        restaurantDetails: {
          restaurantImage: restaurant.restaurant_image,
          restaurantName: restaurant.restaurant_name,
        },
      })
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    const {restaurantDetails} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, removeAllCartItems} = value

          const cartCount = cartList.reduce(
            (total, eachItem) => total + eachItem.quantity,
            0,
          )

          return (
            <div>
              <Header count={cartCount} restaurantDetails={restaurantDetails} />

              {cartList.length === 0 ? (
                <div className="empty-cart-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                    alt="empty cart"
                  />
                  <h1>Your Cart Is Empty</h1>
                </div>
              ) : (
                <div className="cart-container">
                  <div className="cart-header">
                    <h1>Cart</h1>
                  </div>

                  <ul className="cart-list">
                    {cartList.map(eachItem => (
                      <CartItem key={eachItem.dish_id} dish={eachItem} />
                    ))}
                  </ul>
                  <div className="remove-btn-container">
                    <button
                      type="button"
                      onClick={removeAllCartItems}
                      className="cart-header-remove-button"
                    >
                      Remove All
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

class CartItem extends Component {
  render() {
    const {dish} = this.props

    return (
      <CartContext.Consumer>
        {value => {
          const {
            incrementCartItemQuantity,
            decrementCartItemQuantity,
            removeCartItem,
          } = value

          const totalPrice = dish.dish_price * dish.quantity

          return (
            <li className="cart-item">
              <img
                src={dish.dish_image}
                alt={dish.dish_name}
                className="cart-item-image"
              />

              <div className="cart-item-details">
                <h2>{dish.dish_name}</h2>

                <p>
                  {dish.dish_currency} {totalPrice}
                </p>

                <div className="quantity-container">
                  <button
                    type="button"
                    onClick={() => decrementCartItemQuantity(dish.dish_id)}
                  >
                    -
                  </button>

                  <p>{dish.quantity}</p>

                  <button
                    type="button"
                    onClick={() => incrementCartItemQuantity(dish.dish_id)}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeCartItem(dish.dish_id)}
                >
                  Remove
                </button>
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Cart
