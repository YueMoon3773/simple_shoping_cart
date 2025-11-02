import { useEffect, useState } from 'react';
import { useHeaderNavShadow } from '../../../hooks/useHeaderNavShadow';
import { useStorageHelper } from '../../../hooks/useStorageHelper';
import { useGetData } from '../../../hooks/useGetData';

import HeaderNav from '../../layout/headerNav/headerNav';
import PageMarkerForNavShadow from '../../base/pageMarkerForNavShadow/pageMarkerForNavShadow';
import LinkBtn from '../../base/linkBtn/linkBtn';
import LoadingComp from '../../base/loadingComp/loadingComp';
import ErrorComp from '../../base/errorComp/errorComp';
import CartBtn from '../../base/cartBtn/cartBtn';
import CartCard from '../../base/cartCard/cartCard';

import pageStyles from '../../../styles/modules/pageSetUp.module.scss';
import './cartPage.scss';

const CartPage = () => {
    const { headerShadow, pageMarker } = useHeaderNavShadow();
    const { data, error, loading } = useGetData();
    const { getAllStoredItems, getTotalNumberOfItems } = useStorageHelper('localStorage');

    const [navCartNumber, setNavCartNumber] = useState(getTotalNumberOfItems());
    const [storedData, setStoredData] = useState(getAllStoredItems());
    const [dataToShow, setDataToShow] = useState(null);

    useEffect(() => {
        if (data) {
            const tmpDataToShow = storedData
                .map((storedItem) => {
                    const productInfo = data.find((dataItem) => dataItem.id === storedItem.productId);

                    return productInfo
                        ? {
                              ...productInfo,
                              quantity: storedItem.quantity,
                          }
                        : null;
                })
                .filter((item) => item);
            setDataToShow(tmpDataToShow);
        }
    }, [data, storedData]);

    console.log({ data, error, loading });
    console.log({ storedData });
    console.log({ dataToShow });

    return (
        <div className={`cartPage ${pageStyles.page}`}>
            <HeaderNav headerShadow={headerShadow} navCartNumber={navCartNumber} />
            <PageMarkerForNavShadow refName={pageMarker} />
            <div
                className={`cartPageContent ${pageStyles.pageContent} ${pageStyles.leftPageContent} ${pageStyles.rightPageContent}`}
            >
                <section className="cartContentHeading">
                    <h2>Your shopping Cart</h2>
                    {navCartNumber !== 0 && (
                        <p>
                            You have <span>{navCartNumber}</span> item(s) in your cart.
                        </p>
                    )}
                </section>

                {navCartNumber === 0 && (
                    <section className="noItemSection">
                        <h1>🛒</h1>
                        <h2>Your cart is empty</h2>
                        <p>Looks like you haven't added any items to your cart yet.</p>
                        <LinkBtn toLink={'/shop'} btnContent={'Start shopping'} />
                    </section>
                )}

                {error !== null && <ErrorComp />}
                {error === null && navCartNumber !== 0 && dataToShow === null && <LoadingComp />}

                {error === null && navCartNumber !== 0 && dataToShow !== null && (
                    <div className="cartDisplayWrapper">
                        <section className="cartProductsDisplay">
                            {dataToShow.map((item) => {
                                return (
                                    <CartCard
                                        cartCardImg={item.image}
                                        cartCardTitle={item.title}
                                        cartCardCategory={item.category}
                                        cartCardPrice={item.price}
                                        cartCardQuantity={item.quantity}
                                    />
                                );
                            })}
                        </section>

                        <section className="cartSummary">
                            <h1>Order Summary</h1>
                            <ul className="cartSummaryList">
                                {dataToShow.map((item) => {
                                    return (
                                        <li className="cartSummaryItem">
                                            <h4>{item.title}</h4>
                                            <div className="summaryPriceWrapper">
                                                <p>
                                                    <span>
                                                        ${item.price} x {item.quantity}
                                                    </span>
                                                </p>
                                                <h5>${Number(item.price) * Number(item.quantity)}</h5>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="cartSummaryTotal">
                                <h3>Total</h3>
                                <h3>
                                    $
                                    {dataToShow.reduce((accu, item) => {
                                        return accu + Number(item.price) * Number(item.quantity);
                                    }, 0)}
                                </h3>
                            </div>
                            <div className="cartSummaryControllers">
                                <CartBtn cartBtnContent={'Proceed to Check out'} />
                                <LinkBtn toLink={'/shop'} btnContent={'Continue Shopping'} />
                            </div>
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
