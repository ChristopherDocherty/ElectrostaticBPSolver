import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
//import heatmap_copy from './heatmap-copy.js';
import ZoomI from './zoom-copy.js';


//console.log(heatmap_copy());

ReactDOM.render(
  <React.StrictMode>
    {ZoomI({height:800, width:800})}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
