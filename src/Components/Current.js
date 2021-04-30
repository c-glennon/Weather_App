import React from 'react';

const Current = (props) => {

return (
    <div style={{ textAlign: "center" }}>
        <h1>Current Weather</h1>
        <h2>Temp: {props.temp} Weather: {props.weather}</h2>
    </div>
);
}

export default Current;