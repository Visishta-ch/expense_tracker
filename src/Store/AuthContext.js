import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  userMail: () => {},
  mail:''
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [mail, setMail] = useState('');

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    console.log('token', token);
    localStorage.setItem('tokenID', token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('tokenID');
  };
  const userMailHandler = (mail)=> {
      console.log('user mail logged', mail);
      setMail(mail);
      return mail;
  }

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    userMail:userMailHandler,
    mail:mail
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;