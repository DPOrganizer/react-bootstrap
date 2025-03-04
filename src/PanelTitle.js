import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import elementType from 'react-prop-types/lib/elementType';

import { prefix, splitBsProps, bsClass } from './utils/bootstrapUtils';
import PanelToggle from './PanelToggle';
import { withPanelContext } from './utils/Contexts';

const propTypes = {
  componentClass: elementType,
  /**
   * A convenience prop that renders the Panel.Title as a panel collapse toggle component
   * for the common use-case.
   */
  toggle: PropTypes.bool,

  $bs_panel: PropTypes.shape({
    bsClass: PropTypes.string
  })
};

const defaultProps = {
  componentClass: 'div'
};

class PanelTitle extends React.Component {
  render() {
    let {
      children,
      className,
      toggle,
      componentClass: Component,
      $bs_panel,
      ...props
    } = this.props;

    const { bsClass: _bsClass } = $bs_panel || {};

    const [bsProps, elementProps] = splitBsProps(props);
    bsProps.bsClass = _bsClass || bsProps.bsClass;

    if (toggle) {
      children = <PanelToggle>{children}</PanelToggle>;
    }

    return (
      <Component
        {...elementProps}
        className={cn(className, prefix(bsProps, 'title'))}
      >
        {children}
      </Component>
    );
  }
}

PanelTitle.propTypes = propTypes;
PanelTitle.defaultProps = defaultProps;

export default withPanelContext(bsClass('panel', PanelTitle));
