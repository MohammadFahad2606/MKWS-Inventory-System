import {
  UserCircleIcon,
  ExclamationTriangleIcon,
  Squares2X2Icon,
  ArrowPathIcon,
  CubeIcon,
  ArrowsRightLeftIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { Home, Product,} from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Test from "./pages/dashboard/Test";
import StockPage from "./pages/dashboard/StockPage";
import TransactionPage from "./pages/dashboard/transactions/TransactionPage";
import LowStockPage from "./pages/dashboard/low-stock/LowStockPage";
import PageNotFound from "./pages/PageNotFound";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <Squares2X2Icon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <CubeIcon {...icon} />,
        name: "Product",
        path: "/product",
        element: <Product />,  // updated
      },
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "Test",
      //   path: "/test",
      //   element: <Test/>,  // updated
      // },
      {
        icon: <ExclamationTriangleIcon {...icon} />,
        name: "LowStock",
        path: "/lowstock",
        element: <LowStockPage />,
      },
      {
        icon: <ArrowPathIcon {...icon} />,
        name: "Stock In/Out",
        path: "/stockPage",
        element: <StockPage />,
      },
      
      {
        icon: <ArrowsRightLeftIcon {...icon} />,
        name: "Transactions",       // sidebar me sirf ye dikhega
        path: "/transactions",       // last 15 transactions
        element: <TransactionPage />,
        // ✅ ye property add karo, sidebar me dikha na ho
       
      },
      // product-specific route, sidebar me nahi
      
      {
        path: "/transactions/:productId",
        element: <TransactionPage />,
        hidden: true,  // sidebar me dikha na ho
      },
      {
        path: "*",
        element: <PageNotFound />,
        hidden: true, 
      },
      
    ],
  },
  {

    // in future auth page show title title: "auth pages",
    title: "",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
        hidden: true,
      },


      {
        path: "*",
        element: <PageNotFound />,
        hidden: true, 
      },
      // {
      //   icon: <UserPlusIcon {...icon} />,
      //   name: "sign up",
      //   path: "/sign-up",
      //   element: <SignUp />,
      //   hidden: true,
      // },
      
    ],
  },
];

export default routes;
