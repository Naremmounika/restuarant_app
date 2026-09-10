import {Component} from 'react'
import {MdOutlineShoppingCart} from 'react-icons/md'
import FoodItemCard from './component/FoodItemCard'
import './App.css'

class App extends Component {
  state = {
    menuList: [],
    activeTab: '',
    cartCount: 0,
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

      // Prevent the dish quantity from going below 0
      const updatedCount = Math.max(0, currentCount + change)

      const updatedDishCounts = {
        ...prevState.dishCounts,
        [dishId]: updatedCount,
      }

      const totalCartCount = Object.values(updatedDishCounts).reduce(
        (total, count) => total + count,
        0,
      )

      return {
        dishCounts: updatedDishCounts,
        cartCount: totalCartCount,
      }
    })
  }

  render() {
    const {menuList, activeTab, cartCount, dishCounts} = this.state

    if (menuList.length === 0) {
      return <p>Loading...</p>
    }

    const restaurant = menuList[0]

    return (
      <div>
        <div className="nav-bar-container">
          <div className="header-container">
            <img
              src={restaurant.restaurantImage}
              alt={restaurant.restaurantName}
              className="restuarant-image"
            />

            <h1 className="restuarant-name">{restaurant.restaurantName}</h1>

            <p className="orders-text">My Orders</p>
          </div>

          <div className="cart-container">
            <MdOutlineShoppingCart size={28} />

            <span className="cart-badge">{cartCount}</span>
          </div>
        </div>

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

export default App
