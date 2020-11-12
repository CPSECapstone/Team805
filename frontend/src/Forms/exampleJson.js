import InputField from './InputField.js';
import RadioButton from './RadioButton.js';

export const getJson = () => {
  return [
    {
      form_name: 'name',
      form_desc: 'description',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          label: 'First Name',
          component: InputField,
          onChange: 'firstName',
        },
        {
          name: 'lastName',
          type: 'text',
          label: 'Last Name',
          component: InputField,
          onChange: 'lastName',
        },
        {
          name: 'email',
          type: 'email',
          component: InputField,
          label: 'Email',
          onChange: 'email',
        },
        {
          name: 'password',
          type: 'password',
          component: InputField,
          label: 'Password',
          onChange: 'password',
        },
        {
          name: 'gender',
          type: '',
          component: RadioButton,
          label: 'Gender',
          onChange: 'gender',
        },
      ],
    },
  ];
};
