import React, { useEffect } from "react";
import { createUseStyles } from "react-jss";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useMediaQuery } from "react-responsive";

TimeAgo.addLocale(en);

const useStyles = createUseStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imageInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
    background:
      "linear-gradient(0deg, rgba(255,255,255,0.9471989479385504) 0%, rgba(247,247,247,0.9556023092830882) 48%);",
    outline: "none",
    borderRadius: "10px",
    maxWidth: (props) => (props ? "500px" : "90%"),
    fontFamily: "Roboto",
    padding: (props) => (props ? "40px" : "15px"),
  },
  imageDescription: {
    display: "table",
    textAlign: "center",
    fontFamily: "Patua one",
    fontSize: (props) => (props ? "30px" : "18px"),
    marginBottom: "10px",
  },
  dataItem: {
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    alignItems: "center",
    width: "100px",
    margin: (props) => (props ? "20px" : "5px"),
  },
  dataItemsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    flexWrap: "wrap",
  },
  dataItemTitle: {
    color: "gray",
    fontSize: (props) => (props ? "20px" : "14px"),
  },
  dataItemValue: {
    fontSize: (props) => (props ? "20px" : "14px"),
    textAlign: "center",
  },
  creatorHandle: {
    display: "flex",
    flexDirection: "row",
    textDecoration: "none",
    border: "none",
    color: "black",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: (props) => (props ? "30px" : "10px"),
  },
  profileImage: {
    borderRadius: "50%",
    marginRight: "10px",
  },
  unsplashLink: {
    textDecoration: "none",
    color: "purple",
  },
});

function capitalizeFirstLetter(string) {
  if (string) {
    return "'" + string.charAt(0).toUpperCase() + string.slice(1) + "'";
  } else {
    return "Untitled";
  }
}

const ImageInfoDataItem = ({ title, value, isDesktop }) => {
  const classes = useStyles(isDesktop);
  return (
    <div className={classes.dataItem}>
      <div className={classes.dataItemTitle}>{title}</div>
      <div className={classes.dataItemValue}>{value}</div>
    </div>
  );
};

const CreatorHandle = ({ profileURL, imgURL, userName, isDesktop }) => {
  const classes = useStyles(isDesktop);
  return (
    <a className={classes.creatorHandle} href={profileURL}>
      <img className={classes.profileImage} src={imgURL} width="30px" alt="" />
      <div>{userName}</div>
    </a>
  );
};

const ImageInfoDialog = ({ imgData, isOpen, closeHandler }) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery({ query: "(min-device-width: 1224px)" });
  const classes = useStyles(isDesktop);
  const timeAgo = new TimeAgo("en-US");
  const imageDate = new Date(imgData.created_at);

  const handleClose = () => {
    closeHandler();
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        style: { backgroundColor: "white", opacity: 0.4 },
      }}
    >
      <Fade in={open}>
        <div className={classes.imageInfo}>
          <div className={classes.imageDescription}>
            {imgData.description
              ? capitalizeFirstLetter(imgData.description)
              : capitalizeFirstLetter(imgData.alt_description)}
          </div>
          <CreatorHandle
            profileURL={imgData.user.links.html}
            imgURL={imgData.user.profile_image.medium}
            userName={imgData.user.username}
            isDesktop={isDesktop}
          />
          <div className={classes.dataItemsContainer}>
            <ImageInfoDataItem
              title="Created"
              value={timeAgo.format(imageDate)}
            />
            <ImageInfoDataItem
              title="Full name"
              value={
                (imgData.user.first_name ?? "") +
                " " +
                (imgData.user.last_name ?? "")
              }
            />
            <ImageInfoDataItem
              title="User location"
              value={imgData.user.location ?? "?"}
            />
            <ImageInfoDataItem title="Liked" value={imgData.likes + " times"} />
            <ImageInfoDataItem title="Width" value={imgData.width + "px"} />
            <ImageInfoDataItem title="Height" value={imgData.height + "px"} />
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default ImageInfoDialog;
