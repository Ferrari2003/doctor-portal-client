import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmanionModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null)

    const closeModal = () => {
        setDeletingDoctor(null);
    }

    const { data: doctors, isLoading, refetch = [] } = useQuery({
        queryKey: ['doctors'],
        queryFn: () => fetch(`http://localhost:5000/doctors`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .catch(error => console.log(error))
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    const handleDeleteDoctor = doctor => {
        console.log(doctor._id)
        fetch(`http://localhost:5000/doctors/${doctor._id}`, { 
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if(data.deletedCount > 0){
                    refetch();
                    toast.success(`Doctor ${doctor.name} deleted success`)
                }
              
            })
    }


    return (
        <div>
            <h2 className="text-3xl">Manage Doctor :{doctors.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>EMail</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors?.map((doc, i) => <tr key={doc._id}>
                                <th>{i + 1}</th>
                                <td><div className="avatar online">
                                    <div className="w-24 rounded-full">
                                        <img src={doc.image} alt="" />
                                    </div>
                                </div></td>
                                <td>{doc.name}</td>
                                <td>{doc.email}</td>
                                <td>{doc.specialty}</td>
                                <td>
                                    <label onClick={() => setDeletingDoctor(doc)} htmlFor="confirmationModal" className="btn btn-sm btn-error">Delete</label>

                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingDoctor &&
                <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingDoctor.name}. It cannot be undone`}
                    successAction={handleDeleteDoctor}
                    successButtonName='Delete'
                    modalData={deletingDoctor}
                    closeModal={closeModal}

                >

                </ConfirmationModal>

            }
        </div>
    );
};

export default ManageDoctors;