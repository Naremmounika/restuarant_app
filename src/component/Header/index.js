import {MdOutlineShoppingCart} from 'react-icons/md'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {count, restaurantDetails, history} = props

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="nav-bar-container">
      <div className="header-container">
        <img
          src={restaurantDetails.restaurantImage}
          alt=""
          role="presentation"
          className="restuarant-image"
        />

        <Link to="/">
          <h1 className="restuarant-name">
            {restaurantDetails.restaurantName}
          </h1>
        </Link>
      </div>

      <p className="orders-text">My Orders</p>

      <Link to="/cart">
        <div className="cart-page-container" data-testid="cart">
          <MdOutlineShoppingCart
            size={28}
            aria-hidden="true"
            role="presentation"
          />
          <span className="cart-badge">{count}</span>
        </div>
      </Link>

      <button type="button" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
