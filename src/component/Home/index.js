import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {CartContext} from '../../context/CartContext'
import FoodItemCard from '../FoodItemCard'
import Header from '../Header'
import './index.css'

class Home extends Component {
  static contextType = CartContext

  state = {
    menuList: [],
    activeTab: '',
    dishCounts: {},
  }

  componentDidMount() {
    this.getMenuList()
  }

  getMenuList = async () => {
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = data.map(eachDish => ({
        branchName: eachDish.branch_name,
        restaurantId: eachDish.restaurant_id,
        restaurantImage: eachDish.restaurant_image,
        restaurantName: eachDish.restaurant_name,
        tableId: eachDish.table_id,
        tableName: eachDish.table_name,
        tableMenuList: eachDish.table_menu_list,
      }))

      this.setState({
        menuList: updatedData,
        activeTab: updatedData[0].tableMenuList[0].menu_category,
      })
    }
  }

  onClickCategory = menuCategory => {
    this.setState({
      activeTab: menuCategory,
    })
  }

  updateDishCount = (dishId, change) => {
    this.setState(prevState => {
      const currentCount = prevState.dishCounts[dishId] || 0

      const updatedCount = Math.max(0, currentCount + change)

      return {
        dishCounts: {
          ...prevState.dishCounts,
          [dishId]: updatedCount,
        },
      }
    })
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    const {menuList, activeTab, dishCounts} = this.state
    const {cartList} = this.context

    const cartCount = cartList.reduce(
      (total, eachItem) => total + eachItem.quantity,
      0,
    )

    if (menuList.length === 0) {
      return <p>Loading...</p>
    }

    const restaurant = menuList[0]

    return (
      <div>
        <Header count={cartCount} restaurantDetails={restaurant} />

        <ul className="tabs-list-container">
          {restaurant.tableMenuList.map(eachCategory => (
            <li key={eachCategory.menu_category_id} className="tab-btn-item">
              <button
                type="button"
                className={
                  activeTab === eachCategory.menu_category
                    ? 'active-tab'
                    : 'menu-tab'
                }
                onClick={() => this.onClickCategory(eachCategory.menu_category)}
              >
                {eachCategory.menu_category}
              </button>
            </li>
          ))}
        </ul>

        <FoodItemCard
          restaurant={restaurant}
          activeTab={activeTab}
          dishCounts={dishCounts}
          onUpdateDishCount={this.updateDishCount}
        />
      </div>
    )
  }
}

export default Home
