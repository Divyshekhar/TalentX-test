import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  CircularProgress,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box,
} from "@mui/material";

const MySubscriptions = ({ username, isLoggedIn, isAdmin }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://6619abd2125e9bb9f29a88d2.mockapi.io/api/v1/user-subscription"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch subscriptions");
        }
        const allSubscriptions = await response.json();

        const filteredSubscriptions = isAdmin
          ? allSubscriptions
          : allSubscriptions.filter(
              (subscription) => subscription.user === username
            );

        setSubscriptions(filteredSubscriptions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchSubscriptions();
    }
  }, [username, isLoggedIn, isAdmin]);

  return (
    <Box sx={{ p: "20px" }}>
      <Typography variant="h4" gutterBottom>
        {isAdmin ? "All user subscriptions" : "My Subscriptions"}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : subscriptions.length === 0 ? (
        <Typography variant="body1">No data found</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Contact Person</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Subscription Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell>{subscription.contactPerson}</TableCell>
                  <TableCell>{subscription.createdAt}</TableCell>
                  <TableCell>{subscription.subName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

MySubscriptions.propTypes = {
  username: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default MySubscriptions;
