import './index.css'

const FoodItemCard = props => {
  const {restaurant, activeTab, dishCounts, onUpdateDishCount} = props

  const filteredCategory = restaurant.tableMenuList.filter(
    eachCategory => eachCategory.menu_category === activeTab,
  )

  return (
    <div className="restaurant-dish-categories">
      {filteredCategory.map(category => (
        <div key={category.menu_category_id}>
          <h2>{category.menu_category}</h2>

          <ul>
            {category.category_dishes.map(dish => (
              <li key={dish.dish_id} className="dish-category-list">
                <div className="dish-details-container">
                  <div className="dish-header">
                    <div
                      className={
                        dish.dish_Type === 1 ? 'dot-box-red' : 'dot-box-green'
                      }
                    >
                      <span
                        className={
                          dish.dish_Type === 1 ? 'nonveg-dot' : 'veg-dot'
                        }
                      >
                        .
                      </span>
                    </div>

                    <div>
                      <h2>{dish.dish_name}</h2>

                      <p>
                        {dish.dish_currency} {dish.dish_price}
                      </p>

                      <p>{dish.dish_description}</p>

                      {dish.dish_Availability === false ? (
                        <p className="not-available-text">Not available</p>
                      ) : (
                        <div>
                          <div className="addons-btn-container">
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateDishCount(dish.dish_id, -1)
                              }
                            >
                              -
                            </button>

                            <p>{dishCounts[dish.dish_id] ?? 0}</p>

                            <button
                              type="button"
                              onClick={() => onUpdateDishCount(dish.dish_id, 1)}
                            >
                              +
                            </button>
                          </div>

                          {dish.addonCat && dish.addonCat.length > 0 && (
                            <p className="customization-text">
                              Customizations available
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <p className="dish-calories">{dish.dish_calories} calories</p>

                <img src={dish.dish_image} alt={dish.dish_name} width="80" />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default FoodItemCard
