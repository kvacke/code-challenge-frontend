import React from "react";
import ImageInfoDialog from "./ImageInfoDialog";
import { createUseStyles } from "react-jss";
import { useMediaQuery } from "react-responsive";
import StockScoreOverlay from "./StockScoreOverlay";

const CreatorHandle = ({ profileURL, imgURL, userName, isPortrait }) => {
  const classes = useStyles(isPortrait);
  return (
    <a className={classes.creatorHandle} href={profileURL}>
      <img className={classes.profileImage} src={imgURL} width="24px" alt="" />

      <div>{userName}</div>
    </a>
  );
};

const ListViewItem = ({ imgData }) => {
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const classes = useStyles(isPortrait);
  const [infoDialogOpen, setInfoDialogOpen] = React.useState(false);

  const handleInfoIconClick = () => {
    setInfoDialogOpen(true);
  };

  const handleImageInfoDialogClose = () => {
    setInfoDialogOpen(false);
  };

  return (
    /*container*/
    <div className={classes.container}>
      <CreatorHandle
        isPortrait={isPortrait}
        profileURL={imgData.user.links.html}
        imgURL={imgData.user.profile_image.medium}
        userName={imgData.user.username}
      />
      <div className={classes.imageContainer}>
        <StockScoreOverlay imgURL={imgData.urls.regular} isDesktop={false} />
        <img
          className={
            isPortrait ? classes.portraitImage : classes.landscapeImage
          }
          src={imgData.urls.regular}
          alt=""
        />
      </div>

      <button className={classes.infoButton} onClick={handleInfoIconClick}>
        Details
      </button>
      <ImageInfoDialog
        imgData={imgData}
        isOpen={infoDialogOpen}
        closeHandler={handleImageInfoDialogClose}
        isDesktopOrLaptop={false}
      />
    </div>
  );
};

const useStyles = createUseStyles({
  container: {
    display: "block",
    margin: {
      bottom: "50px",
    },
  },
  imageContainer: {
    position: "relative",
    height: "100%",
    display: "inline-block",
  },
  portraitImage: {
    position: "relative",
    width: "100%",
    zIndex: -1,
  },
  landscapeImage: {
    position: "relative",
    height: "90vh",
    zIndex: -1,
  },
  creatorHandle: {
    display: "flex",
    justifyContent: (props) => (props ? "left" : "center"),
    alignItems: "center",
    marginBottom: "5px",
    marginLeft: (props) => (props ? "10px" : "0px"),
    textDecoration: "none",
    color: "black",
    fontSize: "14px",
    fontWeight: "bold",
  },
  profileImage: {
    borderRadius: "50%",
    border: "1px solid lightgrey",
    margin: {
      right: "10px",
    },
  },
  infoButton: {
    backgroundColor: "transparent",
    border: "1px solid grey",
    borderRadius: "5px",
    width: "80px",
    height: "25px",
    outline: "none",
    marginTop: "5px",
    fontFamily: "Roboto",
    cursor: "pointer",
    color: "black",
    display: "block",
    position: "relative",
    left: "50%",
    transform: "translate(-50%, 0)",
  },
});

export default ListViewItem;
