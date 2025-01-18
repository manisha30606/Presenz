import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from "react-router-dom";
import Front from './Router/Front';
import StudentLogin from './Router/StudentLogin';
import StudentSignUp from './Router/StudentSignUp';
import Home from './Router/Home';
import './App.css'
import TeacherLogin from './Router/TeacherLogin';
import TeacherSignUp from './Router/TeacherSignup';
import StudentDash from './Router/StudentDash';
import TeacherDash from './Router/TeacherDash';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Routes>
                {/* General Routes */}
                <Route path="/" element={<Front />} />
                <Route path='/Home' element={<Home />} />

                <Route path="/StudentLogin" element={<StudentLogin />} />
                <Route path="/StudentSignUp" element={<StudentSignUp />} />
                <Route path="/StudentDash" element={<StudentDash />} />

                {/* Admin Routes */}
                <Route path="/TeacherLogin" element={<TeacherLogin />} />
                <Route path="/TeacherSignUp" element={<TeacherSignUp />} />
                <Route path="/TeacherDash" element={<TeacherDash/>} />

               
      </Routes>
    </div>
  )
}

export default App
