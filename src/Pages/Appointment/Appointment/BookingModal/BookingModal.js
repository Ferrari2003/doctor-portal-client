import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../Context/AuthProvider';

const BookingModal = ({ treatment,setTreatment, selectedData,refetch }) => {
    const { name: treatmentName,slots } = treatment;
    const date = format(selectedData, 'PP');
    const {user} = useContext(AuthContext);

    const handleBooking = (event) => {
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        // [3,4,5].map
        const booking = {
            appointmentData: date,
            treatment: treatmentName,
           patient: name,
            slot,
            email,
            phone
        }
       fetch('http://localhost:5000/bookings', {
        method:'POST',
        headers: {
            'content-type': 'application/json'
        },
        body:JSON.stringify(booking)
       })
       .then(res => res.json())
       .then(data => {
        console.log(data);
        if(data.acknowledged){
            setTreatment(null)
            toast.success('Booking confirmed')
            refetch();
        }
        else{
            toast.error(data.message);
        }
        
       })
        
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{treatmentName}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-10'>
                        <input type="text" disabled value={date} placeholder="Type here" className="input w-full input-bordered" />
                        <select name='slot' className="select select-bordered w-full ">
                            
                           {
                            slots.map((slot,i) => <option value={slot}
                            key={i}
                            >{slot}</option>)
                           }
                        </select>
                        <input name='name' type="text" defaultValue={user?.displayName} disabled placeholder="Your Name" className="input w-full input-bordered" />
                        <input name='email' type="email"  defaultValue={user?.email} disabled placeholder="Email Address" className="input w-full input-bordered" />
                        <input name='phone' type="text" placeholder="Phone Number" className="input w-full input-bordered" />
                        <br />
                        <input className='btn btn-accent w-full ' type="submit" value="submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;