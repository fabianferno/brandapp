import React from 'react';
import NavLink from 'next/link';

import NavBarItem from './NavBarItem';

const PageLink = ({ children, href, className, icon, tabIndex, testId }) => {
  return (
    <NavLink href={href}>
      <a>
        <NavBarItem href={href} className={className} icon={icon} tabIndex={tabIndex} testId={testId}>
          {children}
        </NavBarItem>
      </a>
    </NavLink>
  );
};

export default PageLink;
