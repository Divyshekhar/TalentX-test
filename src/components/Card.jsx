import PropTypes from "prop-types";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const CustomCard = ({ image, title, text }) => {
  return (
    <Card sx={{ maxWidth: 345, minHeight: "300px" }}>
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};

CustomCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default CustomCard;
