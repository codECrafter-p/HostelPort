import React from "react";
import "./css/Front.css";
// import front from './rooms/front.png';
// import hken from './rooms/hken.png'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Front() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div>
      <Slider {...settings}>
        <div className="frnt frnt1">
          <h2>
            Luxury space that you can afford
            <br />
            where dreams come true
          </h2>
        </div>
        <div className="frnt frnt2">
          <h2>
            Luxury space that you can afford
            <br />
            where dreams come true
          </h2>
        </div>
        <div className="frnt frnt3">
          <h2>
            Luxury space that you can afford
            <br />
            where dreams come true
          </h2>
        </div>
      </Slider>
    </div>
  );
}

export default Front;
