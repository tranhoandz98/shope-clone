import { routerMain } from '~/constants/routerMain'
import MainLayout from '~/layouts/MainLayout'
import RegisterLayout from '~/layouts/RegisterLayout'
import Login from '~/pages/Login'
import ProductList from '~/pages/ProductList'
import Profile from '~/pages/Profile'
import Register from '~/pages/Register'
import ProtectedRoute from './ProtectedRoute'
import RejectedRoute from './RejectedRoute'
import ProductDetail from '~/pages/ProductDetail'
import Cart from '~/pages/Cart'

export const routers = [
  {
    path: '',
    element: <RejectedRoute />,
    children: [
      {
        path: routerMain.LOGIN,
        element: (
          <RegisterLayout>
            <Login />
          </RegisterLayout>
        )
      },
      {
        path: routerMain.REGISTER,
        element: (
          <RegisterLayout>
            <Register />
          </RegisterLayout>
        )
      }
    ]
  },
  {
    path: '',
    element: <ProtectedRoute />,
    children: [
      {
        path: routerMain.PROFILE,
        element: (
          <MainLayout>
            <Profile />
          </MainLayout>
        )
      },
      {
        path: routerMain.CART,
        element: <Cart />
      }
    ]
  },
  {
    path: routerMain.HOME + routerMain.PRODUCT_DETAIL,
    element: (
      <MainLayout>
        <ProductDetail />
      </MainLayout>
    )
  },
  {
    path: routerMain.HOME,
    index: true,
    element: (
      <MainLayout>
        <ProductList />
      </MainLayout>
    )
  }
]
