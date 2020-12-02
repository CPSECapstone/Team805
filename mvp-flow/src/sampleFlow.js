const uibuilder = require('./uibuilder');

export const sampleRunThrough = async () => {
  // login
  const res = await uibuilder.loginPost('testUser', 'testPass');

  // check if login was successful
  if (res !== 200) {
    console.log('Error logging into sample flow');
    return;
  }

  // get response from GET
  const formRes = await uibuilder.getFormData();

  // check if form API was successful
  if (formRes.status !== 200) {
    console.log('Error getting form data');
    return;
  }

  // parse form data into objects and log to console
  console.log(uibuilder.parseFormData(formRes.data));
};