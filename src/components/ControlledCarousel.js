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
        {props.products.map((product) => {
          return (
            <Carousel.Item key={product._id}>
              <Link className="text-center" to={`/products/${product._id}`}>
                <Image
                  src={product.imageURL}
                  alt={product.title}
                  className="d-block w-100"
                  fluid
                />
                <Carousel.Caption>
                  <h3> {product.title}</h3>
                  <p>{product.price}€</p>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  );
}

export default ControlledCarousel;
