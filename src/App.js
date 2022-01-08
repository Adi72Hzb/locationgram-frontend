import React ,{ useState , useCallback } from 'react';
import { BrowserRouter as Router , Route, Routes , Navigate } from 'react-router-dom';

import NewPlace from './places/pages/NewPlace';
import Users from './users/pages/Users';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './users/pages/Auth';
import { AuthContext } from './shared/context/auth-context';

const App = () => {
  const [isLoggedIn , setIsLoggedIn] = useState(false);
  const [userId , setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if(isLoggedIn){
    routes =(
      <>
        <Route path="/" element={<Users/>} exact/>
        <Route path="/:userId/places" element ={<UserPlaces/>} exact/>
        <Route path="/places/new" element={<NewPlace/>} exact/>
        <Route path="/places/:placeId" element={<UpdatePlace/>}></Route>
        <Route path="*" element={<Navigate replace to="/"/>}/>
      </>
    );
  }else{
    routes = (
      <>
        <Route path="/" element={<Users/>} exact/>
        <Route path="/:userId/places" element ={<UserPlaces/>} exact/>
        <Route path="/auth" element={<Auth/>}></Route>
        <Route path="*" element={<Navigate replace to="/"/>}/>
      </>
    );
  }

  return (
    <AuthContext.Provider value={{isLoggedIn : isLoggedIn , userId :userId , login : login , logout:logout}}>
        <Router>
        <MainNavigation/>
      <main>
        <Routes>
          {routes}
        </Routes>
      </main>
    </Router>
    </AuthContext.Provider>
  
  );
};

export default App;
