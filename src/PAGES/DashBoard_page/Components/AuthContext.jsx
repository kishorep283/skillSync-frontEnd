// import React, { Children } from "react";
// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// const Authtext = createContext();
// const AuthContext = ({ children }) => {
//   const [userData, setUserData] = useState("");
//   let navigate = useNavigate();
//   const token = sessionStorage.getItem("token");
//   useEffect(() => {
//     let formdata = async () => {
//       // if(!token){
//       //     navigate("/");
//       //     return ;
//       // }
//       try {
//         if (token) {
//           let { data } = await axios.get("http://localhost:3002/Auth/profile", {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setUserData(data.response[0]);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     formdata();
//   }, [token, navigate]);
//   return (
//     <>
//       <Authtext.Provider value={{ userData, setUserData }}>
//         {children}
//       </Authtext.Provider>
//     </>
//   );
// };
// let useAuth = () => {
//   return useContext(Authtext);
// };
// export { AuthContext, useAuth };
