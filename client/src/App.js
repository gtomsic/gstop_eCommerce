import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Container from "./components/Container"
import Footer from "./components/Footer"
import Header from "./components/Header"
import AdminPages from "./pages/AdminPages"
import CartPage from "./pages/CartPage"
import Home from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import PaymentMethod from "./pages/PaymentMethod"
import PlaceOrder from "./pages/PlaceOrder"
import ProductPage from "./pages/ProductPage"
import ProfilePage from "./pages/ProfilePage"
import RegisterPage from "./pages/RegisterPage"
import ShippingPage from "./pages/ShippingPage"
import ReviewPage from "./pages/ReviewPage"

const App = () => {
  return (
    <Router>
      <Header />
      <main className="min-h-[90vh] py-[80px] mx-3 max-w-[1200px] md:mx-3 lg:mx-auto">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/admin" exact element={<AdminPages />} />
          <Route path="/login" exact element={<LoginPage />} />
          <Route path="/register" exact element={<RegisterPage />} />
          <Route path="/profile" exact element={<ProfilePage />} />
          <Route path="/shipping" exact element={<ShippingPage />} />
          <Route path="/payment" exact element={<PaymentMethod />} />
          <Route path="/placeorder" exact element={<PlaceOrder />} />
          <Route path="/product/:id" exact element={<ProductPage />} />
          <Route path="/review/:id" exact element={<ReviewPage />} />
          <Route exact path="/cart">
            <Route path="/cart/" element={<CartPage />} />
            <Route path="/cart/:id" element={<CartPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
