import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/AuthContext';

const post_back = 'https://wep-backend.onrender.com/webform/post_women';

function Women() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [status, setStatus] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        user:user.user_id,
        how_did_you_hear:"",
        preferred_communication_method:"",
        involved_in_empowerment:false,
        confirmed:false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if(type === 'radio'){
            setFormData({...formData, involved_in_empowerment:checked})
        }
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
          });
    };

    const handleSelect =(e)=>{
        setFormData({...formData,  how_did_you_hear:e.target.value })
    }
    const handleMethod = (e)=>{
        setFormData({...formData,  preferred_communication_method:e.target.value})
    }

     // Determine if all required fields are filled
  const isFormValid =
  formData.how_did_you_hear !== '' &&
  formData.involved_in_empowerment !== '' &&
  formData.preferred_communication_method &&
  formData.confirmed !== '';

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus(true);
        axios.post(post_back, formData)
            .then(response => {
                if (response.status === 201) {
                    ShowSuccessAlert("Submitting Completed");
                    setStatus(false);
                    navigate("/complete");
                }
            })
            .catch(err => {
                if (err.response) {
                      
        Swal.fire({
            title: "Please fill in all necessary the Credentials",
            icon: "error",
            timer: 6000,
            toast: true,
            position: 'top',
            timerProgressBar: true,
            showConfirmButton: true,
          });
                    if (err.response.status === 400 && err.response.data.error) {
                        Swal.fire({
                            title: err.response.data.error,
                            icon: "error",
                            timer: 6000,
                            toast: true,
                            position: 'top',
                            timerProgressBar: true,
                            showConfirmButton: true,
                        });
                    }
                } else {
                    console.log(err);
                }
                setStatus(false);
            });
    };

    const ShowSuccessAlert = (message) => {
        Swal.fire({
            title: message,
            icon: "success",
            timer: 6000,
            toast: true,
            position: 'top',
            timerProgressBar: true,
            showConfirmButton: true,
        });
    };

    return (
        <>
            <div className="container col-md-9 col-sm-12">
                <span className='d-flex text-center span'>
                <i class="bi bi-person-standing-dress"></i>
                    <h4 className='text-success'>Women Entrepreneurship
                    Platform</h4>
                </span>
                <form className='row g-3'>
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">
                        How did you hear about GROW?
                        </label>
                        <select className="form-control" onChange={handleSelect} value={formData.MaritalStatus}>
                            <option value="">Choose Option</option>
                            <option value="Social Media">Social Media</option>
                            <option value="Community Meetings">Community Meetings</option>
                            <option value="Local Leaders">Local Leaders</option>
                            <option value="Radio/Television">Radio/Television</option>
                            <option value="Friend">Friend</option>
                            <option value="Others">Others (Specify)</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="year_of_establishment" className="form-label">
                        What is your preferred method of
communication with the Women
Entrepreneurship Platform
(WEP)?
                        </label>
                        <select className="form-control" onChange={handleMethod} value={formData.MaritalStatus}>
                            <option value="">Choose Option</option>
                            <option value="Email">Email</option>
                            <option value="Phone Support">Phone Support</option>
                            <option value="Physical Events and workshops">Physical Events and workshops</option>
                            <option value="Online Events and Webinars">Online Events and Webinars</option>
                            <option value="Social Media">Social Media</option>
                            <option value="Others">Others (Specify)</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="sector" className="form-label">
                        Are you are involved in any
efforts related to women's
economic empowerment?
                        </label>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                id="genderMale"
                                name="involved_in_empowerment"
                                value={true}
                                checked={formData.involved_in_empowerment === true}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="genderMale">
                                Yes
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                id="genderFemale"
                                name="involved_in_empowerment"
                                value={false}
                                checked={formData.involved_in_empowerment === false}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="genderFemale">
                                No
                            </label>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="number_of_employees_male" className="form-label">
                        Confirmation
                        </label>
                        <div className="check">
                        <input
                            type="checkbox"
                            id="number_of_employees_male"
                            name='confirmed'
                            checked = {formData.confirmed}
                            onChange={handleChange}
                        />
                        I declare and confirm that the information provided above is true

and accurate to the best of my knowledge.
                        </div>
                      
                    </div>
                    <div className="pro_btns ms-auto">
                        <button
                            type="button"
                            className="btn-register text-white p-2"
                            onClick={() => setShowModal(true)}
                        >
                            Save and Complete
                        </button>
                    </div>
                </form>
            </div>

            {showModal && (
                <div className="custom-modal-overlay">
                    <div className="custom-modal">
                        <div className="custom-modal-header">
                            <h5 className="custom-modal-title">View Information</h5>
                        </div>
                        <div className="custom-modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">
                                    How did you hear about GROW?
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            id="colFormLabelSm"
                                            name='how_did_you_hear'
                                            value={formData.how_did_you_hear}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
                                    Preferred method of
                                    communication
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="colFormLabel"
                                            name='preferred_communication_method'
                                            value={formData.preferred_communication_method}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">
                                involved in any Women's empowerment?
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="colFormLabelLg"
                                            name='involved_in_empowerment'
                                            value={formData.involved_in_empowerment}
                    
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
                                        Confirmation
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="colFormLabel"
                                            name='confirmed'
                                            value={formData.confirmed}
                                            
                                        />
                                    </div>
                                </div>
                               
                                <div className='edit_btns'>
                                    <button type="submit" className="btn-register text-white text-center p-2 bt" disabled={!isFormValid || status} >
                                        {status ? 'Confirming...' : 'Complete Application'}
                                    </button>
                                    <button type="button" className="close mt-2" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Women;



