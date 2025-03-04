import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import { prefix, bsClass, splitBsPropsAndOmit } from './utils/bootstrapUtils';
import { withPanelContext } from './utils/Contexts';

const propTypes = {
  $bs_panel: PropTypes.shape({
    bsClass: PropTypes.string
  })
};

class PanelFooter extends React.Component {
  render() {
    let { children, className } = this.props;
    let { bsClass: _bsClass } = this.props.$bs_panel || {};

    const [bsProps, elementProps] = splitBsPropsAndOmit(this.props, ['$bs_panel']);
    bsProps.bsClass = _bsClass || bsProps.bsClass;

    return (
      <div
        {...elementProps}
        className={cn(className, prefix(bsProps, 'footer'))}
      >
        {children}
      </div>
    );
  }
}

PanelFooter.propTypes = propTypes;

export default withPanelContext(bsClass('panel', PanelFooter));
