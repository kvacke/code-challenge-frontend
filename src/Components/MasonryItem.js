import React from "react";
import { createUseStyles } from "react-jss";
import StockScoreOverlay from "./StockScoreOverlay";

const MasonryItem = ({ imgURL, clickHandler, index }) => {
  const classes = useStyles();
  const handleClick = () => {
    clickHandler(index);
  };

  return (
    <div className={classes.imageContainer} onClick={handleClick}>
      <StockScoreOverlay imgURL={imgURL} index={index} isDesktop={true} />
      <img className={classes.image} src={imgURL} alt="" />
    </div>
  );
};

const useStyles = createUseStyles({
  imageContainer: {
    position: "relative",
    borderRadius: "10px",
    "& :hover": {
      cursor: "zoom-in",
    },
  },
  image: {
    position: "relative",
    width: "100%",
    borderRadius: "3px",
    zIndex: -1,
  },
});

export default MasonryItem;
