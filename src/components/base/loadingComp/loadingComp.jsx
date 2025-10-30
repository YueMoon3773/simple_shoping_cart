import loadingImg from '../../../assets/img/loading.svg';

import './loadingComp.scss';

const LoadingComp = () => {
    return (
        <div className="loadingCompWrapper">
            <img src={loadingImg} alt="Loading image" />
        </div>
    );
};

export default LoadingComp;
