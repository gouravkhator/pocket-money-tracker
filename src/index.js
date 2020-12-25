import './style';
import App from './components/app';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';

const store = createStore(reducer);

export default () => (
    <div>
        <Provider store={store}>
            <App />
        </Provider>
    </div>
);
