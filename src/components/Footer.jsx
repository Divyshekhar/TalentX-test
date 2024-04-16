import { Typography, Link, Container } from "@mui/material";

const Footer = () => {
  return (
    <footer
      style={{
        // padding: "20px",
        // marginTop: "auto",
        backgroundColor: "#424242",
        color: "#fff",
      }}
    >
      <Container maxWidth="100%">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} TalentX <br />
          All Rights Reserved.
        </Typography>
        <Typography variant="body2" align="center">
          Made with ❤️ by <Link href="https://www.example.com/">Your Name</Link>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
