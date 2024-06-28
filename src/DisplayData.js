import React from 'react'
import { useLocation } from 'react-router-dom';
var DisplayData = (props) => {
    var {state} = useLocation();
    console.log(state.values);

    var { name, email, current_standard, roll_number, previous_standards } = state.values;
    console.log( previous_standards);
    // console.log(previousStandards, 'previousStandards');
    return (
        <div className="display-data">
            <h2>Registered Data:</h2>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Roll Number:</strong> {roll_number}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Current Standard:</strong> {current_standard}</p>

            {previous_standards.length > 0 && (
                <div>
                    <h2>Previous Standards Details:</h2>
                    {previous_standards.map((standard, index) => (
                        <div key={index}>
                            <p><strong>Standard {index + 1}:</strong></p>
                            <p><strong>Remark:</strong> {standard.remark}</p>
                            <p><strong>Percentage:</strong> {standard.percentage}%</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


export default DisplayData