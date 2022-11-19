import React from 'react';
import bg from '../../../../assets/images/appointment.png'



const ContactUs = () => {
    return (
        <section className='p-20 grid grid-cols mb-16' style={{
            background: `url(${bg})`
        }}>
            <div className="w-full">
                <h3 className='text-center text-accent font-semibold text-xl'>Contact Us</h3>
                <h1 className='text-center mb-7 text-5xl text-white'>Stay connected with us</h1>
                <div className="w-3/4 mx-auto flex justify-center">
                    <form  className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-200">
                        <div className="card-body">
                            <div className="form-control flex">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                
                                <input
                                    type="text"
                                    name='name'
                                    placeholder="name"
                                    required
                                    className="input input-bordered p-8"
                                />
                            </div>
                            <div className="form-control flex">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                               
                                <input
                                    type="email"
                                    name='email'
                                    placeholder="email"
                                    required
                                    className="input input-bordered p-8 mt-1"
                                />
                            </div>
                            <div className="form-control flex">
                                <label className="label">
                                    <span className="label-text">Number</span>
                                </label>
                               
                                <input
                                    type="number"
                                    name="number"
                                    placeholder="number"
                                    required
                                    className="input input-bordered p-8"
                                />
                            </div>
                            <div className="text-center flex">

                                <textarea
                                    className="textarea textarea-primary  p-8 w-full mt-3"
                                    name='message'
                                    placeholder="message"
                                    required
                                ></textarea>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Submit</button>
                            </div>
                        </div >
                    </form>
                    {/* end : review add form */}
                </div>
            </div>
        </section>
    );
};

export default ContactUs;