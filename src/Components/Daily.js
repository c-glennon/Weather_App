import React from "react";

const Daily = ({temps, mains}) => {

    return (
    <div style={{ textAlign: "center" }}>
    <div className = "Daily">
    <u1>
        {temps.map((value,index)=>{
           return <div>Day: {index+1} Temp: {value} Weather: {mains[index]}</div>
        })}
        </u1>
    </div>
    </div>
    );
}

export default Daily;