//egy komponens, ami csak a gyerek komponenseit rendereli le
import React, { useEffect } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../providers/auth";

//speciális props-t kap
const Protected = ({ children }) => {
    const { token, user } = useAuth(); //nem a storageből szedjük, mert nem reaktív, csak így tud rá reagálni
    const location = useLocation();
    console.log(location);
    /*
    const navigate = useNavigate();
    //ezt az egész useEffectet a ternaryban oldottuk meg, inkább úgy használni
    useEffect(() => {
        console.log("induli");
        if (!token) {
            return navigate('/') //mert akkor itt kiszáll, ha nincs token
        }
        if (!user.userId) {
            return navigate('/register') //ha van token, akkor elér ide és itt megvizsgáljuk van-e userId, és ha nincs, akkor navigate a regre
        }
        console.log("tovább", user);
        // eslint-disable-next-line
    }, [token, user])//ha változik a token, renderelje újra, mert kijelentkezéskor nem dob ki a profilról, ami amúgy protected!!!!!
    */

    return (
        <>
            {/* <React.Fragment>{children}</React.Fragment> */}
            {!token ? (
                <Navigate to={"/"} />
            ) : !user.userId && location.pathname !== "/register" ? (
                <Navigate to={"/register"} />
            ) : (
                children
            )}

            {/* {children} */}
        </>
    )
}

export default Protected
///////////////////////////////////////////////////////////

// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../providers/auth';

// const Protected = ({ children }) => {
//     const {token, user} = useAuth();
//     const navigate = useNavigate();
  
//     useEffect(() => {
//       console.log('token:' + token);
//         if (!token) {
//           return navigate('/');
//         }
//         if (!user.userId) {
//           return navigate('/register');
//         }
        
//       }, [token, user])
      
//       return (
//         // {!token ? (
//         //   <Navigate to={'/'}/>
//         // ) : !user.userId && location.pathname !== '/register' ? (
//         //   <Navigate to={'register'}/>
//         // ) : (
//         //   children
//         // )}
//           // <React.Fragment>
//           //   {!token ? (
//           //     <Navigate to={"/"} />
//           //   ) : !user.userId && location.pathname !== "/register" ? (
//           //     <Navigate to={"/register"} />
//           //   ) : (
//           //     children
//           //   )}
//           // </React.Fragment>
//         // );
//     <React.Fragment>{children}</React.Fragment> // Itt lehetne <div></div> is a React.Fragment helyett.
//   )
// }

// export default Protected