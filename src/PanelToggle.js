import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import elementType from 'react-prop-types/lib/elementType';

import SafeAnchor from './SafeAnchor';
import createChainedFunction from './utils/createChainedFunction';
import { withPanelContext } from './utils/Contexts';

const propTypes = {
  /**
   * only here to satisfy linting, just the html onClick handler.
   *
   * @private
   */
  onClick: PropTypes.func,
  /**
   * You can use a custom element for this component
   */
  componentClass: elementType,

  $bs_panel: PropTypes.shape({
    bodyId: PropTypes.string,
    onToggle: PropTypes.func,
    expanded: PropTypes.bool
  })
};

const defaultProps = {
  componentClass: SafeAnchor
};

class PanelToggle extends React.Component {
  constructor(...args) {
    super(...args);

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(event) {
    const { onToggle } = this.props.$bs_panel || {};

    if (onToggle) {
      onToggle(event);
    }
  }

  render() {
    const {
      onClick,
      className,
      componentClass,
      $bs_panel,
      ...props
    } = this.props;
    const { expanded, bodyId } = $bs_panel || {};
    const Component = componentClass;

    props.onClick = createChainedFunction(onClick, this.handleToggle);

    props['aria-expanded'] = expanded;
    props.className = classNames(className, !expanded && 'collapsed');

    if (bodyId) {
      props['aria-controls'] = bodyId;
    }

    return <Component {...props} />;
  }
}

PanelToggle.propTypes = propTypes;
PanelToggle.defaultProps = defaultProps;

export default withPanelContext(PanelToggle);
