
import React, { Children } from "react";
import { Button } from "@/components/ui/button";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import { useAppStore } from "./store";

const PrivateRoute = ({children})=> { 
  const {userInfo} = useAppStore();  // Get userInfo from Zustand store
  const isAuthenticated = !!userInfo; // Check if user is authenticated (if userInfo is not null or undefined)
  return isAuthenticated ? children : <Navigate to="/auth"/> // If authenticated, render children (protected content), otherwise redirect to /auth
}

const AuthRoute = ({children})=> {
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat"/> : children; // If authenticated, redirect to chat page, otherwise show auth page
  //chat and profile are protected
}

const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthRoute><Auth/></AuthRoute>}/>
        <Route path="/chat" element={<PrivateRoute><Chat/></PrivateRoute>}/>   
        <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>

        <Route path="*" element={<Navigate to="/auth"/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;