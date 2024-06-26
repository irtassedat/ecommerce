import { Switch, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import ProductListPage from "../../pages/ProductListPage";
import ContactPage from "../../pages/ContactPage"
import TeamPage from "../../pages/TeamPage"
import AboutPage from "../../pages/AboutPage"
import ProductPage from "../../pages/ProductPage"
import SignUpForm from "../../pages/SignupPage";
import LoginForm from "../../pages/LoginFormPage";
import ShoppingCartPage from "../../pages/ShoppingCartPage";
import CreateOrderPage from "../../pages/CreateOrderPage";
import PreviousOrdersPage from "../../pages/PreviousOrderPage";
import ProtectedRoute from "../../components/previousorderspage/ProtectedRoute";

export default function ContentWrapper() {
  return (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/about">
        <AboutPage />
      </Route>
      <Route path="/team">
        <TeamPage />
       </Route>
      <Route path="/shop">
        <ProductListPage />
      </Route>
      <Route path="/contact">
        <ContactPage />
      </Route>
      <Route path="/:category/:productId/:productNameSlug">
        <ProductPage />
      </Route>
      <Route path="/signup">
        <SignUpForm />
      </Route>
      <Route path="/login">
        <LoginForm />
      </Route>
      <Route path="/shop/:category">
        <ProductListPage />
      </Route>
      <Route path="/shopping-cart">
        <ShoppingCartPage />
      </Route>
      <ProtectedRoute path="/create-order"> 
        <CreateOrderPage />
      </ProtectedRoute>
      <ProtectedRoute path="/previous-orders">
        <PreviousOrdersPage />
      </ProtectedRoute>
    </Switch>
  );
}