const uibuilder = require('./uibuilder');

const sampleRunThrough = () => {
  //login stuff from nathan
  uibuilder.loginPost('testUser', 'testPass');

  let formObj = uibuilder.parseFormData(uibuilder.getFormData());
  console.log('formObj');
  //rendering -> react

  //submit stuff from Miko
}

sampleRunThrough();
