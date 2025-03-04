import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import elementType from 'react-prop-types/lib/elementType';

import { prefix, bsClass, splitBsProps } from './utils/bootstrapUtils';
import { withPanelContext } from './utils/Contexts';

const propTypes = {
  componentClass: elementType,

  $bs_panel: PropTypes.shape({
    headingId: PropTypes.string,
    bsClass: PropTypes.string
  })
};

const defaultProps = {
  componentClass: 'div'
};

class PanelHeading extends React.Component {
  render() {
    const {
      children,
      className,
      componentClass: Component,
      $bs_panel,
      ...props
    } = this.props;
    const { headingId, bsClass: _bsClass } = $bs_panel || {};

    const [bsProps, elementProps] = splitBsProps(props);
    bsProps.bsClass = _bsClass || bsProps.bsClass;

    if (headingId) {
      elementProps.role = elementProps.role || 'tab';
      elementProps.id = headingId;
    }

    return (
      <Component
        {...elementProps}
        className={cn(className, prefix(bsProps, 'heading'))}
      >
        {children}
      </Component>
    );
  }
}

PanelHeading.propTypes = propTypes;
PanelHeading.defaultProps = defaultProps;

export default withPanelContext(bsClass('panel', PanelHeading));
