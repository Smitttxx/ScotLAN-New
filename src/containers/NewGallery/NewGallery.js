import ImageGallery from 'react-image-gallery';
import React, { Component } from "react";
import "./NewGallery.css";

export default class NewGallery extends Component {

  render() {

    const images = [
      {
        original: 'http://lorempixel.com/1000/600/nature/1/',
        thumbnail: 'http://lorempixel.com/250/150/nature/1/',
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/2/',
        thumbnail: 'http://lorempixel.com/250/150/nature/2/'
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/3/',
        thumbnail: 'http://lorempixel.com/250/150/nature/3/'
      }
    ]

    return (
      <div className="keyboard-background">
        <div className="section-container">
          <div className="section-container-keyboard">
            <div className="container">
              <ImageGallery items={images} />
              </div>
            </div>
          </div>
        </div>
    );
  }

}
