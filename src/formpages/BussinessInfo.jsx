import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/AuthContext';

const post_back = 'https://wep-backend.onrender.com/webform/post_bussiness';

function BussinessInfo() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [status, setStatus] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        user: user.user_id,
        name: "",
        year_of_establishment: "",
        sector: "",
        number_of_employees_male: "",
        number_of_employees_female: "",
        total_employees: "",
        revenue_per_annum: "",
        location_address: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        const sumOfValues = Object.entries(formData)
            .filter(([key, value]) => key !== 'total_employees' && key !== 'user' && key !== 'name' && key !== 'year_of_establishment' && key !== 'sector' && key !== 'revenue_per_annum' && key !== 'location_address')
            .map(([key, value]) => parseFloat(value) || 0)
            .reduce((sum, total) => sum + total, 0)
            .toFixed(2);

        setFormData((prevEducation) => ({
            ...prevEducation,
            total_employees: sumOfValues
        }));
    }, [formData.number_of_employees_male, formData.number_of_employees_female]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus(true);
        axios.post(post_back, formData)
            .then(response => {
                if (response.status === 201) {
                    ShowSuccessAlert("Submitting Completed");
                    setStatus(false);
                    navigate("/application/trade_association");
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
                    <i className="bi bi-person-circle"></i>
                    <h4 className='text-success'>Business Information</h4>
                </span>
                <form className='row g-3'>
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">
                            Name of the Business
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="year_of_establishment" className="form-label">
                            Year of Business Establishment
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="year_of_establishment"
                            name='year_of_establishment'
                            value={formData.year_of_establishment}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="sector" className="form-label">
                            Sector of Business
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="sector"
                            name='sector'
                            value={formData.sector}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="number_of_employees_male" className="form-label">
                            Number of Employees (Male)
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="number_of_employees_male"
                            name='number_of_employees_male'
                            value={formData.number_of_employees_male}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="number_of_employees_female" className="form-label">
                            Number of Employees (Female)
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="number_of_employees_female"
                            name='number_of_employees_female'
                            value={formData.number_of_employees_female}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="total_employees" className="form-label">
                            Total Employees
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="total_employees"
                            name='total_employees'
                            value={formData.total_employees}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="revenue_per_annum" className="form-label">
                            Revenue Per Annum
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="revenue_per_annum"
                            name='revenue_per_annum'
                            value={formData.revenue_per_annum}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="location_address" className="form-label">
                            Business Location/Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="location_address"
                            name='location_address'
                            value={formData.location_address}
                            onChange={handleChange}
                        />
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
                    <div className="custom-modal buss">
                        <div className="custom-modal-header">
                            <h5 className="custom-modal-title">View Information</h5>
                        </div>
                        <div className="custom-modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">
                                        Name
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            id="colFormLabelSm"
                                            name='name'
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
                                        Year of Establishment
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="colFormLabel"
                                            name='year_of_establishment'
                                            value={formData.year_of_establishment}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">
                                        Sector
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="colFormLabelLg"
                                            name='sector'
                                            value={formData.sector}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
                                        Number of Employees (Male)
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="colFormLabel"
                                            name='number_of_employees_male'
                                            value={formData.number_of_employees_male}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
                                        Number of Employees (Female)
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="colFormLabel"
                                            name='number_of_employees_female'
                                            value={formData.number_of_employees_female}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
                                        Total Employees
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="colFormLabel"
                                            name='total_employees'
                                            value={formData.total_employees}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
                                        Revenue Per Annum
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="colFormLabel"
                                            name='revenue_per_annum'
                                            value={formData.revenue_per_annum}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
                                        Location/Address
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="colFormLabel"
                                            name='location_address'
                                            value={formData.location_address}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

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

export default BussinessInfo;
