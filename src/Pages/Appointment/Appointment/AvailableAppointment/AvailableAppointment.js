import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, {useState } from 'react';
import Loading from '../../../Shared/Loading/Loading';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';

const AvailableAppointment = ({ selectedData }) => {
    const [treatment, setTreatment] = useState(null)
    const date = format(selectedData, 'PP');
    const {data:appointmentOptions = [], refetch, isLoading} =useQuery ({
        queryKey:['appointmentOption',date],
        queryFn:()=>fetch(`http://localhost:5000/appointmentOptions?date=${date}`)
        .then(res => res.json())
    })

    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <section className='mt-16'>
            <p className='text-center font-bold text-accent'>Available Appointments on: {format(selectedData, 'PP')}</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    appointmentOptions.map(options => <AppointmentOption key={options._id}
                        appointmentOptions={options}
                        setTreatment={setTreatment}
                        
                    ></AppointmentOption>)
                }
            </div>
            {
                treatment && 
                <BookingModal
                selectedData={selectedData}
                    treatment={treatment}
                    setTreatment ={setTreatment}
                    refetch={refetch}
                ></BookingModal>
            }
        </section>
    );
};

export default AvailableAppointment;