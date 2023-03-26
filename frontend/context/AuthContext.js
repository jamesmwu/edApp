import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    function register(username, password, name) {
        setIsLoading(true);
        axios.post(BASE_URL + '/users/new', {
            "username": username,
            "password": password,
            "name": name,
            "streak": 0
        }).then(res => {
            login(username, password);
        }).catch(e => {
            console.log("Register Error" + e);
        });

        setIsLoading(false);
    }

    function login(username, password) {
        setIsLoading(true);
        axios.post(BASE_URL + '/login', {
            "username": username,
            "password": password
        }).then(res => {
            let curUser = res.data;

            setUserInfo(curUser.user);
            setUserToken(curUser.token);

            //Make sure to user "curUser" for these, since async.
            AsyncStorage.setItem('userInfo', JSON.stringify(curUser.user));
            AsyncStorage.setItem('userToken', curUser.token);

        }).catch(e => {
            console.log("Login Error" + e);
        });

        setIsLoading(false);
    }

    function logout() {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('userInfo');
        setIsLoading(false);
    }

    async function isLoggedIn() {
        try {
            setIsLoading(true);
            let token = await AsyncStorage.getItem('userToken');
            let info = await AsyncStorage.getItem('userInfo');

            if (info) {
                setUserToken(token);
                setUserInfo(JSON.parse(info));
            }

            setIsLoading(false);
        } catch (e) {
            console.log(`isLoggedIn error $(e)`);
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ register, login, logout, isLoading, userToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
