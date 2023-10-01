import 'react-native-get-random-values';
import React, { useEffect } from 'react';
import Parse from 'parse/react-native';
import Navigation from './Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Parse before rendering the app
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('Ac0Gd56taUyJq0RaQeroXLerpAhPGZVEsrBewuXB', 'lcUW1Yxoby7moIJm2jLHfc30VAHg0nIKSljw6MsG');
Parse.serverURL = 'https://parseapi.back4app.com/';

function App() {
  useEffect(() => {
    // Any code that depends on Parse can be placed here

    // Example: Query Parse data
    const query = new Parse.Query('YourParseClassName');
    query.find().then((results) => {
      // Handle the query results here
      console.log('Parse Query Results:', results);
    }).catch((error) => {
      console.error('Parse Query Error:', error);
    });
  }, []);

  return <Navigation />;
}

export default App;
