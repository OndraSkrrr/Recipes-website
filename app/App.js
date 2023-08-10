import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Create from './pages/Create';
import Register from './pages/Register';
import Login from './pages/Login';
import AllRecepies from './pages/AllRecepies';
import OneRecepie from './pages/OneRecepie';
import Update from './pages/Update';

import {UserContextProvider} from "./UserContext";
import { Edit } from '@mui/icons-material';





export default function App() {

  return (

    <div className="app-body">
        <UserContextProvider>
        <Router>
        <Navbar />
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="/create" Component={Create} />
                <Route path="/allRecepies" Component={AllRecepies} />
                <Route path="/register" Component={Register} />
                <Route path="/login" Component={Login} />
                <Route path="/recipie/:id" Component={OneRecepie} />
                <Route path="/update/:id" Component={Update} />
            </Routes>
        </Router>
        <Footer />
        </UserContextProvider>
    </div>

  );
}
