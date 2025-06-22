import { Outlet } from "react-router-dom"
import Navbar from "./NavBar"
import Footer from "./Footer";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import axios from "axios";
const Body = () =>{
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    async function fetchUser() {
        if (currentUser !== null) return;
        try {
            const res = await axios.get(BASE_URL + '/profile',{
                withCredentials: true
            })
            dispatch(addUser(res.data.data));
        } catch (error) {
            if (error.status == 401) {
                //navigate("/login");
            }
        }
    };
    useEffect(()=>{
        fetchUser()
    },[]);
    return (
    <div>
        <Navbar/>
        <Outlet/>  
        <Footer />
    </div>
    );
}

export default Body;