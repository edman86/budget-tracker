import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from './context/context';

import { SpeechProvider } from '@speechly/react-client'

ReactDOM.render(
  <React.StrictMode>
    <SpeechProvider appId="03a5d0b2-70a0-4e3f-b2cb-a0d2119ecd98" language="en-US">
      <Provider>
        <App />
      </Provider>
    </SpeechProvider>  
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
