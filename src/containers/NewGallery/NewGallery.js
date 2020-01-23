import ImageGallery from 'react-image-gallery';
import React, { Component } from "react";
import "./NewGallery.css";
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";

export default class NewGallery extends Component {

  render() {

    const images1 = [
      {
        original: 'https://scotlansiteimages.s3.eu-west-2.amazonaws.com/sltest/ScotLAN%231/DeskPlacemat.jpg',
        thumbnail: 'https://scotlansiteimages.s3.eu-west-2.amazonaws.com/sltest/ScotLAN%231/DeskPlacemat.jpg',
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

    const images2 = [
      {
        original: 'https://scotlansiteimages.s3.eu-west-2.amazonaws.com/sltest/ScotLAN%231/DeskPlacemat.jpg',
        thumbnail: 'https://scotlansiteimages.s3.eu-west-2.amazonaws.com/sltest/ScotLAN%231/DeskPlacemat.jpg',
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
              <ImageGallery items={images1}
              slideOnThumbnailOver='true'
              showBullets='true'
              showIndex='true' />

              <ImageGallery items={images2}
              slideOnThumbnailOver='true'
              showBullets='true'
              showIndex='true' />
              </div>
            </div>
          </div>
        </div>
    );
  }

}
