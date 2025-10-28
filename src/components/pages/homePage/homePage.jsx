import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import HeaderNav from '../../layout/headerNav/headerNav';
import PageMarkerForNavShadow from '../../base/pageMarkerForNavShadow/pageMarkerForNavShadow';
import LinkBtn from '../../base/linkBtn/linkBtn';
import HomeCard from '../../base/homeCard/homeCard';

import pageStyles from '../../../styles/modules/pageSetUp.module.scss';
import './homePage.scss';

const HomePage = () => {
    const [headerShadow, setHeaderShadow] = useState(false);
    const pageMarker = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entries]) => {
                setHeaderShadow(!entries.isIntersecting);
            },
            { threshold: 0.2 },
        );

        if (pageMarker.current) {
            observer.observe(pageMarker.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className={`homePage ${pageStyles.page}`}>
            <HeaderNav headerShadow={headerShadow} />
            <PageMarkerForNavShadow refName={pageMarker} />
            <div
                className={`homeContent ${pageStyles.pageContent} ${pageStyles.leftPageContent} ${pageStyles.rightPageContent}`}
            >
                <section className="topSection">
                    <div className="leftSide">
                        <div className="firstRow">
                            <span>✨</span>
                            <span>👔</span>
                            <span>🎧</span>
                        </div>
                        <div className="secondRow">
                            <span>🎨</span>
                            <span>🎁</span>
                            <span>👟</span>
                        </div>
                    </div>
                    <div className="rightSide">
                        <h1>
                            Welcome to <span>Shopify</span>
                        </h1>
                        <p>
                            Check out our latest collection — it’s here to brighten your day and elevate your lifestyle.
                        </p>
                        <div className="topSectionControllers">
                            <LinkBtn toLink={'/shop'} btnContent={'Explore our shop'} />
                            <LinkBtn toLink={'/cart'} btnContent={'View your cart'} />
                        </div>
                    </div>
                </section>

                <div className="midSection">
                    <h2>Why choose us?</h2>
                    <div className="midSectionContent">
                        <HomeCard
                            homeCardIcon={'💳'}
                            homeCardHeading={'Easy payment'}
                            homeCardContent={
                                'From cards to digital wallets, our easy payment system ensures a quick and worry-free shopping experience.'
                            }
                        />
                        <HomeCard
                            homeCardIcon={'🚚'}
                            homeCardHeading={'Fast delivery'}
                            homeCardContent={
                                'Skip the wait and dive right in! With our instant delivery, your next gaming session is only a few clicks away.'
                            }
                        />
                        <HomeCard
                            homeCardIcon={'🛡️'}
                            homeCardHeading={'Shop Confidently'}
                            homeCardContent={
                                'All our products are backed by a standard warranty. If anything goes wrong, we’re here to repair, replace, or refund.'
                            }
                        />
                    </div>
                </div>

                <div className="botSection">
                    <h2>Ready to start filling your Cart?</h2>
                    <p>Explore our collection and discover the perfect pick for you or someone special.</p>
                    <LinkBtn toLink={'/shop'} btnContent={'Start shopping'} />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
