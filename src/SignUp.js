import React, { useEffect } from 'react';
import './css/App.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import PreviousStandardsFields from './PreviousStandardsFields'; // 
import axios from 'axios';

var SignUpSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(2, 'Name is too short').max(100, 'Name is too long'),
    rollNumber: Yup.number().required('Roll number is required').min(1, 'Invalid roll number').max(100, 'Invalid roll number'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    currentStandard: Yup.number().required('Current standard is required').min(1, 'Invalid standard').max(12, 'Invalid standard'),
    previousStandards: Yup.array().of(
        Yup.object().shape({
            remark: Yup.string().required('Remark is required'),
            percentage: Yup.string().required('Percentage is required').max(100, 'Invalid percentage'),
        })
    ),
});

const SignUp = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            rollNumber: '',
            email: '',
            currentStandard: '',
            previousStandards: [],
        },
        validationSchema: SignUpSchema,
        onSubmit: values => {
            axios.post('https://register-test-1-default-rtdb.firebaseio.com/users.json', values)
            .then(res => {
                console.log(res, 'res');
            });
            navigate('/display-data', {
                state: { values },
            });
        },
    });

    useEffect(() => {
        formik.setFieldValue('previousStandards', []);
        console.log('callesdfdsfsdd');
        formik.validateForm(); 
        console.log('called');
    }, [formik.values.currentStandard]);

    return (
        <>
            <Header />
            <div className="container mt-4">
                <form className="row g-3" onSubmit={formik.handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <div className="invalid-feedback">
                                {formik.errors.name}
                            </div>
                        )}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="rollNumber" className="form-label">Roll Number</label>
                        <input
                            type="text"
                            id="rollNumber"
                            name="rollNumber"
                            className={`form-control ${formik.touched.rollNumber && formik.errors.rollNumber ? 'is-invalid' : ''}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.rollNumber}
                        />
                        {formik.touched.rollNumber && formik.errors.rollNumber && (
                            <div className="invalid-feedback">
                                {formik.errors.rollNumber}
                            </div>
                        )}
                    </div>
                    <div className="col-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="invalid-feedback">
                                {formik.errors.email}
                            </div>
                        )}
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="currentStandard" className="form-label">Current Standard</label>
                        <input
                            type="number"
                            id="currentStandard"
                            name="currentStandard"
                            className={`form-control ${formik.touched.currentStandard && formik.errors.currentStandard ? 'is-invalid' : ''}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.currentStandard}
                        />
                        {formik.touched.currentStandard && formik.errors.currentStandard && (
                            <div className="invalid-feedback">
                                {formik.errors.currentStandard}
                            </div>
                        )}
                    </div>
                    <PreviousStandardsFields formik={formik} />
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Sign up</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SignUp;
