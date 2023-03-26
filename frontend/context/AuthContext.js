import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    function login(username, password) {
        setIsLoading(true);
        axios.post(BASE_URL + '/login', {
            "username": username,
            "password": password
        }).then(res => {
            let curUser = res.data;

            setUserInfo(curUser.user);
            setUserToken(curUser.token);
            // console.log(curUser.token);
            // console.log(curUser.token);


            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            // AsyncStorage.setItem('userToken', userToken);

        }).catch(e => {
            console.log("Login Error" + e);
        });

        setIsLoading(false);
    }

    function logout() {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userToken');
        setIsLoading(false);
    }

    async function isLoggedIn() {
        try {
            setIsLoading(true);
            let token = await AsyncStorage.getItem('userToken');
            setUserToken(token);

            setIsLoading(false);
        } catch (e) {
            console.log(`isLoggedIn error $(e)`);
        }
    }

    useEffect(() => {
        isLoggedIn();
        // console.log(userToken);
    }, []);

    //For some reason, userToken gets updated asynchronously, will not work in axios call.
    useEffect(() => {
        if (userToken) {
            AsyncStorage.setItem('userToken', userToken);
        }
    }, [userToken]);

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
            {children}
        </AuthContext.Provider>
    );
};
