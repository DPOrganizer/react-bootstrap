import React from 'react';
import PropTypes from 'prop-types';

import Collapse from './Collapse';
import { prefix } from './utils/bootstrapUtils';
import { withNavBarContext } from './utils/Contexts';

const propTypes = {
  $bs_navbar: PropTypes.shape({
    bsClass: PropTypes.string,
    expanded: PropTypes.bool
  })
};

class NavbarCollapse extends React.Component {
  render() {
    const { children, $bs_navbar: navbarProps, ...props } = this.props;
    const bsClassName = prefix(navbarProps || { bsClass: 'navbar' }, 'collapse');

    return (
      <Collapse in={navbarProps.expanded} {...props}>
        <div className={bsClassName}>{children}</div>
      </Collapse>
    );
  }
}

NavbarCollapse.propTypes = propTypes;

export default withNavBarContext(NavbarCollapse);
