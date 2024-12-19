import React from "react";
import {createBrowserRouter , createRoutesFromElements, Route, Routes, RouterProvider, Navigate} from "react-router-dom"
import GetStarted from "./pages/GetStarted";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/get-started' element={<GetStarted/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/home' element={
        <ProtectedRoute>
         <Home/>
        </ProtectedRoute>
        } 
      /> 
        {/* Catch-all route to redirect to /get-started */}
       <Route path="*" element={<Navigate to="/get-started" replace />} /> 
   </>
  )
)

const App = () => {
  return <RouterProvider router={router} />;
}

export default App;