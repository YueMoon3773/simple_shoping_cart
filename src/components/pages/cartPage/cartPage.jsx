import HeaderNav from '../../layout/headerNav/headerNav';

import pageStyles from '../../../styles/modules/pageSetUp.module.scss';
import './cartPage.scss';

const CartPage = () => {
    return (
        <div className={`cartPage ${pageStyles.page}`}>
            <HeaderNav />
        </div>
    );
};

export default CartPage;
