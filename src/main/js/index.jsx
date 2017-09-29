import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import './index.css';
import registerServiceWorker from './scripts/registerServiceWorker';

ReactDOM.render((<Main />), document.getElementById('root'));
registerServiceWorker();
