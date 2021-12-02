import React, {useContext} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from "./context/auth-context";

const App = () => {
    const ctx = useContext(AuthContext);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    // const loginHandler = (email, password) => {
    //     // We should of course check email and password
    //     // But it's just a dummy/ demo anyways
    //     setIsLoggedIn(true);
    //     localStorage.setItem('isLoggedIn', 'true');
    //
    // };
    // useEffect(() => {
    //     const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    //     if (loggedIn)
    //         setIsLoggedIn(loggedIn);
    // }, [isLoggedIn])
    //
    // const logoutHandler = () => {
    //     localStorage.removeItem('isLoggedIn');
    //     setIsLoggedIn(false);
    // };

    return (
       <React.Fragment>
            <MainHeader/>
            <main>
                {!ctx.isLoggedIn && <Login/>}
                {ctx.isLoggedIn && <Home/>}
            </main>
       </React.Fragment>
    );
}

export default App;
