import logo from './logo.svg';
import './App.css';
import { useQuery, gql } from '@apollo/client';
import { useEffect } from 'react';

function App() {


  const GET_BOOKS = gql`
  query GetBooks {
    books {
      id,
      name,
      authors{
        name
      }
    }
  }
`;




const { loading, error, data } = useQuery(GET_BOOKS);
  console.log(data)


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
