import React, { createContext } from 'react';

const getContextConsumerClass = (context, propName) =>
  function(Component) {
    return class extends React.Component {
      render() {
        return (
          <context.Consumer>
            {value => (
              <Component
                {...{
                  ...this.props,
                  [propName]: value
                }}
              />
            )}
          </context.Consumer>
        );
      }
    };
  };

const TabContainerContext = createContext(null);
const TabContentContext = createContext(null);
const PanelGroupContext = createContext(null);
const FormGroupContext = createContext(null);
const NavBarContext = createContext(null);
const PanelContext = createContext(null);
const ModalContext = createContext(null);

const withTabContainerContext = getContextConsumerClass(
  TabContainerContext,
  '$bs_tabContainer'
);
const withTabContentContext = getContextConsumerClass(
  TabContentContext,
  '$bs_tabContent'
);
const withPanelGroupContext = getContextConsumerClass(
  PanelGroupContext,
  '$bs_panelGroup'
);
const withFormGroupContext = getContextConsumerClass(
  FormGroupContext,
  '$bs_formGroup'
);
const withNavBarContext = getContextConsumerClass(NavBarContext, '$bs_navbar');
const withPanelContext = getContextConsumerClass(PanelContext, '$bs_panel');
const withModalContext = getContextConsumerClass(ModalContext, '$bs_modal');

export {
  TabContainerContext,
  TabContentContext,
  PanelGroupContext,
  FormGroupContext,
  NavBarContext,
  PanelContext,
  ModalContext,
  withTabContainerContext,
  withTabContentContext,
  withPanelGroupContext,
  withFormGroupContext,
  withNavBarContext,
  withPanelContext,
  withModalContext
};
