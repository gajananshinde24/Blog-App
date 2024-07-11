import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import Homepage from './pages/HomePage';
import BlogDetails from './components/BlogDetails';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import WriteBlog from './pages/WriteBlog';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';


function App() {
  return (
    <div className="App">
      <Header/>
      <main style={{ paddingTop: '80px' }} >
      <Routes>
      <Route path="/" element={<Navigate replace to="/home" />} />
          <Route index path="/home" element={<Homepage />} />
          <Route path="/search/:keyword" element={<Homepage />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path='' element={<ProtectedRoute />}>
          <Route path="/write-blog" element={<WriteBlog />} />
          </Route>
          
          {/* Add more routes as needed */}
        </Routes>
      </main>
      
      
    </div>
  );
}

export default App;
