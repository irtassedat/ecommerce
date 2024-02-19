import { Switch, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import ProductListPage from "../../pages/ProductListPage";
import ContactPage from "../../pages/ContactPage"
import TeamPage from "../../pages/TeamPage"
import AboutPage from "../../pages/AboutPage"
import ProductPage from "../../pages/ProductPage"
import SignUpForm from "../../pages/SignupPage";

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
      <Route path="/ProductPage">
        <ProductPage />
      </Route>
      <Route path="/signup">
        <SignUpForm />
      </Route>
    </Switch>
  );
}
