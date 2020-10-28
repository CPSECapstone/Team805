const uibuilder = require('./uibuilder');

const sampleRunThrough = async () => {
  //login stuff from nathan
  const res = await uibuilder.loginPost('testUser', 'testPass');
  // console.log(res);
  
  if (res !== 200) {
    console.log("Error logging into sample flow");
    return;
  }
  const formRes = await uibuilder.getFormData();
  
  if (formRes.status !== 200) {
    console.log("Error getting form data");
  }
  
  console.log(uibuilder.parseFormData(formRes.data));
}

sampleRunThrough();
