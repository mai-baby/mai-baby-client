import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";

function ControlledCarousel(props) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    props.getAllProducts();
  }, []);

  return (
    <>
      <h1 className="text-center m-2">
        Discover the Brand New NBA Toddlers Collection!
      </h1>
      <hr />
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        className="px-4"
        variant="dark"
      >
        <Carousel.Item>
          <Link className="text-center" to={`/products/`}>
            <Image
              src="https://ae01.alicdn.com/kf/Hfe75cc0eeb274874b57f72e4577528dcm/Kids-Love-No-23-Basketball-Set-kits-Girls-Basketball-jerseys-boys-basketball-short-sleeve-shirts-shorts.jpg_Q90.jpg_.webp"
              alt="Kid's Collection"
              className="d-block mx-auto"
              style={{ width: "100vw", maxWidth: "500px" }}
              fluid
            />
            <div className="carousel-bg">
              <Carousel.Caption>
                <h3 className="product-title">
                  Discover the whole Collection!
                </h3>
                <p style={{ fontSize: "2rem" }} className="pricetag">
                  Prices starting from 10€
                </p>
              </Carousel.Caption>
            </div>
          </Link>
        </Carousel.Item>
        {props.products.map((product) => {
          return (
            <Carousel.Item key={product._id}>
              <Link className="text-center" to={`/products/${product._id}`}>
                <Image
                  src={product.imageURL}
                  alt={product.title}
                  className="d-block mx-auto"
                  style={{ width: "100vw", maxWidth: "500px" }}
                  fluid
                />
                <div className="carousel-bg">
                  <Carousel.Caption>
                    <h3 className="product-title"> {product.title}</h3>
                    <p style={{ fontSize: "2rem" }} className="pricetag">
                      {product.price}€
                    </p>
                  </Carousel.Caption>
                </div>
              </Link>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  );
}

export default ControlledCarousel;
