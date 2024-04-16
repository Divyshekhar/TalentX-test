import { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import SubscriptionModal from "../components/SubscriptionModal";
import PropTypes from "prop-types";

const subscriptionPlans = [
  {
    id: "4g",
    name: "4 Months Gold",
    description: "Get access for 4 months. Limited time offer!",
    price: "$20",
  },
  {
    id: "4s",
    name: "4 Months Silver",
    description: "Enjoy 4 months of unlimited access at a discounted rate.",
    price: "$25",
  },
  {
    id: "4b",
    name: "4 Months Bronze",
    description: "Access our platform for 4 months at a great price.",
    price: "$30",
  },
  {
    id: "6g",
    name: "6 Months Gold",
    description: "Subscribe for 6 months and save big!",
    price: "$35",
  },
  {
    id: "6s",
    name: "6 Months Silver",
    description: "Subscribe for 6 months and save big!",
    price: "$40",
  },
  {
    id: "6b",
    name: "6 Months Bronze",
    description: "Get unlimited access for 6 months at a discounted price.",
    price: "$45",
  },
  {
    id: "12g",
    name: "12 Months Gold",
    description: "Enjoy 12 months of unlimited access at a discounted rate.",
    price: "$50",
  },
  {
    id: "12s",
    name: "12 Months Silver",
    description: "Subscribe for 12 months and save big!",
    price: "$55",
  },
  {
    id: "12b",
    name: "12 Months Bronze",
    description: "Access our platform for 12 months at a great price.",
    price: "$60",
  },
];

const SubscriptionTiles = ({ username, isLoggedIn, isAdmin }) => {
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVariant, setSnackbarVariant] = useState("");

  const handleSnackbarOpen = (message, variant) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setSnackbarVariant(variant);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubscribeClick = (plan) => {
    setSelectedPlan(plan);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ p: "20px" }}>
      <h2>Subscription Plans</h2>
      <Grid container spacing={3}>
        {subscriptionPlans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                minHeight: 200,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ marginBottom: 2 }}>
                {plan.name}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                {plan.description}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubscribeClick(plan)}
                disabled={isAdmin}
              >
                Subscribe
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <SubscriptionModal
        open={open}
        handleClose={handleClose}
        plan={selectedPlan}
        username={username}
        isLoggedIn={isLoggedIn}
        handleSnackbarOpen={handleSnackbarOpen}
        handleSnackbarClose={handleSnackbarClose}
      />
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        severity={snackbarVariant}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarVariant}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

SubscriptionTiles.propTypes = {
  username: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool,
  isAdmin: PropTypes.bool.isRequired,
};

export default SubscriptionTiles;
