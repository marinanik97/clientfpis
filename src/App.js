import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Menu from "./pages/Menu";
import CreateReport from "./pages/CreateReport";
import CreateType from "./pages/CreateType";
import Home from "./pages/Home";
import LogOut from "./pages/LogOut";
import LogIn from "./pages/LogIn";
import Moja from "./pages/Moja";
import Card  from "./pages/Card";
import DrawerFP from "./components/DrawerFP";
import AuthContext from "./contexts/auth/AuthContext";
import ReportList from "./pages/ReportList";
function App() {
    const {getToken} = AuthContext();

  const fetchData = () => {
    fetch("http://localhost:9000/tipovi")
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  useEffect(() => {
    fetchData();
  });

  //poslednja fja koja ce se pozvati
  // componentDidMount(){
  //   fetchData();
  // }

  return(
          getToken ?
              <DrawerFP>
                  <Route exact path="/reports" component={ReportList} />
                  <Route exact path="/report" component={CreateReport} />
                  <Route exact path="/types" component={CreateType} />
                  <Route exact path="/card" component={Card} />

              </DrawerFP>
              :
              <LogIn/>
  );

//   return (
//     <Router>
//       <div>
//         <Menu />
//         {/* <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/about">About</Link>
//             </li>
//             <li>
//               <Link to="/users">Users</Link>
//             </li>
//           </ul>
//         </nav> */}
//
//         <Switch>
//         <Route path="/moja">
//             <Moja />
//           </Route>
//           <Route path="/createtype">
//             <CreateType />
//           </Route>
//           <Route path="/createreport">
//             <CreateReport />
//           </Route>
//           <Route path="/logout">
//             <LogOut />
//           </Route>
//           <Route path="/login">
//             <LogIn />
//           </Route>
//           {/* <Route path="/card">
//   {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
// </Route> */}
//           <Route path="/card">
//             <Card />
//           </Route>
//           <Route path="/">
//             <Home />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
}

export default App;
