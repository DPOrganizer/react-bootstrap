import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { prefix } from './utils/bootstrapUtils';
import { withNavBarContext } from './utils/Contexts';

const propTypes = {
  $bs_navbar: PropTypes.shape({
    bsClass: PropTypes.string
  })
};

class NavbarHeader extends React.Component {
  render() {
    const { className, $bs_navbar, ...props } = this.props;
    const navbarProps = $bs_navbar || { bsClass: 'navbar' };

    const bsClassName = prefix(navbarProps, 'header');

    return <div {...props} className={classNames(className, bsClassName)} />;
  }
}

NavbarHeader.propTypes = propTypes;

export default withNavBarContext(NavbarHeader);
