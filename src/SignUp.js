import React, {useState} from 'react'
import './css/App.css'
import * as Yup from "yup";
import { useFormik } from 'formik';

var SignUp = () => {
	const [formData, setFormData] = useState({
        name: '',
        roll_number: '',
        email: '',
        current_standard: '',
        previous_standards: [],
    });

	const SignUpSchema = Yup.object().shape({
		name: Yup.string().required("Name is required").min(2, "Name is too short").max(100, "Name is too long"),
		roll_number: Yup.number().required("Roll number is required").min(1, "Invalid roll number").max(100, 						"Invalid roll number"),
		email: Yup.string().email("Invalid email").required("Email is required"),
		current_standard: Yup.number().required("Current standard is required").min(1, "Invalid 										standard").max(12, "Invalid standard"),
	});
	
	const [currentStandard, setCurrentStandard] = useState('');

	const formik = useFormik({
		initialValues: {
			name: '',
			roll_number: '',
			email: '',
			current_standard: '',
			previous_standards: [],
		},
		validationSchema: SignUpSchema,
		onSubmit: values => {
			setFormData(values);
			// setCurrentStandard(values.roll_number);
			// const formData = values;
			console.log(formData, values);
			// let ref1 = Firebase.database().ref().child('users').push()
			// ref1.set(values)
		},
	});
	const renderPreviousStandardsFields = () => {
        const currentStandard = parseInt(formik.values.current_standard);
        const previousStandardsFields = [];

        for (let i = 1; i < currentStandard; i++) {
            previousStandardsFields.push(
				<>
                <div key={i} className="row">
				<div className="col-md-6">
                    <label htmlFor={`standard${i}_remark`} className="form-label">{`Standard ${i}: Remark`}</label>
                    <input
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.previous_standards[i - 1]?.remark || ''}
                        name={`previous_standards[${i - 1}].remark`}
                        className="form-control"
                        id={`standard${i}_remark`}
                    />
                    {formik.errors.previous_standards?.[i - 1]?.remark ? <div style={{ color: 'red' }}><small>{formik.errors.previous_standards[i - 1].remark}</small></div> : null}
				</div>
				<div className="col-md-6">
                    <label htmlFor={`standard${i}_percentage`} className="form-label">{`Standard ${i}: Percentage`}</label>
                    <input
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.previous_standards[i - 1]?.percentage || ''}
                        name={`previous_standards[${i - 1}].percentage`}
                        className="form-control"
                        id={`standard${i}_percentage`}
                    />
                    {formik.errors.previous_standards?.[i - 1]?.percentage ? <div style={{ color: 'red' }}><small>{formik.errors.previous_standards[i - 1].percentage}</small></div> : null}
                </div>
				</div>
				</>
            );
        }

        return previousStandardsFields;
    };
	return (
		<div className="container mt-4">
			<form className="row g-3" onSubmit={formik.handleSubmit}>
				<div className="col-md-6">
					<label htmlFor="inputEmail4" className="form-label">Name</label>
					<input type="text" onChange={formik.handleChange} value={formik.values.name} name="name" className="form-control" id="inputEmail4" />
				{formik.errors.name ? <div style={{ color: "red" }}><small>{formik.errors.name}</small></div> : null}
				</div>
				<div className="col-md-6">
					<label htmlFor="inputPassword4" className="form-label">Roll Number</label>
					<input type="text" onChange={formik.handleChange} value={formik.values.roll_number} name="roll_number" className="form-control" id="roll_number" />
				{formik.errors.roll_number ? <div style={{ color: "red" }}><small>{formik.errors.roll_number}</small></div> : null}
				</div>
				<div className="col-12">
					<label htmlFor="inputAddress" className="form-label">Email</label>
					<input type="email" onChange={formik.handleChange} value={formik.values.email} name='email' className="form-control" id="email" placeholder="abc@gmail.com" />
				{formik.errors.email ? <div style={{ color: "red" }}><small>{formik.errors.email}</small></div> : null}
				</div>

				<div className="col-md-12">
					<label htmlFor="inputCity" className="form-label">Current Standard</label>
					<input type="text" onChange={formik.handleChange} value={formik.values.current_standard} name="current_standard" className="form-control" id="current_standard" />
				{formik.errors.current_standard ? <div style={{ color: "red" }}><small>{formik.errors.current_standard}</small></div> : null}
				</div>
				{renderPreviousStandardsFields()}
				<div className="col-12">
					<button type="submit" className="btn btn-primary">Sign up</button>
				</div>
			</form>
		</div>
	)
}

export default SignUp