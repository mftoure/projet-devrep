import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
//
import { FIREBASE_API } from '../config';
import axios from 'axios';

// ----------------------------------------------------------------------



const firebaseApp = initializeApp(FIREBASE_API);

const AUTH = getAuth(firebaseApp);

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === 'INITIALISE') {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }

  return state;
};

const AuthContext = createContext({
  ...initialState,
  method: 'firebase',
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [profile, setProfile] = useState(null);
  const [idToken, setIdToken] = useState(null);

  useEffect(
    () =>
      onAuthStateChanged(AUTH, async (user) => {
        if (user) {
          // faire appel à la base de données pour récupérer les infos de l'utilisateur avec son id
            const _idToken = await user.getIdToken();
            setIdToken(_idToken);
            // wait 1 sec
            await new Promise((resolve) => setTimeout(resolve, 1500));
            const res = await axios.get(process.env.HOST_API_KEY + '/api/utilisateurs/' + user.uid,{headers:{'Authorization': 'Bearer ' + _idToken}})
            console.log(idToken)
            console.log(res.data)
            setProfile(res.data);
          
          dispatch({
            type: 'INITIALISE',
            payload: { isAuthenticated: true, user },
          });
        } else {
          dispatch({
            type: 'INITIALISE',
            payload: { isAuthenticated: false, user: null },
          });
        }
      }),
    [dispatch]
  );

  const login = (email, password) => signInWithEmailAndPassword(AUTH, email, password);

const register = (nom, prenom, email, password, profession, telephone, adresse, horaires) =>
createUserWithEmailAndPassword(AUTH, email, password).then(async (res) => {

  // faire appel à la base de données pour ajouter les infos de l'utilisateur avec son id
  const idToken = await res.user.getIdToken();
  if (profession==="" && telephone==="" && adresse==="" && horaires===""){
    const resp1 = await axios.post(process.env.HOST_API_KEY + '/api/patients/', {id:res.user.uid,nom:nom,prenom:prenom,email:email, role:"patients"}, {headers:{'Authorization': 'Bearer ' + idToken}});
  }
  else{
  const resp = await axios.post(process.env.HOST_API_KEY + '/api/professionnels/', {id:res.user.uid,nom:nom,prenom:prenom,profession:profession,telephone:telephone,adresse:adresse,horaire:horaires,email:email, role:"professionnel"}, {headers:{'Authorization': 'Bearer ' + idToken}})
  }
  console.log(res.user)
});
    
  const logout = () => signOut(AUTH);

  const updateAuthHook = () => {

    const user = AUTH.currentUser;
    dispatch({
      type: 'INITIALISE',
      payload: { isAuthenticated: true, user },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'firebase',
        user: profile,
        login,
        register,
        idToken,
        logout,
        updateAuthHook,
        AUTH,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
