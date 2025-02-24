import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css'
import { Routes } from "react-router-dom";
import LandingPage from "./PAGES/MainPage/LandingPage";
// import Filters_page from './Filters/Skills_filter'
import Full_page from "./PAGES/All_Mentors_Page/Full_page";
import { Route } from "react-router-dom";
import Profile from "./PAGES/Profile_page/Profile";
import Header from "./PAGES/MainPage/Header/header";
function App() {
  return (
    <>
      <LandingPage />
      <Routes>
        <Route path="/mentor/browse" element={<Full_page />} />
        <Route path="/mentor/:query_id" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
