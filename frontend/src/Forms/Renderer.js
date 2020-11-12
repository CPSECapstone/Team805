import React, {Fragment} from 'react';

const mapPropsToConfig = (config, handleOnChange) => {
  const configWithProps = [];
  config.forEach((item) => {
    item.fields.forEach((field) => {
      if (field.component) {
        const {component, onChange, ...props} = field;
        configWithProps.push({
          ...props,
          Component: component,
          onChange: handleOnChange(onChange),
        });
      }
    });
  });
  return configWithProps;
};

export const Renderer = ({config, handleOnChange}) => {
  if (!config) {
    throw new Error('You are calling Renderer with no config.');
  }

  const configWithProps = mapPropsToConfig(config, handleOnChange);

  console.log(configWithProps);
  const renderComponents = (items) => {
    return items.map((item) => {
      const {Component, ...props} = item;
      return (
        <Fragment key={props.name}>
          <Component {...props} />
        </Fragment>
      );
    });
  };

  return renderComponents(configWithProps);
};
