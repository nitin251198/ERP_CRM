import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import App from './App.tsx'
import './index.css'
import { Toaster } from 'react-hot-toast';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Create an Apollo Client instance
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql', // Replace with your actual GraphQL endpoint
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('authToken') || '',
  },
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <div>
        <Toaster />
        <ApolloProvider client={client}>
        <App />
        </ApolloProvider>

      </div>
    </Provider>
  </React.StrictMode>
)
