import { RxDashboard } from "react-icons/rx";
import { PiBowlFoodDuotone } from "react-icons/pi";
import { HiBars3 } from "react-icons/hi2";
import { LuChefHat } from "react-icons/lu";

export const menuData = [
  {
    title: "Dashboard",
    icon: <RxDashboard />,
    path: "/dashboard",
  },
  {
    title: "Category",
    icon: <HiBars3 />,
    path: "/dashboard/category",
  },
  {
    title: "Food",
    icon: <PiBowlFoodDuotone />,
    path: "/dashboard/food",
  },
  {
    title: "Chef",
    icon: <LuChefHat />,
    path: "/dashboard/chef",
  },

];
