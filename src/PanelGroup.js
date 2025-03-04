import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { cloneElement } from 'react';
import { uncontrollable } from 'uncontrollable';

import {
  bsClass,
  getClassSet,
  splitBsPropsAndOmit
} from './utils/bootstrapUtils';
import ValidComponentChildren from './utils/ValidComponentChildren';
import { generatedId } from './utils/PropTypes';
import { PanelGroupContext } from './utils/Contexts';

const propTypes = {
  accordion: PropTypes.bool,
  /**
   * When `accordion` is enabled, `activeKey` controls the which child `Panel` is expanded. `activeKey` should
   * match a child Panel `eventKey` prop exactly.
   *
   * @controllable onSelect
   */
  activeKey: PropTypes.any,

  /**
   * A callback fired when a child Panel collapse state changes. It's called with the next expanded `activeKey`
   *
   * @controllable activeKey
   */
  onSelect: PropTypes.func,

  /**
   * An HTML role attribute
   */
  role: PropTypes.string,

  /**
   * A function that takes an eventKey and type and returns a
   * unique id for each Panel heading and Panel Collapse. The function _must_ be a pure function,
   * meaning it should always return the _same_ id for the same set of inputs. The default
   * value requires that an `id` to be set for the PanelGroup.
   *
   * The `type` argument will either be `"body"` or `"heading"`.
   *
   * @defaultValue (eventKey, type) => `${this.props.id}-${type}-${key}`
   */
  generateChildId: PropTypes.func,

  /**
   * HTML id attribute, required if no `generateChildId` prop
   * is specified.
   */
  id: generatedId('PanelGroup')
};

const defaultProps = {
  accordion: false
};

class PanelGroup extends React.Component {
  getPanelGroupContext() {
    const { activeKey, accordion, generateChildId, id } = this.props;
    let getId = null;

    if (accordion) {
      getId =
        generateChildId ||
        ((key, type) => (id ? `${id}-${type}-${key}` : null));
    }

    return {
      getId,
      headerRole: 'tab',
      panelRole: 'tabpanel',
      ...(accordion && {
        activeKey,
        onToggle: this.handleSelect
      })
    };
  }

  handleSelect = (key, expanded, e) => {
    if (expanded) {
      this.props.onSelect(key, e);
    } else if (this.props.activeKey === key) {
      this.props.onSelect(null, e);
    }
  };

  render() {
    const { accordion, className, children, ...props } = this.props;

    const [bsProps, elementProps] = splitBsPropsAndOmit(props, [
      'onSelect',
      'activeKey'
    ]);

    if (accordion) {
      elementProps.role = elementProps.role || 'tablist';
    }

    const classes = getClassSet(bsProps);

    return (
      <PanelGroupContext.Provider value={this.getPanelGroupContext()}>
        <div {...elementProps} className={classNames(className, classes)}>
          {ValidComponentChildren.map(children, child =>
            cloneElement(child, {
              bsStyle: child.props.bsStyle || bsProps.bsStyle
            })
          )}
        </div>
      </PanelGroupContext.Provider>
    );
  }
}

PanelGroup.propTypes = propTypes;
PanelGroup.defaultProps = defaultProps;

export default uncontrollable(bsClass('panel-group', PanelGroup), {
  activeKey: 'onSelect'
});
