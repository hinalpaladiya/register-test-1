// PreviousStandardsFields.js

import React from 'react';
import PropTypes from 'prop-types';

var PreviousStandardsFields = ({ formik }) => {
    var renderFields = () => {
        var currentStandard = parseInt(formik.values.currentStandard);
        var fields = [];

        for (let i = 1; i < currentStandard; i++) {
            fields.push(
                <div key={i} className="row mt-3">
                    <div className="col-md-6">
                        <label htmlFor={`previousStandards[${i - 1}].remark`} className="form-label">{`Standard ${i}: Remark`}</label>
                        <input
                            type="text"
                            id={`previousStandards[${i - 1}].remark`}
                            name={`previousStandards[${i - 1}].remark`}
                            className={`form-control ${formik.touched.previousStandards?.[i - 1]?.remark ? 'is-invalid' : ''}`}
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
                            className={`form-control ${formik.touched.previousStandards?.[i - 1]?.percentage ? 'is-invalid' : ''}`}
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
        return fields;
    };

    return <>{renderFields()}</>;
};

PreviousStandardsFields.propTypes = {
    formik: PropTypes.object.isRequired,
};

export default PreviousStandardsFields;
