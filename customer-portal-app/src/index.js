import React from 'react';
import { createRoot } from 'react-dom/client';
import './css/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-day-picker/lib/style.css';
import './css/webflow.css';
import './css/econobis.webflow.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'moment/locale/nl';

// ReactDOM.render(<App />, document.getElementById('root'));
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

// Server data is set and can now removed
var serverDataScript = document.getElementById('server-data');
serverDataScript.remove();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
