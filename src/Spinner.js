import PacmanLoader from "react-spinners/PacmanLoader";

import "./Spinner.css";

function Spinner() {
  return (
    <div className="spinner">
      <div className="container">
        <PacmanLoader color={"#800040"} size={150} />
      </div>
    </div>
  );
}

export default Spinner;
