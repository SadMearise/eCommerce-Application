import Carousel from "react-material-ui-carousel";
import Item from "./Item";
// import { Paper, Button } from "@mui/material";

function ProductSlider() {
  const items = [
    {
      title: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      title: "Random Name #2",
      description: "Hello World!",
    },
  ];

  return (
    <Carousel>
      {items.map((item, i) => (
        <Item
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          info={item}
        />
      ))}
    </Carousel>
  );
}

export default ProductSlider;

// function Item(props) {
//   return (
//     <Paper>
//       <h2>{props.item.name}</h2>
//       <p>{props.item.description}</p>

//       <Button className="CheckButton">Check it out!</Button>
//     </Paper>
//   );
// }
