import React from 'react';
import Container from 'react-bootstrap/Container';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import BookList from './components/BookList';
import Form from './components/Forms';
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

function App () {
  return (
    <ApolloProvider client={ client }>
      <Container className='py-3 mt-3 text-center' style={ { backgroundColor: 'lightcyan' } }>
        <h1 className='text-center text-info mb-3'>My Books</h1>
        <hr />
        <Form />
        <hr />
        <BookList />
      </Container>
    </ApolloProvider>
  )
}

export default App;
