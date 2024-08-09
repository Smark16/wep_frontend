import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/AuthContext';

const post_back = 'http://127.0.0.1:8000/webform/post_trade';

function TradeAssociation() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [status, setStatus] = useState(false);
    const [linkError, setLinkError] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        user: user.user_id,
        name_of_group: "",
        website_link: "",
        is_registered: false,
        contact_person_name: "",
        contact_person_phone: "",
        contact_person_email: "",
        members: [{ user: user.user_id, name: "", phone_number: "", gender: "" }]
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if(type === 'radio'){
            setFormData({...formData, is_registered:checked})
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleMemberChange = (index, e) => {
        const { name, value } = e.target;
        const newMembers = [...formData.members];
        newMembers[index][name] = value;
        setFormData({ ...formData, members: newMembers });
        setErrors({ ...errors, [`member_${index}`]: '' });
    };

    const addMember = () => {
        const newMember = { user: user.user_id, name: "", phone_number: "", gender: "" };
        if (formData.members.some(member => Object.values(member).some(value => !value))) {
            setErrors({ ...errors, addMember: 'Please fill out all member fields before adding a new one.' });
        } else {
            setFormData({ ...formData, members: [...formData.members, newMember] });
            setErrors({ ...errors, addMember: '' });
        }
    };

    console.log(formData)

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus(true);
        axios.post(post_back, formData)
            .then(response => {
                if (response.status === 201) {
                    ShowSuccessAlert("Submitting Completed");
                    setStatus(false);
                    navigate("/application/women_enterprizes");
                }
            })
            .catch(err => {
                  
        Swal.fire({
            title: "Please fill in all necessary the Credentials",
            icon: "error",
            timer: 6000,
            toast: true,
            position: 'top',
            timerProgressBar: true,
            showConfirmButton: true,
          });
                if (err.response) {
                    setLinkError(err.response.data.website_link)
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
    console.log(linkError)

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
                <i class="bi bi-badge-tm-fill"></i>
                    <h4 className='text-success'>Trade Association</h4>
                </span>
                <form className='row g-3'>
                    <div className="col-md-6">
                        <label htmlFor="name_of_group" className="form-label">
                            What is the name of your trade association/group
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name_of_group"
                            name='name_of_group'
                            value={formData.name_of_group}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="website_link" className="form-label">
                            Enter trade association website link (optional)
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="website_link"
                            name='website_link'
                            value={formData.website_link}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="is_registered" className="form-label">
                            Is your trade association registered with the District Community Development Office
                        </label>
                        <div>
                            <input
                                type="radio"
                                className="form-check-input"
                                id="genderMale"
                                name="is_registered"
                                value={true}
                                checked={formData.is_registered === true}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="genderMale">
                                Yes
                            </label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                className="form-check-input"
                                id="genderFemale"
                                name="is_registered"
                                value={false}
                                checked={formData.is_registered === false}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="genderFemale">
                                No
                            </label>
                        </div>

                        {formData.is_registered === 'true' && (
                        <>
                            <div className="mb-3">
                                <label htmlFor="contact_person_name" className="form-label">
                                    Enter Contact Person Name:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="contact_person_name"
                                    name='contact_person_name'
                                    value={formData.contact_person_name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="contact_person_phone" className="form-label">
                                    Enter Contact Person Phone Number:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="contact_person_phone"
                                    name='contact_person_phone'
                                    value={formData.contact_person_phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="contact_person_email" className="form-label">
                                    Enter Contact Person Email:
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="contact_person_email"
                                    name='contact_person_email'
                                    value={formData.contact_person_email}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}

                    </div>

                   
                    <div className="col-md-6">
                        <p className='whuu'>Enter at least five members that belong to your trade association/group</p>
                        {formData.members.map((member, index) => (
                            <div key={index} className="mb-3">
                                <span>Enter Member</span>
                                <div className='mt-3'>
                                    <label htmlFor={`name_${index}`} className="form-label">
                                        <b>Name*</b>
                                    </label>
                                    <input
                                        type="text"
                                        id={`name_${index}`}
                                        name="name"
                                        className="form-control"
                                        value={member.name}
                                        onChange={(e) => handleMemberChange(index, e)}
                                        required
                                    />
                                </div>

                                <div className='mt-3'>
                                    <label htmlFor={`phone_number_${index}`} className="form-label">
                                        <b>Phone Number*</b>
                                    </label>
                                    <input
                                        type="text"
                                        id={`phone_number_${index}`}
                                        name="phone_number"
                                        className="form-control"
                                        value={member.phone_number}
                                        onChange={(e) => handleMemberChange(index, e)}
                                        required
                                    />
                                </div>

                                <div className='mt-3'>
                                    <label htmlFor={`gender_${index}`} className="form-label">
                                        <b>Gender*</b>
                                    </label>
                                    <input
                                        type="text"
                                        id={`gender_${index}`}
                                        name="gender"
                                        className="form-control"
                                        value={member.gender}
                                        onChange={(e) => handleMemberChange(index, e)}
                                        required
                                    />
                                </div>

                                {errors[`member_${index}`] && <span className="text-danger">{errors[`member_${index}`]}</span>}
                            </div>
                        ))}

                        <button type="button" onClick={addMember} className='text-white text-center p-2 btn-register'>
                            Add Member
                        </button>
                        {errors.addMember && <span className="text-danger">{errors.addMember}</span>}
                    </div>

                    <div className="pro_btns ms-auto">
                        <button
                            type="button"
                            className="btn-register text-white p-2"
                            onClick={() => setShowModal(true)}
                        >
                            Save
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
                                    <label htmlFor="name_of_group_modal" className="col-sm-2 col-form-label col-form-label-sm">
                                        Name
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            id="name_of_group_modal"
                                            name='name_of_group'
                                            value={formData.name_of_group}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="website_link_modal" className="col-sm-2 col-form-label">
                                        Website Link
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="website_link_modal"
                                            name='website_link'
                                            value={formData.website_link}
                                            onChange={handleChange}
                                        />
                                          {linkError && linkError.map(err =>{
                                          return(
                                        <p className='text-danger'>{err}</p>
                                          )
                                    })}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="is_registered_modal" className="col-sm-2 col-form-label">
                                        Is Registered
                                    </label>
                                    <div className="col-sm-10">
                                        <select
                                            className="form-control"
                                            id="is_registered_modal"
                                            name='is_registered'
                                            value={formData.is_registered}
                                            onChange={handleChange}
                                        >
                                            <option value={false}>No</option>
                                            <option value={true}>Yes</option>
                                        </select>
                                    </div>
                                </div>

                                {formData.is_registered === 'true' && (
                                    <>
                                     <div className="row mb-3">
                                    <label htmlFor="contact_person_name_modal" className="col-sm-2 col-form-label">
                                        Contact Person Name
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="contact_person_name_modal"
                                            name='contact_person_name'
                                            value={formData.contact_person_name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="contact_person_phone_modal" className="col-sm-2 col-form-label">
                                        Contact Person Phone
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="contact_person_phone_modal"
                                            name='contact_person_phone'
                                            value={formData.contact_person_phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="contact_person_email_modal" className="col-sm-2 col-form-label">
                                        Contact Person Email
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="contact_person_email_modal"
                                            name='contact_person_email'
                                            value={formData.contact_person_email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                    </>
                                )}
                               
                                <div className='edit_btns'>
                                    <button type="submit" className="btn-register text-white text-center p-2">
                                        {status ? 'Confirming...' : 'Confirm and Continue'}
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

export default TradeAssociation;
