import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import ValidatedComponent from '../../../utils/validateComponentProps';

import btnStyles from '../../../styles/modules/button.module.scss';
import './headerBtn.scss';

const headerBtnSchema = z.object({
    toLink: z.string(),
    btnContent: z.string(),
});

const HeaderBtn = ({ toLink, btnContent }) => {
    return (
        <Link to={toLink} className={`${btnStyles.headerBtn}`}>
            {btnContent}
        </Link>
    );
};

export default ValidatedComponent(HeaderBtn, headerBtnSchema);
