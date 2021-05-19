import React from "react";

const Daily = (props) => {

    return (
    <div style={{ textAlign: "center" }}>
    <div className = "Daily">
    <u1>
        {props.temps.map((value,index)=>{
           return <div>Day: {index+1} Temp: {value} Weather: {props.mains[index]}</div>
        })}
        </u1>
    </div>
    </div>
    );
}

export default Daily;