import React,{useState} from 'react';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Login from './pages/login';
import Chat from './pages/chat';

function App() {
  const [user, setUser] = useState(window.localStorage.getItem('user'));

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login setUser={setUser}/>}/>
          <Route path='/chat' element={user != null ? <Chat/> : <Navigate to="/"/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
