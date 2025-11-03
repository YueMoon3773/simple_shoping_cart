import { useState } from 'react';
import { z } from 'zod';
import { useStorageHelper } from '../../../hooks/useStorageHelper';

import ValidatedComponent from '../../../utils/validateComponentProps';

import './shopCard.scss';

const shopCardSchema = z.object({
    cardId: z.number(),
    cardImgSrc: z.string(),
    cardTitle: z.string(),
    cardDetails: z.string(),
    cardPrice: z.number(),
    cardRating: z.number(),
    cardRatingCount: z.number(),
    cardCategory: z.string(),
    setNavCartNumber: z.function(),
    showItemAddedOnClick: z.function(),
});

const ShopCard = ({
    cardId,
    cardImgSrc,
    cardTitle,
    cardDetails,
    cardPrice,
    cardRating,
    cardRatingCount,
    cardCategory,
    setNavCartNumber,
    showItemAddedOnClick,
}) => {
    const [quantity, setQuantity] = useState(1);
    const { saveDataToStorage, getTotalNumberOfItems } = useStorageHelper('localStorage');

    const handleClickAddBtn = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleClickMinusBtn = () => {
        setQuantity((prev) => {
            if (prev > 1) return prev - 1;
            else return 1;
        });
    };

    const handleUserInp = (inpValue) => {
        let newQuantity = Number(inpValue) < 0 ? 1 : Number(inpValue);
        setQuantity(newQuantity);
    };

    const handleClickAddToCartBtn = (productId) => {
        saveDataToStorage(productId, quantity);
        setNavCartNumber(getTotalNumberOfItems());

        // console.log(`id: ${productId}; val: ${getItemDataByKey(productId)}`);
        // console.log(`All items: ${getAllStoredItems()}`);
        // getAllStoredItems();
        // console.log(`Total: ${getTotalNumberOfItems()}`);
    };

    // console.log(quantity);

    return (
        <div className="card">
            <div className="cardImgWrapper">
                <img src={cardImgSrc} alt="Product image" />
            </div>

            <div className="cardContent">
                <h3>{cardTitle}</h3>
                {/* <p>{cardDetails}</p> */}
                <div className="contentBottom">
                    <h2>
                        $<span>{cardPrice}</span>
                    </h2>
                    <div className="reviewsWrapper">
                        <div className="rating">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                            </svg>
                            <span>{cardRating}</span>
                        </div>
                        <span className="ratingCount">{`(${cardRatingCount} reviews)`}</span>
                    </div>
                </div>
            </div>

            <div className="cardControllerWrapper">
                <div className="cardLeftController">
                    <button onClick={handleClickMinusBtn} className="minus">
                        -
                    </button>
                    <input
                        value={quantity}
                        onChange={(e) => {
                            handleUserInp(e.target.value);
                        }}
                        type="number"
                        name=""
                        id=""
                        className="quantity"
                    />
                    <button onClick={handleClickAddBtn} className="add">
                        +
                    </button>
                </div>
                <div className="cardRightController">
                    <button
                        className="addToCart"
                        onClick={() => {
                            handleClickAddToCartBtn(cardId);
                            showItemAddedOnClick(cardTitle);
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M10 0V4H8L12 8L16 4H14V0M1 2V4H3L6.6 11.6L5.2 14C5.1 14.3 5 14.6 5 15C5 16.1 5.9 17 7 17H19V15H7.4C7.3 15 7.2 14.9 7.2 14.8V14.7L8.1 13H15.5C16.2 13 16.9 12.6 17.2 12L21.1 5L19.4 4L15.5 11H8.5L4.3 2M7 18C5.9 18 5 18.9 5 20S5.9 22 7 22 9 21.1 9 20 8.1 18 7 18M17 18C15.9 18 15 18.9 15 20S15.9 22 17 22 19 21.1 19 20 18.1 18 17 18Z" />
                        </svg>
                        Add to cart
                    </button>
                </div>
            </div>

            <span className="cardCategory">{cardCategory}</span>
        </div>
    );
};

export default ValidatedComponent(ShopCard, shopCardSchema);
