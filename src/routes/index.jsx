
import { Navigate } from "react-router-dom"
// import { Dashboard } from '../components/dashboard'
import { CategoryList } from '../pages/category/index'
import { DashboardLayout } from "../layouts/dashboard.layout"
import { Dashboard } from "../pages/Dashboard"
import CreateCategory from "../pages/category/CreateCategory"
import EditCategory from "../pages/category/EditCategory"
import {FoodList} from "../pages/food"
import CreateFood from "../pages/food/CreateFood"
import EditFood from "../pages/food/EditFood"
import { ChefList } from "../pages/Chef"
import CreateChef from "../pages/Chef/CreateChef"
import EditChef from "../pages/Chef/EditChef"
import CreatePopular from "../pages/popular/CreatePopular"
import EditPopular from "../pages/popular/EditPopular"
import PopularList from "../pages/popular"


const appRoutes = [
    {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
            { path: "*", element: <Navigate to="/404" /> },
            // dashboard
            {path:"",element:<Dashboard/>},
                     
            /** category */
            { path:"category", element: <CategoryList /> },
            { path: "create-category", element: <CreateCategory /> },
            { path: "edit-category/:categoryId", element: <EditCategory /> },
            /** food */
            { path:"food", element: <FoodList /> },
            { path: "create-food", element: <CreateFood /> },
            { path: "edit-food/:foodId", element: <EditFood /> },
            /** food */
            { path:"chef", element: <ChefList/> },
            { path: "create-chef", element: <CreateChef /> },
            { path: "edit-chef/:chefId", element: <EditChef /> },       
            /** popular */
            { path:"popular", element: <PopularList/> },
            { path: "create-popular", element: <CreatePopular/> },
            { path: "edit-popular/:id", element: <EditPopular/> },       
       
        ],
    },
]; 

/* Generate permitted routes */
export const permittedRoutes = () => {
    // const token = getToken();
    // if (token) {
    //     return appRoutes;
    // }
    return appRoutes;
    return [];
};