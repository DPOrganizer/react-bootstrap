import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';

import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';
import { withFormGroupContext } from './utils/Contexts';

const propTypes = {
  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  htmlFor: PropTypes.string,
  srOnly: PropTypes.bool,

  $bs_formGroup: PropTypes.object
};

const defaultProps = {
  srOnly: false
};

class ControlLabel extends React.Component {
  render() {
    const formGroup = this.props.$bs_formGroup;
    const controlId = formGroup && formGroup.controlId;

    const {
      htmlFor = controlId,
      srOnly,
      className,
      $bs_formGroup,
      ...props
    } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    warning(
      controlId == null || htmlFor === controlId,
      '`controlId` is ignored on `<ControlLabel>` when `htmlFor` is specified.'
    );

    const classes = {
      ...getClassSet(bsProps),
      'sr-only': srOnly
    };

    return (
      <label
        {...elementProps}
        htmlFor={htmlFor}
        className={classNames(className, classes)}
      />
    );
  }
}

ControlLabel.propTypes = propTypes;
ControlLabel.defaultProps = defaultProps;

export default withFormGroupContext(bsClass('control-label', ControlLabel));
