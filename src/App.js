import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Chat from './pages/Chat';
import Login from './pages/Login';



function App() {

  return (
    <div className="App d-flex align-items-center justify-content-center">
      <Routes>
      <Route path='/' element={<Login/>} />
      <Route path="chat/:id" element={<Chat/>} />
      </Routes>
    </div>
  );
}

export default App;
