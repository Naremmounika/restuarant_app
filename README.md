# UNI Resto Cafe - Restaurant Menu Application

UNI Resto Cafe is a responsive restaurant menu application built using **React.js**. It fetches restaurant and menu data from an API and allows users to browse dishes by category and manage dish quantities using increment and decrement controls.

## Features

* Fetches restaurant menu details from a REST API
* Displays the restaurant name and menu categories dynamically
* Allows users to switch between menu categories
* Displays dish name, price, currency, description, calories, and image
* Displays vegetarian/non-vegetarian indicators
* Shows **Customizations available** when add-ons are available
* Shows **Not available** for unavailable dishes
* Allows users to increase or decrease dish quantities
* Prevents dish quantities from going below `0`
* Displays the total selected dish quantity as the cart count
* Cart count updates dynamically when quantities change
* Menu tabs are generated dynamically from API data
* Responsive restaurant menu interface

## Technologies Used

* React.js
* JavaScript
* HTML5
* CSS3
* REST API
* React Icons

## API

The application fetches restaurant menu data from:

```text
https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details
```

The API provides:

* Restaurant details
* Menu categories
* Dish information
* Dish availability
* Pricing information
* Dish images
* Add-on/customization information

## Application Flow

```text
User Opens Application
        ↓
Fetch Restaurant Menu API
        ↓
Store Restaurant & Menu Data
        ↓
Display Restaurant Name
        ↓
Display Menu Categories
        ↓
User Selects Category
        ↓
Display Dishes in Selected Category
        ↓
User Increases / Decreases Quantity
        ↓
Update Dish Quantity
        ↓
Calculate Total Cart Count
```

## Project Structure

```text
src/
│
├── component/
│   └── FoodItemCard/
│       ├── index.js
│       └── index.css
│
├── App.js
├── App.css
└── index.js
```

## Components

### App

The `App` component manages the main application state.

It handles:

* Fetching restaurant data
* Active menu category
* Dish quantities
* Cart count
* Category selection
* Dish quantity updates

### FoodItemCard

The `FoodItemCard` component displays the dishes belonging to the currently selected menu category.

It displays:

* Dish name
* Dish price
* Dish description
* Dish calories
* Dish image
* Availability status
* Customization information
* Increment and decrement controls

## Quantity Management

Each dish maintains its own quantity using the `dishCounts` state object.

Example:

```js
{
  123: 2,
  456: 1,
  789: 3
}
```

The application calculates the cart count by adding all dish quantities.

The quantity is also protected from becoming negative:

```js
const updatedCount = Math.max(0, currentCount + change)
```

Therefore, clicking the `-` button when the quantity is already `0` does not decrease the quantity.

## Dynamic Menu Categories

Menu categories are not hardcoded.

They are generated from the API response:

```js
restaurant.tableMenuList.map(eachCategory => (
  ...
))
```

This allows the application to automatically display the categories provided by the API.

## Dish Availability

Dish availability is determined using the API value:

```js
dish.dish_Availability === false
```

Unavailable dishes display:

```text
Not available
```

Available dishes display the quantity controls.

## Customizations

If a dish contains add-ons in the `addonCat` array, the application displays:

```text
Customizations available
```

This information is also dynamically determined from the API response.

## Installation

Clone the repository:

```bash
git clone <your-github-repository-url>
```

Navigate to the project directory:

```bash
cd <project-folder>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The application will run in the browser.


The implementation successfully handles:

* API data fetching
* Dynamic restaurant information
* Dynamic menu categories
* Dish information
* Dish availability
* Customizations
* Quantity increment
* Quantity decrement
* Preventing negative quantities
* Cart count calculation
* Multiple dish quantity management

## Key Learning

This project demonstrates practical usage of:

* React class components
* Component-based architecture
* State management
* API integration
* Dynamic rendering
* Conditional rendering
* Array methods such as `map`, `filter`, and `reduce`
* Event handling
* Handling nested API data
* Managing multiple item quantities
* Responsive UI development

## Author

**Mounika Narem**

* GitHub: https://github.com/Naremmounika
* LinkedIn: https://linkedin.com/in/mounika-narem/

```
```
