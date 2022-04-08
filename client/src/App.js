import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <div >
      <Routes>
        <Route  path= '/' element= {<Home/>}/>
      </Routes>
      
    </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
