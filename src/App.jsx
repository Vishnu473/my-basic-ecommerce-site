import './App.css';
import './index.css'; // Or the appropriate path to your Tailwind CSS file
import { 
  createBrowserRouter, 
  RouterProvider, 
  Route, 
  createRoutesFromElements 
} from 'react-router-dom';
import RootLayout from './Pages/RootLayout';
import ProductList from './Pages/ProductList';
import About from './Pages/About';
import Cart from './Pages/Cart';
import Auth from './Pages/Auth';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import ProductDetail from './Pages/ProductDetail';

const routes = createBrowserRouter([
  {
    path:'/my-basic-ecommerce-site/',
    element:<RootLayout />,
    children:[
      {
        index:true,
        element:<ProductList />//Replace later this with other element
      },
      {
        path:'products',
        element:<ProductList />,
      },
      {
        path:'products/:id',
        element: <ProductDetail />
      },
      {
        path:'about',
        element:<About />
      },
      {
        path:'cart',
        element: <Cart />
      },
      {
        path:'auth',
        children:[
          {
            path:'login',
            element: <Login />
          },
          {
            path:'signUp',
            element: <SignUp />
          }
        ]
      }
    ]
  }
]
);

function App() {

  return (
    <>
      <RouterProvider router={routes}/>
    </>
  )
}

export default App
