import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Sidebar from './Sidebar.js';
import CircleCard from './Cards/CircleCard.js'

//console.log(heatmap_copy());

ReactDOM.render(
  <React.StrictMode>
    {
      <Sidebar/>
    }
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
