import React, {useState} from "react";
import Hourly from "./Hourly";
import Daily from "./Daily";

const Toggle = ({ hourTemps, hourMains, dayTemps, dayMains }) => {
  const [name, setName] = useState("Hourly");
  const [isHourly, setIsHourly] = useState(false);

  const d = "Daily";
  const h = "Hourly";

  const onClick = (e) => {
    if (name === d) {
      setName(h);
      setIsHourly(true);
    } else {
      setName(d);
      setIsHourly(false);
    }
  };

  return (
    <div className="Toggle">
      <div>
        <button onClick={onClick}>Toggle forecast</button>
      </div>
      <div>
        {isHourly ? (
          <Hourly temps={hourTemps} mains={hourMains} />
        ) : (
          <Daily temps={dayTemps} mains={dayMains} />
        )}
      </div>
    </div>
  );
};

export default Toggle;