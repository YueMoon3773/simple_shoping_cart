import pageStyles from '../../../styles/modules/pageSetUp.module.scss';
import './errorPage.scss';

const ErrorPage = () => {
    return (
        <div className={`errorPage ${pageStyles.page}`}>
            <h1>This page is temporary unavailable! Please contact the devs or visit this page later.</h1>
        </div>
    );
};

export default ErrorPage;
