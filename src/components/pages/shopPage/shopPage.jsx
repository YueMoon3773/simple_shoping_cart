import { useEffect, useState } from 'react';
import { useHeaderNavShadow } from '../../../hooks/useHeaderNavShadow';
import { useGetData } from '../../../hooks/useGetData';

import LoadingComp from '../../base/loadingComp/loadingComp';
import ErrorComp from '../../base/errorComp/errorComp';

import HeaderNav from '../../layout/headerNav/headerNav';
import PageMarkerForNavShadow from '../../base/pageMarkerForNavShadow/pageMarkerForNavShadow';
import ShopCard from '../../base/shopCard/shopCard';

import pageStyles from '../../../styles/modules/pageSetUp.module.scss';
import './shopPage.scss';

const ShopPage = () => {
    const { headerShadow, pageMarker } = useHeaderNavShadow();
    const { data, error, loading } = useGetData();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // console.log(data);
        const tmpCategories = [];
        if (data) {
            data.forEach((item, index) => {
                if (!tmpCategories.includes(item.category)) {
                    tmpCategories.push(item.category);
                }
            });
            setCategories([...tmpCategories]);
        }

        // console.log({ categories });
    }, [data]);

    return (
        <div className={`shopPage ${pageStyles.page}`}>
            <HeaderNav headerShadow={headerShadow} />
            <PageMarkerForNavShadow refName={pageMarker} />
            <div
                className={`shopPageContent ${pageStyles.pageContent} ${pageStyles.leftPageContent} ${pageStyles.rightPageContent}`}
            >
                <section className="shopHeadingWrapper">
                    <h1>Check out our products</h1>
                    <p>Experience our exclusive selection of finely crafted products.</p>
                </section>

                <section className="shopControllers">
                    <div className="left">
                        <span>Sort by:</span>
                        <select name="" id="">
                            <option value="all">All</option>
                            {categories.length !== 0 &&
                                categories.map((category, index) => {
                                    return (
                                        <option key={index} value={`${category}`}>
                                            {category}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div className="right">
                        <span>{data === null ? 0 : data.length}</span>products found
                    </div>
                </section>

                <section className="shopDisplay">
                    {loading === true && error === null && <LoadingComp />}
                    {error !== null && <ErrorComp />}
                    {error === null &&
                        loading !== true &&
                        data !== null &&
                        data.map((dataItem, dataIndex) => {
                            return (
                                <ShopCard
                                    key={dataItem.id}
                                    cardImgSrc={dataItem.image}
                                    cardTitle={dataItem.title}
                                    cardDetails={dataItem.description}
                                    cardPrice={dataItem.price}
                                    cardRating={dataItem.rating.rate}
                                    cardRatingCount={dataItem.rating.count}
                                    cardCategory={dataItem.category}
                                />
                            );
                        })}
                </section>
            </div>
        </div>
    );
};

export default ShopPage;
