import React from 'react';
import fluoride from '../../../assets/images/fluoride.png';
import cavity from '../../../assets/images/cavity.png';
import whitening   from '../../../assets/images/whitening.png';
import Service from './Service';

const Services = () => {
    const servicesData = [
        {
            id:1,
            name:'Fluoride Treatment',
           description:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ea ratione quae, quia veniam quibusdam est repellendus possimus optio aut.',
           image: fluoride
        },
        {
            id:2,
            name:'Cavity Filling',
           description:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ea ratione quae, quia veniam quibusdam est repellendus possimus optio aut.',
           image: cavity 
        },
        {
            id:3 ,
            name:'Teeth Whitening',
           description:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ea ratione quae, quia veniam quibusdam est repellendus possimus optio aut.',
           image: whitening
        },
    ]
    return (
        <div className='mt-16'>
            <div className='text-center'>
                <h3 className='text-xl font-bold text-primary uppercase'>Our Services</h3>
                <h2 className='text-4xl'>Services We Provide</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                    servicesData.map(data => <Service key={data.id}
                    data={data}></Service>)
                }
            </div>
        </div>
    );
};

export default Services;