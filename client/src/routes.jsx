import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Product,} from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Test from "./pages/dashboard/Test";
import StockPage from "./pages/dashboard/StockPage";
import TransactionPage from "./pages/dashboard/TransactionPage";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Product",
        path: "/product",
        element: <Product />,  // updated
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Test",
        path: "/test",
        element: <Test/>,  // updated
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Stock In/Out",
        path: "/stockPage",
        element: <StockPage />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "Transactions",       // sidebar me sirf ye dikhega
        path: "/transactions",       // last 15 transactions
        element: <TransactionPage />,
        // ✅ ye property add karo, sidebar me dikha na ho
        hidden: true,  
      },
      // product-specific route, sidebar me nahi
      {
        path: "/transactions/:productId",
        element: <TransactionPage />,
        hidden: true,  // sidebar me dikha na ho
      },
        
      
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
      
    ],
  },
];

export default routes;
