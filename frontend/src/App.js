import React, {Component} from 'react';
import SampleFlow from './SampleFlow/SampleFlow';
import uibuilder from './uibuilder.js';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './Login/Login';

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
        <Route exact path='/' component = {BuiltSampleFlow}/>
        <Route exact path='/login' component = {Login}/>
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
  />;
};

export default App;
