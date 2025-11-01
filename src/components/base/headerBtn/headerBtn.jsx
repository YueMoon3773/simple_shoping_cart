import { Link } from 'react-router-dom';
import { z } from 'zod';
import { useStorageHelper } from '../../../hooks/useStorageHelper';

import ValidatedComponent from '../../../utils/validateComponentProps';

import btnStyles from '../../../styles/modules/button.module.scss';
import './headerBtn.scss';

const headerBtnSchema = z.object({
    toLink: z.string(),
    btnContent: z.string(),
    navCartNumber: z.number().optional(),
});

const HeaderBtn = ({ toLink, btnContent, navCartNumber }) => {
    const { getTotalNumberOfItems } = useStorageHelper('localStorage');

    return (
        <Link to={toLink} className={`${btnStyles.headerBtn}`}>
            {btnContent}
            {btnContent === 'Cart' && navCartNumber === undefined && (
                <span className="totalNumber">{getTotalNumberOfItems() > 99 ? '99+' : getTotalNumberOfItems()}</span>
            )}
            {btnContent === 'Cart' && navCartNumber !== undefined && (
                <span className="totalNumber">{navCartNumber > 99 ? '99+' : navCartNumber}</span>
            )}
        </Link>
    );
};

export default ValidatedComponent(HeaderBtn, headerBtnSchema);
