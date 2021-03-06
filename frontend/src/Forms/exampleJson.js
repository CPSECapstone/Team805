
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
        },
        {
          name: 'lastName',
          type: 'text',
          label: 'Last Name',
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
        },
        {
          name: 'password',
          type: 'password',
          label: 'Password',
        },
        {
          name: 'gender',
          type: '',
          label: 'Gender',
        },
      ],
    },
  ];
};
