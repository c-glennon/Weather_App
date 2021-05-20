import React from 'react';

const Current = ({temp, weather}) => {

return (
    <div style={{ textAlign: "center" }}>
        <h1>Current Weather</h1>
        <h2>Temp: {temp} Weather: {weather}</h2>
    </div>
);
}

export default Current;