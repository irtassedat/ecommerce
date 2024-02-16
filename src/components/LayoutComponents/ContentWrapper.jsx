import { Switch, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import ProductListPage from "../../pages/ProductListPage";

export default function ContentWrapper() {
  return (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/shop">
        <ProductListPage />
      </Route>
    </Switch>
  );
}
