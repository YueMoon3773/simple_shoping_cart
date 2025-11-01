import { useState, useRef } from 'react';
import { z } from 'zod';

import HeaderLogo from '../../base/headerLogo/headerLogo';
import HeaderBtn from '../../base/headerBtn/headerBtn';

import ValidatedComponent from '../../../utils/validateComponentProps';

import pageStyles from '../../../styles/modules/pageSetUp.module.scss';
import './headerNav.scss';

const headerNavSchema = z.object({
    headerShadow: z.boolean().default(false),
    navCartNumber: z.number().optional(),
});

const HeaderNav = ({ headerShadow = false, navCartNumber }) => {
    const linkList = [
        { to: '/', content: 'Home' },
        { to: '/shop', content: 'Shop' },
        { to: '/cart', content: 'Cart' },
    ];

    return (
        <div className={`headerNav ${pageStyles.pageHeader} ${headerShadow === true ? 'showShadow' : ''}`}>
            <HeaderLogo />
            <div className="controller">
                {linkList.map((link) => {
                    return (
                        <HeaderBtn
                            key={link.content}
                            toLink={link.to}
                            btnContent={link.content}
                            navCartNumber={navCartNumber}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ValidatedComponent(HeaderNav, headerNavSchema);
