import { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  TextField,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { NavLink } from "react-router-dom";

const SubscriptionModal = ({
  open,
  handleClose,
  plan,
  username,
  isLoggedIn,
  handleSnackbarOpen,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(username || "");
  const [sameAsEmail, setSameAsEmail] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCheckboxChange = () => {
    setSameAsEmail((prev) => !prev);
    if (!sameAsEmail) {
      setName(email);
    } else {
      setName("");
    }
  };

  const handleSubscribe = async () => {
    try {
      setSubscribing(true);
      const allSubscriptionsResponse = await fetch(
        "https://6619abd2125e9bb9f29a88d2.mockapi.io/api/v1/user-subscription"
      );
      if (!allSubscriptionsResponse.ok) {
        throw new Error("Failed to fetch subscriptions");
      }
      const allSubscriptions = await allSubscriptionsResponse.json();

      const userSubscriptions = allSubscriptions.filter(
        (subscription) => subscription.user === email
      );

      const isSubscribed = userSubscriptions.some(
        (subscription) => subscription.subId === plan.id
      );
      if (isSubscribed) {
        handleSnackbarOpen("User is already subscribed to this plan", "error");
        handleClose();
        return;
      }

      const response = await fetch(
        "https://6619abd2125e9bb9f29a88d2.mockapi.io/api/v1/user-subscription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: email,
            contactPerson: name,
            subId: plan.id,
            subName: plan.name,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }
      handleSnackbarOpen(
        "User subscribed to this plan successfully",
        "success"
      );
      handleClose();
    } catch (error) {
      console.error("Error subscribing:", error);
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Subscription Details</DialogTitle>
      <DialogContent>
        {isLoggedIn ? (
          <>
            <Typography variant="h6" gutterBottom>
              {plan?.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {plan?.description}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Price: {plan?.price}
            </Typography>
            <TextField
              margin="normal"
              label="Contact person"
              variant="outlined"
              fullWidth
              value={name}
              onChange={handleNameChange}
              disabled={sameAsEmail}
            />
            <TextField
              margin="normal"
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={handleEmailChange}
              InputProps={{
                readOnly: true,
                disabled: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={sameAsEmail}
                  onChange={handleCheckboxChange}
                />
              }
              label="Contact person same as email"
            />
          </>
        ) : (
          <Typography variant="body2" color="error" align="center">
            Please{" "}
            <NavLink
              to={{
                pathname: "/login",
                search: "?redirect=subscriptions",
              }}
            >
              login
            </NavLink>{" "}
            to subscribe.
          </Typography>
        )}
      </DialogContent>
      {isLoggedIn ? (
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button
            onClick={handleSubscribe}
            color="primary"
            variant="contained"
            disabled={subscribing}
          >
            {subscribing ? "Subscribing..." : "Subscribe"}
          </Button>
        </DialogActions>
      ) : null}
    </Dialog>
  );
};

SubscriptionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  plan: PropTypes.object,
  username: PropTypes.string.isRequired,
};

export default SubscriptionModal;
