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
    cartMinusBtnHandler: z.function(),
    cartAddBtnHandler: z.function(),
    cartDeleteBtnHandler: z.function(),
    cartInputOnChangeHandler: z.function(),
});

const CartCard = ({
    cartCardImg,
    cartCardTitle,
    cartCardCategory,
    cartCardPrice,
    cartCardQuantity,
    cartMinusBtnHandler,
    cartAddBtnHandler,
    cartDeleteBtnHandler,
    cartInputOnChangeHandler,
}) => {
    return (
        <div className="cartCard">
            <div className="cartCardImgWrapper">
                <img src={cartCardImg} alt="Product image" />
            </div>
            <div className="cartCardContent">
                <h3>{cartCardTitle}</h3>
                <p>{cartCardCategory}</p>
                <p>${cartCardPrice}</p>
                <div className="cartController">
                    <h4>
                        Total: $
                        {Number.isInteger(cartCardPrice * cartCardQuantity)
                            ? cartCardPrice * cartCardQuantity
                            : parseFloat(cartCardPrice * cartCardQuantity).toFixed(2)}
                    </h4>
                    <div className="quantityWrapper">
                        <CartBtn cartBtnContent={'-'} onClick={cartMinusBtnHandler} />
                        <input
                            value={cartCardQuantity}
                            onChange={(e) => {
                                if (e.target.value < 0) cartInputOnChangeHandler(1);
                                else cartInputOnChangeHandler(e.target.value);
                            }}
                            type="number"
                        />
                        <CartBtn cartBtnContent={'+'} onClick={cartAddBtnHandler} />
                    </div>
                    <CartBtn cartBtnContent={'🗑️'} onClick={cartDeleteBtnHandler} />
                </div>
            </div>
        </div>
    );
};

export default ValidatedComponent(CartCard, cartCardSchema);
