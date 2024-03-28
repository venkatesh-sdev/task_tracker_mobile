import { Provider } from 'react-redux';

import store from './src/context/store'
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/Navigation';

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </NavigationContainer>
  );
}



