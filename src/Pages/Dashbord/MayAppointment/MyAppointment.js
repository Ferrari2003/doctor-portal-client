import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const MyAppointment = () => {
    const { user } = useContext(AuthContext);

    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: () => fetch(`http://localhost:5000/bookings?email=${user?.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
    })


    return (
        <div>
            <h2 className='text-4xl mb-5'>My Appointment</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>$Amount</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            bookings &&
                            bookings?.map((booking, i) => <tr key={booking._id}>
                                <th>{i + 1}</th>
                                <td>{booking.patient}</td>
                               <td>{booking.treatment}</td>                             
                                <td>{booking.appointmentData}</td>                               
                                <td>{booking.slot}</td>
                                <td>{booking.price}</td>
                                <td>
                                    {
                                        booking.price && !booking.paid && <Link 
                                        to={`/dashboard/payment/${booking._id}`}>
                                            <button
                                                className='btn btn-accent btn-sm'
                                            >Pay</button></Link>
                                    }
                                    {
                                        booking.price && booking.paid && <span className='text-primary'>Paid</span>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointment;