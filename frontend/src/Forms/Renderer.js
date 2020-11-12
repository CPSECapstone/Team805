import React, {Fragment} from 'react';
import InputField from './InputField.js';
import RadioButton from './RadioButton.js';

/**
 * returns the type
 * @param {*} name
 * @return {*} InputType
 */
function getType(name) {
  const textFields = ['text', 'email', 'password'];
  if (textFields.includes(name)) {
    return InputField;
  }
  return RadioButton;
};

const mapPropsToConfig = (config, handleOnChange) => {
  const configWithProps = [];
  config.forEach((item) => {
    item.fields.forEach((field) => {
      const {name, type, ...props} = field;
      configWithProps.push({
        ...props,
        Component: getType(type),
        onChange: handleOnChange(name),
      });
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
