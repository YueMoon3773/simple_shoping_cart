import { Link } from 'react-router-dom';
import { z } from 'zod';

import ValidatedComponent from '../../../utils/validateComponentProps';

import btnStyles from '../../../styles/modules/button.module.scss';
import './linkBtn.scss';

const linkBtnSchema = z.object({
    toLink: z.string(),
    btnContent: z.string().default(''),
});

const LinkBtn = ({ toLink, btnContent = '' }) => {
    return (
        <Link to={toLink} className={`linkBtn ${btnStyles.toLinkMainBtn}`}>
            {btnContent}
        </Link>
    );
};

export default ValidatedComponent(LinkBtn, linkBtnSchema);
