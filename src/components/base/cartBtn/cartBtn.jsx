import { z } from 'zod';

import ValidatedComponent from '../../../utils/validateComponentProps';

import buttonStyles from '../../../styles/modules/button.module.scss';
import './cartBtn.scss';

const cartBtnSchema = z.object({
    cartBtnContent: z.string(),
    onClick: z.function().optional(),
});

const CartBtn = ({ cartBtnContent, onClick }) => {
    return (
        <button onClick={onClick} className={`cartBtn ${buttonStyles.primaryColorBtn}`}>
            {cartBtnContent}
        </button>
    );
};

export default ValidatedComponent(CartBtn, cartBtnSchema);
