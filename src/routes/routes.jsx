import App from '../App';
import HomePage from '../components/pages/homePage/homePage';
import ShopPage from '../components/pages/shopPage/shopPage';

const routes = [
    {
        path: '/',
        // element: <App />,
        element: <HomePage />,
        // errorElement: <ErrorPage />,
    },
    {
        path: '/shop',
        element: <ShopPage />,
    },
    {
        // path: '/profile/:name?',
        // element: <Profile />,
    },
];

export default routes;
