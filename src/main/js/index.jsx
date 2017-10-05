import React from 'react';
import ReactDOM from 'react-dom';
import Main from 'components/Main';
import { useStrict } from 'mobx';
import './index.css';
import registerServiceWorker from 'modules/registerServiceWorker';

useStrict(true);

ReactDOM.render((<Main />), document.getElementById('react'));
registerServiceWorker();
