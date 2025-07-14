import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut,updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { app } from "../Firebase/Firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";
export const AuthContext=createContext(null)
const auth=getAuth(app)
console.log(auth);
const AuthProvider=({children})=>{
   const [user,setUser]=useState(null);
   const [isLoading,setLoading]=useState(true);
   const axiosPublic=useAxiosPublic()
   const googleProvider = new GoogleAuthProvider();
      const createUser=(email,password)=>{
         setLoading(true);
         return createUserWithEmailAndPassword(auth,email,password)
      }
      const signIn=(email,password)=>{
         setLoading(true);
         return signInWithEmailAndPassword(auth,email,password)
      }
      const logOut=()=>{
         setLoading(true);
         return signOut(auth)
      }
      const updateUserProfile=(name,photo)=>{
         return updateProfile(auth.currentUser,{
            displayName:name,
            photoURL:photo,

         })
      }
      const googleSignIn=()=>{
         setLoading(true);
         return signInWithPopup(auth,googleProvider)

      }
      useEffect(()=>{
      const unSubscribe=onAuthStateChanged(auth,currentUser=>{
         setUser(currentUser);
         if(currentUser){
            //get toten and store client
            const userInfo={email:currentUser.email}
            axiosPublic.post('/jwt',userInfo)
            .then(res=>{
               if(res.data.token){
                  localStorage.setItem('access-token',res.data.token)
               }
            })
         }
         else{
            //remove token (if token stored in the client side :local storage)
            localStorage.removeItem('access-token')
         }
         setLoading(false)
      })
      return()=>{
         return unSubscribe()
      }
   },[axiosPublic])
   const userInfo={
      user,
      isLoading,
      createUser,
      signIn,
      logOut,
      updateUserProfile,
      googleSignIn
      
   }
   return(
      <AuthContext.Provider value={userInfo}>
         {children}
      </AuthContext.Provider>
   )

}
export default AuthProvider