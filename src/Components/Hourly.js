import React from 'react';

const Hourly = ({temps, mains}) => {

return(
    <div style={{ textAlign: "center" }}>
    <div className = "Hourly">
        <u1>
            {temps.map((value,index)=>{
                return <div>Hour: {index+1} Temp: {value} Weather: {mains[index]}</div>
            })}

        </u1>
    </div>
    </div>
);

}

export default Hourly;