import { Route, Switch, NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Description from "../ProductPage/Description";
import AdditionalInformation from "../ProductPage/AdditionalInformation";
import Reviews from "../ProductPage/Reviews";


export default function ProductDetails() {


    return (
        <section className="w-screen">
            <div className="mx-auto max-w-[1050px] flex flex-col">
                <div className="flex justify-center">
                    <NavLink exact to="/productPage" className={isActive => "p-6 text-sm font-bold leading-6 " + (!isActive ? "text-gray" : "text-primary-blue")}>
                        <NavLink to="/productPage/description/" className={isActive => "p-6 text-sm font-bold leading-6 " + (!isActive ? "" : "text-primary-blue")}>
                            Description
                        </NavLink>
                    </NavLink>

                    <NavLink to="/productPage/additionalInformation" className={isActive => "p-6 text-sm font-bold leading-6 " + (!isActive ? "text-gray" : "text-primary-blue")}>
                        Additional Information
                    </NavLink>
                    <NavLink to="/productPage/reviews" className={isActive => "p-6 text-sm font-bold leading-6 " + (!isActive ? "text-gray" : "text-primary-blue")}>
                        Reviews
                    </NavLink>
                </div>
                <hr className="h-[2px] border-0 mb-5 bg-[#ECECEC]" />
                <div className="pt-6 pb-10">
                    <Switch>
                        <Route exact path="/productPage">
                            <Description />
                        </Route>
                        <Route path="/productPage/description">
                            <Description />
                        </Route>
                        <Route path="/productPage/additionalInformation">
                            <AdditionalInformation />
                        </Route>
                        <Route path="/productPage/reviews">
                            <Reviews />
                        </Route>
                    </Switch>
                </div>
            </div>
        </section>
    )
}