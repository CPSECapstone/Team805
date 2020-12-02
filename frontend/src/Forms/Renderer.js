import React from 'react';
import InputField from './InputField.js';
import RadioButton from './RadioButton.js';

/**
 * Returns component type based on field type
 * @param {string} type - Given field type
 * @return {object} - Returns the component type
 */
function getType(type) {
  const formComponents = {
    text: InputField,
    email: InputField,
    password: InputField,
    radio: RadioButton,
  };
  return formComponents[type];
};

export const Renderer = ({config, handleOnChange}) => {
  if (!config) {
    throw new Error('You are calling Renderer with no config.');
  }

  const renderComponents = (config) => {
    return config.fields.map((field) => {
      const Component = getType(field.type);
      return (
        <Component key={field.name} onChange={handleOnChange} {...field} />
      );
    });
  };

  return renderComponents(config);
};
