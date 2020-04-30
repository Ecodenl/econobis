import React from 'react';
import ReactDOM from 'react-dom';
import './css/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-day-picker/lib/style.css';
import './css/webflow.css';
import './css/econobis.webflow.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'moment/locale/nl';

ReactDOM.render(<App />, document.getElementById('root'));

// Server data is set and can now removed
var serverDataScript = document.getElementById('server-data');
serverDataScript.remove();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
