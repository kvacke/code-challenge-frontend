import React, { Component } from "react";
import axios from "axios";
import MasonryItem from "./MasonryItem";
import ImageView from "./ImageView";
import ListViewItem from "./ListViewItem";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import InfinityLogo from "./InfinityLogo";
import Blurb from "./Blurb";

class InfiniteScroll extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      page: 1,
      prevY: 0,
      imageViewCurrentIndex: null,
      imageViewVisible: false,
    };
  }

  componentDidMount() {
    this.getPhotos(this.state.page);
    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.0,
    };
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      this.getPhotos();
    }
    this.setState({ prevY: y });
  }

  getPhotos() {
    this.setState({ loading: true });
    axios
      .get(
        `https://api.unsplash.com/photos/?page=${this.state.page}&per_page=15&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`
      )
      .then((res) => {
        this.setState({ photos: [...this.state.photos, ...res.data] });
        this.setState({ page: this.state.page + 1 });
      })
      .catch((e) => {
        console.log(e.response);
      });
  }

  handleImageClick = (index) => {
    this.setState({ imageViewCurrentIndex: index }, function () {
      this.setState({ imageViewVisible: true });
    });
  };

  handleImageViewClose = () => {
    this.setState({ imageViewVisible: false, imageViewCurrentIndex: null });
  };

  handleImageViewNext = (index) => {
    if (index === this.state.photos.length - 3) {
      this.getPhotos();
    }
  };

  handleImageViewPrevious = (index) => {
    this.setState({ imageViewCurrentIndex: index - 1 });
  };

  render() {
    const loadingCSS = {
      height: "1000px",
      position: "absolute",
      bottom: 0,
    };

    const containerCSS = {
      margin: "0 auto",
      maxWidth: "1100px",
      position: "relative",
    };

    return (
      <div data-testid="container" className="container" style={containerCSS}>
        <InfinityLogo isDesktopOrLaptop={this.props.isDesktopOrLaptop} />
        <Blurb isDesktopOrLaptop={this.props.isDesktopOrLaptop} />
        {this.state.photos[this.state.imageViewCurrentIndex] && (
          <ImageView
            isOpen={this.state.imageViewVisible}
            startingIndex={this.state.imageViewCurrentIndex}
            photos={this.state.photos}
            //input handlers
            closeHandler={this.handleImageViewClose}
            nextHandler={this.handleImageViewNext}
            previousHandler={this.handleImageViewPrevious}
            //imgData={this.state.photos[this.state.imageViewCurrentIndex]}
          />
        )}

        {this.props.isDesktopOrLaptop && (
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 400: 1, 800: 2, 1200: 3 }}
          >
            <Masonry gutter="1vw">
              {this.state.photos.map((data, index) => {
                return (
                  <MasonryItem
                    key={index}
                    clickHandler={this.handleImageClick}
                    index={index}
                    imgURL={data.urls.regular}
                  />
                );
              })}
            </Masonry>
          </ResponsiveMasonry>
        )}

        {!this.props.isDesktopOrLaptop &&
          this.state.photos.length > 0 &&
          this.state.photos.map((data, index) => {
            return <ListViewItem key={index} imgData={data} />;
          })}

        <div
          ref={(loadingRef) => (this.loadingRef = loadingRef)}
          style={loadingCSS}
        />
      </div>
    );
  }
}

export default InfiniteScroll;
