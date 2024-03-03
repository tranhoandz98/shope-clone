import { routerMain } from '~/constants/routerMain'
import MainLayout from '~/layouts/MainLayout'
import RegisterLayout from '~/layouts/RegisterLayout'
import Login from '~/pages/Login'
import ProductList from '~/pages/ProductList'
import Profile from '~/pages/User/pages/Profile'
import Register from '~/pages/Register'
import ProtectedRoute from './ProtectedRoute'
import RejectedRoute from './RejectedRoute'
import ProductDetail from '~/pages/ProductDetail'
import Cart from '~/pages/Cart'
import CartLayout from '~/layouts/CartLayout'
import UserLayout from '~/pages/User/layouts/UserLayout'
import ChangePassword from '~/pages/User/pages/ChangePassword'
import HistoryPurchase from '~/pages/User/pages/HistoryPurchase'

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
        path: routerMain.CART,
        element: (
          <CartLayout>
            <Cart />
          </CartLayout>
        )
      },
      {
        path: routerMain.USER,
        element: (
          <MainLayout>
            <UserLayout />
          </MainLayout>
        ),
        children: [
          {
            path: routerMain.PROFILE,
            element: <Profile />
          },
          {
            path: routerMain.CHANGE_PASSWORD,
            element: <ChangePassword />
          },
          {
            path: routerMain.HISTORY_PURCHASE,
            element: <HistoryPurchase />
          }
        ]
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
