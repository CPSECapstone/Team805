import React, {Component} from 'react';
import SampleFlow from './SampleFlow/SampleFlow';
import uibuilder from './uibuilder.js';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './Login/Login';
import Registration from './Registration/Registration';
import Homepage from './Homepage/Homepage';
import PrivateRoute from './CustomRoutes/PrivateRoute';
import PublicRoute from './CustomRoutes/PublicRoute';
import Landing from './Homepage/Landing';

/** Main App Component */
class App extends Component {
  /**
   *
   *
   * @return {*} The main application
   * @memberof App
   */
  render() {
    return (
      <BrowserRouter>
        <Route exact path='/' component = {Landing}/>
        <PrivateRoute path='/home' component = {Homepage}/>
        <PrivateRoute path='/sampleflow' component = {BuiltSampleFlow}/>
        <PublicRoute restricted={true} exact path='/login' component={Login}/>
        <PublicRoute restricted={false} exact path='/register'
          component={Registration}/>
        <PublicRoute restricted={false} exact path='/public'
          component={ExamplePublicPage}/>
      </BrowserRouter>
    );
  }
}

const ExamplePublicPage = () => {
  return <h2>This is a public page!</h2>;
};

/** Creates a SampleFlow with props passed in.
 *
 * @return {*} A SampleFlow component that uses the UI Builder
 * vendor APIs to generate a form through props.
 */
const BuiltSampleFlow = () => {
  return <SampleFlow
    loginPost={uibuilder.loginPost}
    getFormData={uibuilder.getFormData}
    formPost={uibuilder.formPost}
  />;
};

export default App;
