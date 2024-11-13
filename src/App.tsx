import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Main from './components/main/Main';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main/*" element={<Main />} />
    </Routes>
  );
}

export default App;
