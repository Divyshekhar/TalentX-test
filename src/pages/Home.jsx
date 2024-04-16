import PropTypes from "prop-types";
import Dashboard from "./Dashboard";
import { Box, Typography, Button, Grid } from "@mui/material";
// import textImage from "../assets/images.jpg";
import backgroundImg from "../assets/backgr.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const cardData = [
  {
    image: backgroundImg,
    title: "Image 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    image: "image2.jpg",
    title: "Image 2",
    text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    image: "image3.jpg",
    title: "Image 3",
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    image: backgroundImg,
    title: "Image 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    image: "image2.jpg",
    title: "Image 2",
    text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    image: "image3.jpg",
    title: "Image 3",
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

import { useRef } from "react";
import CustomCard from "../components/Card";
const Home = ({ role }) => {
  const bottomSectionRef = useRef(null);

  const handleScrollToBottom = () => {
    bottomSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {role === "admin" ? (
        <Dashboard />
      ) : (
        <Box>
          <Box
            sx={{
              backgroundImage: `url(${backgroundImg})`,
              backgroundRepeat: "no-repeat",
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                color: "#fff",
                lineHeight: "1.5",
                fontFamily: "Roboto Mono",
                fontWeight: "Bold",
              }}
            >
              Meet TalentX
            </Typography>
            <br />
            <Typography
              variant="h5"
              style={{ color: "#fff", lineHeight: "1.5" }}
            >
              Get the most skilled workforce at the most affordable pricing
            </Typography>
            <br />
            <br />
            <Button
              onClick={handleScrollToBottom}
              variant="contained"
              color="primary"
              style={{
                borderRadius: "25px",
                padding: "15px 30px",
                fontSize: "16px",
              }}
            >
              Scroll Down
            </Button>
          </Box>

          <Box ref={bottomSectionRef} paddingY="50px">
            <Carousel responsive={responsive}>
              {cardData.map((card, index) => (
                <CustomCard
                  key={index}
                  image={card.image}
                  title={card.title}
                  text={card.text}
                />
              ))}
            </Carousel>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <img
                  src={backgroundImg}
                  alt="Your Image"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1">
                  Your text goes here. Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Nullam vestibulum scelerisque velit, sed
                  efficitur urna sollicitudin at. Fusce id metus a justo
                  fringilla sagittis.
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1">
                  Your text goes here. Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Nullam vestibulum scelerisque velit, sed
                  efficitur urna sollicitudin at. Fusce id metus a justo
                  fringilla sagittis.
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <img
                  src={backgroundImg}
                  alt="Your Image"
                  style={{ width: "100%" }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </>
  );
};

Home.propTypes = {
  role: PropTypes.string.isRequired,
};

export default Home;
