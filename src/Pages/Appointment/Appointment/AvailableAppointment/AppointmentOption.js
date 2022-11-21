import React from 'react';

const AppointmentOption = ({appointmentOptions,setTreatment}) => {
    const {name,price,slots} = appointmentOptions
    return (
        <section>
            <div className="card  shadow-xl">
                <div className="card-body text-center mt-10">
                    <h2 className="text-accent text-4xl font-bold">{name}</h2>
                    <p>{slots.length > 0 ? slots[0] : 'Try Another day'}</p>
                    <p>{slots.length} {slots.length > 1 ?  'spaces' : 'space'}</p>
                    <p><small>Price:${price}</small></p>
                    <div className="card-actions justify-center">
                        <label htmlFor="booking-modal"
                        disabled = {slots.length === 0}
                         className="btn btn-accent text-white"
                             onClick={()=> setTreatment(appointmentOptions)}                    
                         >Book Appointment</label>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppointmentOption;