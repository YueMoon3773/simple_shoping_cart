import { z } from 'zod';

import ValidatedComponent from '../../../utils/validateComponentProps';

import './homeCard.scss';

const homeCardSchema = z.object({
    homeCardIcon: z.string(),
    homeCardHeading: z.string(),
    homeCardContent: z.string(),
});

const HomeCard = ({ homeCardIcon, homeCardHeading, homeCardContent }) => {
    return (
        <div className="homeCard">
            <span>{homeCardIcon}</span>
            <h1>{homeCardHeading}</h1>
            <p>{homeCardContent}</p>
        </div>
    );
};

export default ValidatedComponent(HomeCard, homeCardSchema);
