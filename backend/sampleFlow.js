const uibuilder = require('./uibuilder');

const sampleRunThrough = () => {
  //login stuff from nathan
  uibuilder.loginPost('testUser', 'testPass');

  let formObj = parseFormData(getFormData());

  //rendering -> react

  //submit stuff from Miko
}
