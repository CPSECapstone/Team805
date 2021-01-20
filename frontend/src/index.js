import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as uibuilder from './uibuilder';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
      <App
        loginPost={uibuilder.loginPost}
        getFormData={uibuilder.getFormData}
        formPost={uibuilder.formPost}/>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
