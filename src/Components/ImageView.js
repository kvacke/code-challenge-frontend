import React, { useEffect } from "react";
import { createUseStyles } from "react-jss";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ImageInfoDialog from "./ImageInfoDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const useStyles = createUseStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    position: "relative",
    overflow: "visible",
    display: "flex",
    justifyContent: "center",
    outline: "none",
    backgroundColor: "white",
    width: "80%",
    height: "95%",
    borderRadius: "2px",
    alignItems: "center",
  },
  image: {
    maxWidth: "95%",
    maxHeight: "100%",
    objectFit: "contain",
  },
  infoButton: {
    position: "absolute",
    backgroundColor: "transparent",
    border: "1px solid grey",
    borderRadius: "5px",
    width: "80px",
    height: "25px",
    outline: "none",
    bottom: "10px",
    right: "15px",
    fontFamily: "Roboto",
    cursor: "pointer",
    color: "black",
    "&:hover": {
      //color:"darkgrey"
    },
  },
  infoIcon: {},
  arrow: {
    position: "absolute",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    fontSize: "35px",
    transition: "0.2s",
    color: "darkgrey",
    "&:hover": {
      color: "white",
    },
  },
  forwardArrow: {
    right: "-50px",
  },
  backwardArrow: {
    left: "-50px",
  },
});

const ImageView = ({
  isOpen,
  closeHandler,
  imgData,
  nextHandler,
  photos,
  startingIndex,
  previousHandler,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(startingIndex);
  const [infoDialogOpen, setInfoDialogOpen] = React.useState(false);

  const handleClose = () => {
    closeHandler();
  };

  const handlePrevious = () => {
    setIndex(index - 1);
  };

  const handleNext = () => {
    setIndex(index + 1);
    nextHandler(index);
  };

  const handleInfoIconClick = () => {
    setInfoDialogOpen(true);
  };

  const handleImageInfoDialogClose = () => {
    setInfoDialogOpen(false);
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          style: { backgroundColor: "black", opacity: 0.8 },
        }}
      >
        <Fade in={open}>
          <div className={classes.imageContainer}>
            {
              //Do not show 'previous image' arrow button if user reaches start of photo array
              index !== 0 && (
                <button
                  className={[classes.backwardArrow, classes.arrow].join(" ")}
                  onClick={handlePrevious}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
              )
            }

            <img
              className={classes.image}
              src={photos[index].urls.regular}
              alt=""
            />

            {
              //Do not show 'next image' arrow button if user reaches end of photo array
              index !== photos.length - 1 && (
                <button
                  className={[classes.forwardArrow, classes.arrow].join(" ")}
                  onClick={handleNext}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              )
            }

            <button
              className={classes.infoButton}
              onClick={handleInfoIconClick}
            >
              Details
            </button>

            <ImageInfoDialog
              closeHandler={handleImageInfoDialogClose}
              isOpen={infoDialogOpen}
              imgData={photos[index]}
              isDeskTopOrLaptop={true}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ImageView;
