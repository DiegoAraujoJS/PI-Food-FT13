import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route} from 'react-router-dom'
import Form from './components/Form.jsx';
import Home from './components/Home.jsx';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import reducer from './reducer'
import thunkMiddleware from 'redux-thunk'



const store = createStore(reducer,
  compose(
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
   applyMiddleware(thunkMiddleware)))


ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter >
  <React.StrictMode>
    <Route path='/app' component={App}/>
    <Route path='/form' component={Form} />
    <Route exact path ='/' component={Home} />

    
  </React.StrictMode>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
