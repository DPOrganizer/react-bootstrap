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

class NavbarBrand extends React.Component {
  render() {
    const { className, children, $bs_navbar, ...props } = this.props;
    const navbarProps = $bs_navbar || { bsClass: 'navbar' };

    const bsClassName = prefix(navbarProps, 'brand');

    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: classNames(children.props.className, className, bsClassName)
      });
    }

    return (
      <span {...props} className={classNames(className, bsClassName)}>
        {children}
      </span>
    );
  }
}

NavbarBrand.propTypes = propTypes;

export default withNavBarContext(NavbarBrand);
