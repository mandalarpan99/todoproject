import { createContext, useContext, useEffect, useState } from "react";


export const Authcontext = createContext();

export const AuthProvider = ({children})=>{
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setuser]=useState("");
    const [service, setService] = useState("");
    const authorizatioToken = `Bearer ${token}`;

    
    const storeTokenInLS = (serverToken)=>{
        setToken(serverToken);
        return localStorage.setItem("token",serverToken);
    }


    let isLoggedIn = !!token;
    console.log(isLoggedIn);
    //Logout
    const LogoutUser = ()=>{
        setToken("");
        return localStorage.removeItem("token");
    }


    //JWT Authnetication
    const userAuthentication = async ()=>{
        try {
            const response = await fetch("http://localhost:5000/api/auth/user", {
                method: "GET",
                headers:{
                    Authorization: authorizatioToken, 
                }
            });
            if(response.ok){
                const data = await response.json();
                console.log("user data", data.userData);
                setuser(data.userData);
            }
        } catch (error) {
            console.error("Error when fetching user data");
        }
    };


    const serviceData = async ()=>{
        try {
            const response = await fetch("http://localhost:5000/api/data/service",{
            method: "GET"
        });
        if(response.ok){
            const sData = await response.json();
            console.log(sData.msg);
            setService(sData.msg);
        }
        } catch (error) {
            console.log(`Error from service ${error}`);
        }
    }


    
    useEffect(()=>{
        serviceData();
        userAuthentication();
        
    },[]);

    return (
        <Authcontext.Provider value={{storeTokenInLS, LogoutUser, isLoggedIn, user, service, token, authorizatioToken}}>
            {children}
        </Authcontext.Provider>
    )
}


export const useAuth =()=>{
    const authContextvalue = useContext(Authcontext);
    if(!authContextvalue){
        throw new Error("useAuth used outside of the provider");
    }
    return authContextvalue;
}