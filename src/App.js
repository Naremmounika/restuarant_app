import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './component/Home'
import Login from './component/Login'
import Cart from './component/Cart'
import CartContextProvider from './context/CartContext'
import './App.css'

const App = () => (
  <CartContextProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route exact path="/cart" component={Cart} />
      </Switch>
    </BrowserRouter>
  </CartContextProvider>
)

export default App
