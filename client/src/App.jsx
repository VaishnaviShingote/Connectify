
import React, { Children, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import { useAppStore } from "./store";
import { apiClient } from "./lib/api-client";
import { GET_USER_INFO } from "./utils/constants";

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
  const {userInfo,setUserInfo}=useAppStore();
  const[ loading, setLoading ]=useState(true);

  useEffect(()=>{
    const getUserData = async () =>{
      try{
        const res= await apiClient.get(GET_USER_INFO,{
          withCredentials: true,
        });
        if(res.status === 200 && res.data.id){
          setUserInfo(res.data);
        } else{
          setUserInfo(undefined);
        }
        console.log({res});
      }catch(error){
        setUserInfo(undefined);
      }finally{
        setLoading(false);
      }
    };
    if(!userInfo){
      getUserData();
    }else{
      setLoading(false);
    }
  },[userInfo,setUserInfo]); //loads effect only if userInfo is present
   
  if(loading){
    return <div>Loading...</div>
  }
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