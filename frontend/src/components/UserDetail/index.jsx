import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

import "./styles.css";
import { useParams, Link } from "react-router-dom";
import { userModel } from "../../modelData/model";
const { useNavigate } = require("react-router-dom");
/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail({user}) {
  const { userId } = useParams();
  // const data = models.userModel(user.userId);
  const navigate = useNavigate();
  const [data, setData] = useState();
  console.log(userId);
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await userModel(userId);
        setData(res);
        console.log("data: ", res);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [userId]);

  if (!data) {
    return (
      <Typography variant="body1">
        User not found
      </Typography>
    );
  }
  // ...existing code...
  return (
    <div className="user-detail-container">
      <Card className="user-detail-card">
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {data.first_name} {data.last_name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Location: {data.location}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Occupation: {data.occupation}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            Description: {data.description}
          </Typography>
          <Button variant="contained" component={Link} to={`/photos/${data._id}`}>
            View Photos
          </Button>
        </CardContent>
      </Card>
    </div>
  );
  // ...existing code...
}

export default UserDetail;
