import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Home  from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';



function App() {
  return (
    <NoteState>
      <Router>
        <Navbar/>
        <Alert typett="alert" message="hemlooooooooo"/>
        <Routes>
          <Route exect path="/" element={<Home/>}/>
          <Route exect path="/about"element={<About/>}/>
        </Routes>
      </Router>
    </NoteState>
    
  );
}

export default App;
