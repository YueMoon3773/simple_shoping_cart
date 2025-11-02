import { z } from 'zod';

import CartBtn from '../cartBtn/cartBtn';

import ValidatedComponent from '../../../utils/validateComponentProps';

import './cartCard.scss';

const cartCardSchema = z.object({
    cartCardImg: z.string(),
    cartCardTitle: z.string(),
    cartCardCategory: z.string(),
    cartCardPrice: z.number(),
    cartCardQuantity: z.number(),
});

const CartCard = ({ cartCardImg, cartCardTitle, cartCardCategory, cartCardPrice, cartCardQuantity }) => {
    return (
        <div className="cartCard">
            <div className="cartCardImgWrapper">
                <img src={cartCardImg} alt="Product image" />
            </div>
            <div className="cartCardContent">
                <h3>{cartCardTitle}</h3>
                <p>{cartCardCategory}</p>
                <p>{cartCardPrice}</p>
                <div className="cartController">
                    <h4>${cartCardPrice * cartCardQuantity}</h4>
                    <div className="quantityWrapper">
                        <CartBtn cartBtnContent={'-'} />
                        <input value={cartCardQuantity} type="number" />
                        <CartBtn cartBtnContent={'+'} />
                    </div>
                    <CartBtn cartBtnContent={'🗑️'} />
                </div>
            </div>
        </div>
    );
};

export default ValidatedComponent(CartCard, cartCardSchema);
