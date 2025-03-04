import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import {
  bsClass as setBsClass,
  prefix,
  splitBsPropsAndOmit
} from './utils/bootstrapUtils';
import { withTabContainerContext, TabContentContext } from './utils/Contexts';

const propTypes = {
  componentClass: elementType,

  /**
   * Sets a default animation strategy for all children `<TabPane>`s. Use
   * `false` to disable, `true` to enable the default `<Fade>` animation or
   * a react-transition-group v2 `<Transition/>` component.
   */
  animation: PropTypes.oneOfType([PropTypes.bool, elementType]),

  /**
   * Wait until the first "enter" transition to mount tabs (add them to the DOM)
   */
  mountOnEnter: PropTypes.bool,

  /**
   * Unmount tabs (remove it from the DOM) when they are no longer visible
   */
  unmountOnExit: PropTypes.bool,

  $bs_tabContainer: PropTypes.shape({
    activeKey: PropTypes.any
  })
};

const defaultProps = {
  componentClass: 'div',
  animation: true,
  mountOnEnter: false,
  unmountOnExit: false
};

class TabContent extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handlePaneEnter = this.handlePaneEnter.bind(this);
    this.handlePaneExited = this.handlePaneExited.bind(this);

    // Active entries in state will be `null` unless `animation` is set. Need
    // to track active child in case keys swap and the active child changes
    // but the active key does not.
    this.state = {
      activeKey: null,
      activeChild: null
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) { // eslint-disable-line
    if (!nextProps.animation && this.state.activeChild) {
      this.setState({ activeKey: null, activeChild: null });
    }
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  getTabContentContext() {
    const { bsClass, animation, mountOnEnter, unmountOnExit } = this.props;

    const stateActiveKey = this.state.activeKey;
    const containerActiveKey = this.getContainerActiveKey();

    const activeKey =
      stateActiveKey != null ? stateActiveKey : containerActiveKey;
    const exiting =
      stateActiveKey != null && stateActiveKey !== containerActiveKey;

    return {
      bsClass,
      animation,
      activeKey,
      mountOnEnter,
      unmountOnExit,
      onPaneEnter: this.handlePaneEnter,
      onPaneExited: this.handlePaneExited,
      exiting
    };
  }

  getContainerActiveKey() {
    const tabContainer = this.props.$bs_tabContainer;
    return tabContainer && tabContainer.activeKey;
  }

  handlePaneEnter(child, childKey) {
    if (!this.props.animation) {
      return false;
    }

    // It's possible that this child should be transitioning out.
    if (childKey !== this.getContainerActiveKey()) {
      return false;
    }

    this.setState({
      activeKey: childKey,
      activeChild: child
    });

    return true;
  }

  handlePaneExited(child) {
    // This might happen as everything is unmounting.
    if (this.isUnmounted) {
      return;
    }

    this.setState(({ activeChild }) => {
      if (activeChild !== child) {
        return null;
      }

      return {
        activeKey: null,
        activeChild: null
      };
    });
  }

  render() {
    const { componentClass: Component, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsPropsAndOmit(props, [
      '$bs_tabContainer',
      'animation',
      'mountOnEnter',
      'unmountOnExit'
    ]);

    return (
      <TabContentContext.Provider value={this.getTabContentContext()}>
        <Component
          {...elementProps}
          className={classNames(className, prefix(bsProps, 'content'))}
        />
      </TabContentContext.Provider>
    );
  }
}

TabContent.propTypes = propTypes;
TabContent.defaultProps = defaultProps;

export default withTabContainerContext(setBsClass('tab', TabContent));
