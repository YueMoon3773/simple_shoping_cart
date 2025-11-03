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
    const { getItemDataByKey, getAllStoredItems, getTotalNumberOfItems, updateItemDataByKey, deleteItemByKey } =
        useStorageHelper('localStorage');

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

    useEffect(() => {
        setNavCartNumber(getTotalNumberOfItems());
    }, [storedData]);

    const handleMinusCartBtnClick = (productId) => {
        const newItemData = getItemDataByKey(productId) - 1 < 1 ? 1 : getItemDataByKey(productId) - 1;
        updateItemDataByKey(productId, newItemData);
        setStoredData(getAllStoredItems());
    };
    const handleAddCartBtnClick = (productId) => {
        const newItemData = getItemDataByKey(productId) + 1;
        updateItemDataByKey(productId, newItemData);
        setStoredData(getAllStoredItems());
    };
    const handleDeleteCartBtnClick = (productId) => {
        deleteItemByKey(productId);
        setStoredData(getAllStoredItems());
    };
    const handleInpOnChangeCard = (productId, newItemData) => {
        updateItemDataByKey(productId, newItemData);
        setStoredData(getAllStoredItems());
    };

    // console.log({ data, error, loading });
    // console.log({ storedData });
    // console.log({ dataToShow });

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
                                        key={item.id}
                                        cartCardImg={item.image}
                                        cartCardTitle={item.title}
                                        cartCardCategory={item.category}
                                        cartCardPrice={item.price}
                                        cartCardQuantity={item.quantity}
                                        cartMinusBtnHandler={() => handleMinusCartBtnClick(item.id)}
                                        cartAddBtnHandler={() => handleAddCartBtnClick(item.id)}
                                        cartDeleteBtnHandler={() => handleDeleteCartBtnClick(item.id)}
                                        cartInputOnChangeHandler={(inpValue) =>
                                            handleInpOnChangeCard(item.id, inpValue)
                                        }
                                    />
                                );
                            })}
                        </section>

                        <section className="cartSummary">
                            <h1>Order Summary</h1>
                            <ul className="cartSummaryList">
                                {dataToShow.map((item) => {
                                    return (
                                        <li className="cartSummaryItem" key={item.id}>
                                            <h4>{item.title}</h4>
                                            <div className="summaryPriceWrapper">
                                                <p>
                                                    <span>
                                                        ${item.price} x {item.quantity}
                                                    </span>
                                                </p>
                                                <h5>
                                                    $
                                                    {Number.isInteger(Number(item.price) * Number(item.quantity))
                                                        ? Number(item.price) * Number(item.quantity)
                                                        : parseFloat(
                                                              Number(item.price) * Number(item.quantity),
                                                          ).toFixed(2)}
                                                </h5>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>

                            <div className="cartSummaryTotal">
                                <h3>Total</h3>
                                <h3>
                                    $
                                    {Number.isInteger(
                                        dataToShow.reduce((accu, item) => {
                                            return accu + Number(item.price) * Number(item.quantity);
                                        }, 0),
                                    )
                                        ? dataToShow.reduce((accu, item) => {
                                              return accu + Number(item.price) * Number(item.quantity);
                                          }, 0)
                                        : parseFloat(
                                              dataToShow.reduce((accu, item) => {
                                                  return accu + Number(item.price) * Number(item.quantity);
                                              }, 0),
                                          ).toFixed(2)}
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
