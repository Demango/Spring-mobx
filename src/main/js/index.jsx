import React from 'react';
import ReactDOM from 'react-dom';
import Main from 'components/Main';
import './index.css';
import registerServiceWorker from 'modules/registerServiceWorker';

ReactDOM.render((<Main />), document.getElementById('react'));
registerServiceWorker();
