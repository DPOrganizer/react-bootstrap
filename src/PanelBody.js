import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';

import { prefix, splitBsPropsAndOmit, bsClass } from './utils/bootstrapUtils';
import { withPanelContext } from './utils/Contexts';
import PanelCollapse from './PanelCollapse';

const propTypes = {
  /**
   * A convenience prop that renders a Collapse component around the Body for
   * situations when the parent Panel only contains a single Panel.Body child.
   *
   * renders:
   * ```jsx
   * <Panel.Collapse>
   *  <Panel.Body />
   * </Panel.Collapse>
   * ```
   */
  collapsible: PropTypes.bool.isRequired,

  $bs_panel: PropTypes.shape({
    bsClass: PropTypes.string
  })
};

const defaultProps = {
  collapsible: false
};

class PanelBody extends React.Component {
  render() {
    const { children, className, collapsible } = this.props;
    const { bsClass: _bsClass } = this.props.$bs_panel || {};

    const [bsProps, elementProps] = splitBsPropsAndOmit(this.props, [
      '$bs_panel',
      'collapsible'
    ]);
    bsProps.bsClass = _bsClass || bsProps.bsClass;

    let body = (
      <div {...elementProps} className={cn(className, prefix(bsProps, 'body'))}>
        {children}
      </div>
    );

    if (collapsible) {
      body = <PanelCollapse>{body}</PanelCollapse>;
    }

    return body;
  }
}

PanelBody.propTypes = propTypes;
PanelBody.defaultProps = defaultProps;

export default withPanelContext(bsClass('panel', PanelBody));
