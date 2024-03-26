

// index.js (or wherever you set up your main React app)
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { contactReducer } from './reducers';

const store = createStore(contactReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);





