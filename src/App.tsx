import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import TeacherDashboard from './pages/dashboards/TeacherDashboard';
import GuardianDashboard from './pages/dashboards/GuardianDashboard';
import LessonView from './pages/lessons/LessonView';
import LessonsList from './pages/lessons/LessonsList';
import LessonEdit from './pages/lessons/LessonEdit';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            
            {/* Student Routes */}
            <Route 
              path="student/*" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Routes>
                    <Route index element={<StudentDashboard />} />
                    <Route path="lessons" element={<LessonsList userRole="student" />} />
                    <Route path="lessons/:lessonId" element={<LessonView />} />
                  </Routes>
                </ProtectedRoute>
              } 
            />
            
            {/* Teacher Routes */}
            <Route 
              path="teacher/*" 
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <Routes>
                    <Route index element={<TeacherDashboard />} />
                    <Route path="lessons" element={<LessonsList userRole="teacher" />} />
                    <Route path="lessons/create" element={<LessonEdit mode="create" />} />
                    <Route path="lessons/:lessonId" element={<LessonView />} />
                    <Route path="lessons/:lessonId/edit" element={<LessonEdit mode="edit" />} />
                  </Routes>
                </ProtectedRoute>
              } 
            />
            
            {/* Guardian Routes */}
            <Route 
              path="guardian/*" 
              element={
                <ProtectedRoute allowedRoles={['guardian']}>
                  <Routes>
                    <Route index element={<GuardianDashboard />} />
                    <Route path="progress" element={<LessonsList userRole="guardian" />} />
                  </Routes>
                </ProtectedRoute>
              } 
            />
            
            {/* Fallback route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;