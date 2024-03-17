import React from "react";
import PropTypes from "prop-types";

import {
  CircularProgress,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";

function Loading(props) {
  return (
    <div>
      <div
        className="justify-content-center"
        style={{
          display: "flex",
          justifyContent: "center",
        //   marginTop: "100px",
        //   height:'100vh',
          visibility: "visible",
        }}
      >
        <div
          className="spinner-border"
          role="status"
          style={{
            width: "7rem",
            height: "7rem",
            position: "fixed",
            fontSize: 15,
            top: "55%",
            left: "55%",
            color:'red',
            background:'#00000000',
            fontStretch:'5px',
            fontWeight:600,

            // zIndex: -1,
            
          }}
        >
          <span className="sr-only"></span>
        </div>
      </div>
    </div>
  );
}

Loading.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function CircularStatic() {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <Loading value={progress} />;
}
