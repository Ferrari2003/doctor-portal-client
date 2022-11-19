import React from 'react';
import chair from '../../../../assets/images/chair.png';
import back from '../../../../assets/images/bg.png'
import { DayPicker } from 'react-day-picker';


const AppointmentBanner = ({selectedData, setSelectedData}) => {

    return (
        <header className='my-6'
        style={{
            background:`url(${back})`
        }}>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={chair} alt='dentist chair' className="max-w-sm rounded-lg shadow-2xl" />
                    <div className='mr-6'>
                        <DayPicker
                        mode='single'
                        selected={selectedData}
                        onSelect={(data)=>{
                            if(data){
                                setSelectedData(data)
                            }
                        }}
                        />
                        
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppointmentBanner;