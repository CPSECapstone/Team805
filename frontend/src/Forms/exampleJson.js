import InputField from './InputField.js';
import RadioButton from './RadioButton.js';

export const getJson = ({state, onChange}) => {
  return [
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      component: InputField,
      value: state['firstName'],
      onChange: onChange('firstName'),
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      component: InputField,
      value: state['lastName'],
      onChange: onChange('lastName'),
    },
    {
      name: 'email',
      type: 'email',
      component: InputField,
      label: 'Email',
      value: state['email'],
      onChange: onChange('email'),
    },
    {
      name: 'password',
      type: 'password',
      component: InputField,
      label: 'Password',
      value: state['password'],
      onChange: onChange('password'),
    },
    {
      name: 'gender',
      type: '',
      component: RadioButton,
      label: 'Gender',
      value: state['gender'],
      onChange: onChange('gender'),
    },
  ];
};
