import ControlledCarousel from "../../components/home/ControlledCarousel";

function HomePage(props) {
  return (
    <div>
      <ControlledCarousel
        products={props.products}
        getAllProducts={props.getAllProducts}
      />
    </div>
  );
}

export default HomePage;
