import React, { useEffect } from 'react';
import './css/App.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const SignUpSchema = Yup.object().shape({
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
			navigate('/display-data', {
				state: { values },
			});
		},
	});

	useEffect(() => {
		formik.setFieldValue('previousStandards', []);
	}, [formik.values.currentStandard]);

	const renderPreviousStandardsFields = () => {
        const currentStandard = parseInt(formik.values.currentStandard);
        const previousStandardsFields = [];

        for (let i = 1; i < currentStandard; i++) {
            previousStandardsFields.push(
                <div key={i} className="row mt-3">
                    <div className="col-md-6">
                        <label htmlFor={`previousStandards[${i - 1}].remark`} className="form-label">{`Standard ${i}: Remark`}</label>
                        <input
                            type="text"
                            id={`previousStandards[${i - 1}].remark`}
                            name={`previousStandards[${i - 1}].remark`}
                            className={`form-control ${formik.errors.previousStandards?.[i - 1]?.remark ? 'is-invalid' : ''}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.previousStandards[i - 1]?.remark || ''}
                        />
                        {formik.touched.previousStandards && formik.errors.previousStandards?.[i - 1]?.remark && (
                            <div className="invalid-feedback">
                                {formik.errors.previousStandards[i - 1].remark}
                            </div>
                        )}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor={`previousStandards[${i - 1}].percentage`} className="form-label">{`Standard ${i}: Percentage`}</label>
                        <input
                            type="text"
                            id={`previousStandards[${i - 1}].percentage`}
                            name={`previousStandards[${i - 1}].percentage`}
                            className={`form-control ${formik.errors.previousStandards?.[i - 1]?.percentage ? 'is-invalid' : ''}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.previousStandards[i - 1]?.percentage || ''}
                        />
                        {formik.touched.previousStandards && formik.errors.previousStandards?.[i - 1]?.percentage && (
                            <div className="invalid-feedback">
                                {formik.errors.previousStandards[i - 1].percentage}
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return previousStandardsFields;
    };

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
                            type="text"
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
                    {renderPreviousStandardsFields()}
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Sign up</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SignUp;
