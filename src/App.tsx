import { useState } from 'react'
import './App.css'
import { NavLink, Routes, Route } from 'react-router-dom'
import Start from './components/start/Start'
import Settings from './components/Settings'
import About from './components/About'
import NotFound from './components/NotFound'
import ShowCart from './components/ShowCart'
import Product from './components/Product'
import SingleProduct from './components/SingleProduct'
import DropDown from './components/dropdown/Dropdown'
import MyFooter from './components/footer/MyFooter'

const App = () => {
  return (
    <div className="app">
      <header>
        <DropDown />
      </header>
      <main>
        <Routes>
          <Route path='/about' element={<About />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/cart' element={<ShowCart />} />
          <Route path='/:product' element={<Product />} />
          <Route path='/products/:productid' element={<SingleProduct />} />
          <Route path='/' element={<Start />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/404' element={<NotFound />} />
        </Routes>
      </main>
      <footer>
        <MyFooter />
      </footer>
    </div>
  )
}

export default App
