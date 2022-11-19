import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';

const MyAppointment = () => {
    const {user} = useContext(AuthContext);

    const {data: bookings = []} = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: () => fetch(`http://localhost:5000/bookings?email=${user?.email}`,{
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
                        </tr>
                    </thead>
                    <tbody>
                       {

                        bookings &&
                        bookings?.map((book, i) =>  <tr key={book._id}>
                            <th>{i+1}</th>
                            <td>{book.patient}</td>
                            <td>{book.treatment}</td>
                            <td>{book.appointmentData}</td>
                            <td>{book.slot}</td>                      
                        </tr> )
                       }                                          
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointment;