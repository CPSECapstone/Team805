import React, {Component} from 'react';
import SampleFlow from './SampleFlow/SampleFlow';
import uibuilder from './uibuilder.js';
import {BrowserRouter, Redirect, Switch} from 'react-router-dom';
import Login from './Login/Login';
import Registration from './Registration/Registration';
import Homepage from './Homepage/Homepage';
import PrivateRoute from './CustomRoutes/PrivateRoute';
import PublicRoute from './CustomRoutes/PublicRoute';
import Landing from './Homepage/Landing';
import VendorMarketplace from './VendorMarketplace/VendorMarketplace';

import Profile from './Profile/Profile';
import _404 from './404/404';

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
        <Switch>
          <PublicRoute restricted={true} exact path='/' component = {Landing}/>
          <PrivateRoute path='/home' component = {Homepage}/>
          <PrivateRoute path='/sampleflow' component = {BuiltSampleFlow}/>
          <PublicRoute restricted={true} path='/login' component={Login}/>
          <PublicRoute restricted={true} path='/register'
            component={Registration}/>
          <PrivateRoute path='/market'
            component={VendorMarketplace}/>
          <PrivateRoute exact path='/profile' component = {Profile}/>
          <PublicRoute restricted={false} path='/404' component = {_404}/>
          <Redirect to='/404' />
        </Switch>
      </BrowserRouter>
    );
  }
}

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
