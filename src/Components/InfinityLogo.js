import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  logoLarge: {
    margin: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logoSmall: {
    margin: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconLarge: {
    fontSize: "80px",
  },
  iconSmall: {
    fontSize: "30px",
    marginRight: "15px ",
  },
  titleLarge: {
    fontFamily: "lobster",
    fontSize: "50px",
  },
  titleSmall: {
    fontSize: "35px",
    fontFamily: "lobster",
  },
});

const InfinityLogo = ({ isDesktopOrLaptop }) => {
  const classes = useStyles();

  return (
    <div className={isDesktopOrLaptop ? classes.logoLarge : classes.logoSmall}>
      <FontAwesomeIcon
        className={isDesktopOrLaptop ? classes.iconLarge : classes.iconSmall}
        icon={faCamera}
      />
      <div
        className={isDesktopOrLaptop ? classes.titleLarge : classes.titleSmall}
      >
        Stock Up!
      </div>
    </div>
  );
};

export default InfinityLogo;
