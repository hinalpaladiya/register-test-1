import React from 'react';
import { useLocation } from 'react-router-dom';

const DisplayData = (props) => {
    const { state } = useLocation();
    const { name, email, currentStandard, rollNumber, previousStandards } = state.values;

    return (
        <div className="container display-data">
            <h2 className="text-center">Registered Data:</h2>
            <div className="row data-row">
                <div className="col-md-12 d-flex justify-content-center align-items-center">
                    <p><strong>Name:</strong> {name}</p>
                </div>
                <div className="col-md-12 d-flex justify-content-center align-items-center">
                    <p><strong>Roll Number:</strong> {rollNumber}</p>
                </div>
                <div className="col-md-12 d-flex justify-content-center align-items-center">
                    <p><strong>Email:</strong> {email}</p>
                </div>
                <div className="col-md-12 d-flex justify-content-center align-items-center">
                    <p><strong>Current Standard:</strong> {currentStandard}</p>
                </div>
            </div>

            {previousStandards.length > 0 && (
                <div className="previous-standards mt-4">
                    <h2 className="text-center">Previous Standards Details:</h2>
                    {previousStandards.map((standard, index) => (
                        <div key={index} className="standard-details  d-flex justify-content-center row mt-2">
                            <div className="col-md-2 d-flex justify-content-center align-items-center">
                                <h5 className="standard-heading"><strong>Standard {index + 1}:</strong></h5>
                            </div>
                            <div className="col-md-3 d-flex justify-content-center align-items-center">
                                <p className="standard-data"><strong>Remark:</strong> {standard.remark}</p>
                            </div>
                            <div className="col-md-3 d-flex justify-content-center align-items-center">
                                <p className="standard-data"><strong>Percentage:</strong> {standard.percentage}%</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DisplayData;
