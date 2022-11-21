

import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import AddDoctors from "../../Pages/Dashbord/AddDoctors/AddDoctors";
import AllUser from "../../Pages/Dashbord/AllUser/AllUser";
import Payment from "../../Pages/Dashbord/Dashbord/Payment/Payment";
import ManageDoctors from "../../Pages/Dashbord/ManageDoctors/ManageDoctors";
import MyAppointment from "../../Pages/Dashbord/MayAppointment/MyAppointment";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import SingUp from "../../Pages/Sing Up/SingUp";
import AdminRoutes from "../AdminRoutes/AdminRoutes";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";

 export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        errorElement:<DisplayError></DisplayError>,
        children: [
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/singUp',
                element:<SingUp></SingUp>
            },
            {
                path:'/appointment',
                element:<Appointment></Appointment>
            }
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
        errorElement:<DisplayError></DisplayError>,
        children:[
            {
                path:'/dashboard',
                element:<MyAppointment></MyAppointment>
            },
            {
                path:'/dashboard/alluser',
                element:<AdminRoutes><AllUser></AllUser></AdminRoutes>
            },
            {
                path:'/dashboard/adddoctors',
                element:<AdminRoutes><AddDoctors></AddDoctors></AdminRoutes>
            },
            {
                path:'/dashboard/managedoctors',
                element:<AdminRoutes><ManageDoctors></ManageDoctors></AdminRoutes>
            },
            {
                path:'/dashboard/payment/:id',
                element:<AdminRoutes><Payment></Payment></AdminRoutes>,
                loader:({params})=> fetch(`http://localhost:5000/bookings/${params.id}`)
            }
        ]
    }
 ])