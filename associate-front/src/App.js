import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Container from 'react-bootstrap/Container';

import Main from './pages/Main'
import ExperimentRun from './pages/ExperimentRun'
import Experiment from './pages/Experiment'
import Experiments from './pages/Experiments'
import Navibar from './components/Navibar'
import Bar from './components/Bar'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import Profile from './pages/Profile'

function App() {
  return (
    <>
    <Router>
      <Container  style={{ width: '100%'}}>
        <Navibar/>
        <Routes>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/experiments" element={<Experiments/>}></Route>
          <Route path="/experiments/:id" element={<Experiment/>}></Route>
          <Route path="/experiments/run/:id" element={<ExperimentRun/>}></Route>
        </Routes>
      </Container>
    </Router>
    </>
  );
}

export default App;
