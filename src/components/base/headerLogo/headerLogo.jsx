import { z } from 'zod';
import { Link } from 'react-router-dom';

import ValidatedComponent from '../../../utils/validateComponentProps';

import './headerLogo.scss';

const headerLogoSchema = z.object({
    toLink: z.string().default('/').optional(),
});

const HeaderLogo = ({ toLink = '/' }) => {
    return (
        <Link to={toLink} className="headerLogo">
            Shopify
        </Link>
    );
};

export default ValidatedComponent(HeaderLogo, headerLogoSchema);
