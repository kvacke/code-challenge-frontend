import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  blurb: {
    margin: "0 auto",
    fontFamily: "Roboto",
    fontSize: "18px",
    textAlign: "center",
    width: (props) => (props ? "75%" : "93%"),
    marginBottom: "20px",
    lineHeight: 1.4,
  },
  companyNameInBlurb: {
    fontFamily: "lobster",
    display: "inline",
  },
  link: {
    color: "black",
    textDecoration: "none",
    borderBottom: "1px dotted",
  },
});

const Blurb = ({ isDesktopOrLaptop }) => {
  const classes = useStyles(isDesktopOrLaptop);

  return (
    <div className={classes.blurb}>
      Just pick a random photo on{" "}
      <a className={classes.link} href="https://unsplash.com/">
        Unsplash.com{" "}
      </a>
      for your ad or wallpaper, right? Wrong.
      <br />
      <span className={classes.companyNameInBlurb}>Stock Up!</span> offers the
      same content and harmonious scrolling experience, but spares you from
      looking at images that don't live up to our high standards of stock
      photography.
      <br />
      <br />
      Any Unsplash photo with an{" "}
      <a
        className={classes.link}
        href="https://labs.everypixel.com/api/ugc-photo-scoring"
      >
        EveryPixel UGC Quality Score
      </a>{" "}
      below 70% is censored.
      <br />
      Focus your attention on pictures that really matter.
    </div>
  );
};

export default Blurb;
