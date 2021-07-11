import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import RouteManager from './components/RouteManager'
import DataContext from './components/DataContext'

function App() {
  return (
    <div className="App">
      <DataContext>
       <Router>
      <RouteManager/>
      </Router>
      </DataContext>
    </div>
  );
}

export default App;
