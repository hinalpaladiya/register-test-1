import React, { useState } from 'react'
import './css/App.css'
import * as Yup from "yup";
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Header from './Header';


var SignUp = () => {
	var navigate = useNavigate();

	var SignUpSchema = Yup.object().shape({
		name: Yup.string().required("Name is required").min(2, "Name is too short").max(100, "Name is too long"),
		rollNumber: Yup.number().required("Roll number is required").min(1, "Invalid roll number").max(100, "Invalid roll number"),
		email: Yup.string().email("Invalid email").required("Email is required"),
		currentStandard: Yup.number().required("Current standard is required").min(1, "Invalid standard").max(12, "Invalid standard"),
	});

	var formik = useFormik({
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
	var renderPreviousStandardsFields = () => {
		var currentStandard = parseInt(formik.values.currentStandard);
		var previousStandardsFields = [];

		for (let i = 1; i < currentStandard; i++) {
			previousStandardsFields.push(
				<>
					<div key={i} className="row">
						<div className="col-md-6">
							<label htmlFor={`standard${i}_remark`} className="form-label">{`Standard ${i}: Remark`}</label>
							<input
								type="text"
								onChange={formik.handleChange}
								value={formik.values.previousStandards[i - 1]?.remark || ''}
								name={`previousStandards[${i - 1}].remark`}
								className="form-control"
								id={`standard${i}_remark`}
							/>
							{formik.errors.previousStandards?.[i - 1]?.remark ? <div style={{ color: 'red' }}><small>{formik.errors.previousStandards[i - 1].remark}</small></div> : null}
						</div>
						<div className="col-md-6">
							<label htmlFor={`standard${i}_percentage`} className="form-label">{`Standard ${i}: Percentage`}</label>
							<input
								type="text"
								onChange={formik.handleChange}
								value={formik.values.previousStandards[i - 1]?.percentage || ''}
								name={`previousStandards[${i - 1}].percentage`}
								className="form-control"
								id={`standard${i}_percentage`}
							/>
							{formik.errors.previousStandards?.[i - 1]?.percentage ? <div style={{ color: 'red' }}><small>{formik.errors.previousStandards[i - 1].percentage}</small></div> : null}
						</div>
					</div>
				</>
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
						<label htmlFor="inputEmail4" className="form-label">Name</label>
						<input type="text" onChange={formik.handleChange} value={formik.values.name} name="name" className="form-control" id="inputEmail4" />
						{formik.errors.name ? <div style={{ color: "red" }}><small>{formik.errors.name}</small></div> : null}
					</div>
					<div className="col-md-6">
						<label htmlFor="inputPassword4" className="form-label">Roll Number</label>
						<input type="text" onChange={formik.handleChange} value={formik.values.rollNumber} name="rollNumber" className="form-control" id="rollNumber" />
						{formik.errors.rollNumber ? <div style={{ color: "red" }}><small>{formik.errors.rollNumber}</small></div> : null}
					</div>
					<div className="col-12">
						<label htmlFor="inputAddress" className="form-label">Email</label>
						<input type="email" onChange={formik.handleChange} value={formik.values.email} name='email' className="form-control" id="email" placeholder="abc@gmail.com" />
						{formik.errors.email ? <div style={{ color: "red" }}><small>{formik.errors.email}</small></div> : null}
					</div>

					<div className="col-md-12">
						<label htmlFor="inputCity" className="form-label">Current Standard</label>
						<input type="text" onChange={formik.handleChange} value={formik.values.currentStandard} name="currentStandard" className="form-control" id="currentStandard" />
						{formik.errors.currentStandard ? <div style={{ color: "red" }}><small>{formik.errors.currentStandard}</small></div> : null}
					</div>
					{renderPreviousStandardsFields()}
					<div className="col-12">
						<button type="submit" className="btn btn-primary">Sign up</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default SignUp