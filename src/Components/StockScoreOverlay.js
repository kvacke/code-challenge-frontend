import React, { useEffect } from "react";
import { createUseStyles } from "react-jss";
import { everyPixelQualityCall } from "../Other/everyPixel";
import CircularProgress from "@material-ui/core/CircularProgress";

const StockScoreOverlay = ({ imgURL, index, isDesktop }) => {
  const [score, setScore] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [hovered, setHovered] = React.useState(false);

  const goodScore = 70;

  const classes = useStyles({
    isDesktop: isDesktop,
    goodScore: score >= goodScore,
    loading: loading,
    hovered: hovered,
  });

  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };

  useEffect(async () => {
    try {
      setLoading(true);
      const result = await everyPixelQualityCall(imgURL);
      setScore(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [index, imgURL]);

  return (
    <div
      className={classes.overlay}
      onMouseOver={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CircularProgress
        className={classes.spinner}
        style={{ color: "white" }}
      />
      <div className={classes.score}>{score}%</div>
      <div className={classes.badPhoto}>Bad stock photo.</div>
    </div>
  );
};

const useStyles = createUseStyles({
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: (props) =>
      props.goodScore || props.loading || props.hovered || !props.isDesktop
        ? "rgba(0,0,0,0.0)"
        : "rgba(0,0,0,0.95)",
    transition: "0.5s",
    borderRadius: "3px",
    zIndex: 9,
  },
  loadingOverlay: {
    position: "relative",
    backgroundColor: "rgba(0,0,0,0.95)",
    transition: "0.5s",
    borderRadius: "3px",
  },
  score: {
    position: "absolute",
    visibility: (props) =>
      !props.loading && (props.goodScore || props.hovered || !props.isDesktop)
        ? "visible"
        : "hidden",
    backgroundColor: "rgba(0,0,0,0.3)",
    fontFamily: "lobster",
    textAlign: "center",
    borderRadius: "7px",
    color: "white",
    top: "10px",
    right: "10px",
    fontSize: (props) => (props.goodScore ? "30px" : "20px"),
    lineHeight: (props) => (props.goodScore ? "30px" : "20px"),
    padding: "5px",
    fontWeight: "bold",
    zIndex: 9,
  },
  spinner: {
    position: "absolute",
    visibility: (props) => (props.loading ? "visible" : "hidden"),
    right: "0",
    margin: {
      top: "10px",
      right: "10px",
    },
    color: "white !!!important",
  },
  badPhoto: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "50%",
    fontFamily: "Patua one",
    fontSize: "40px",
    color: "white",
    visibility: (props) =>
      !props.loading && !props.goodScore && (!props.hovered || !props.isDesktop)
        ? "visible"
        : "hidden",
  },
});

export default StockScoreOverlay;
