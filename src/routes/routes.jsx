import App from '../App';
import ErrorPage from '../components/pages/errorPage/errorPage';
import HomePage from '../components/pages/homePage/homePage';
import CartPage from '../components/pages/cartPage/cartPage';
import ShopPage from '../components/pages/shopPage/shopPage';

const routes = [
    {
        path: '/',
        // element: <App />,
        element: <HomePage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/shop',
        element: <ShopPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/cart',
        element: <CartPage />,
        errorElement: <ErrorPage />,
    },
];

export default routes;
