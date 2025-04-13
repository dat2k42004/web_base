import React from "react";
import { Typography, Card, Button, CardContent, CardMedia, Link, List, ListItem, ListItemText, Divider } from "@mui/material";

import "./styles.css";
import { useParams } from "react-router-dom";

import models from "../../modelData/models";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const user = useParams();
  const data = models.userModel(user.userId);
  const photos = models.photoOfUserModel(user.userId);
  console.log(photos);
  if (!data) {
    return (
      <Typography variant="body1">
        User not found
      </Typography>
    );
  }
  if (!photos || photos.length === 0) {
    return (
      <Typography>{data.first_name} {data.last_name} donn't have a photo</Typography>
    )
  }
  return (
    <div>
      {/* <Typography variant="body1">
        This should be the UserPhotos view of the PhotoShare app. Since it is
        invoked from React Router the params from the route will be in property
        match. So this should show details of user:
        {user.userId}. You can fetch the model for the user
        from models.photoOfUserModel(userId):
      </Typography> */}
      <Typography variant="h5" component="div" gutterBottom>
        Photo by {data.first_name} {data.last_name}
      </Typography>
      {photos.map((photo) => {
        <Card key={photo._id} sx={{marginBottom: 2}}>
          <CardMedia component="jpg" image={`/images/${photo.file_name}`} alt={`Photo of ${data.first_name}`} sx={{ maxHeight: "400", objectFit: 'contain' }}></CardMedia>
          <CardContent>
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
              Posted on: photo.date_time
            </Typography>

            {photo.comments && photo.comments.length > 0 && (
              <div>
                <Typography variant="subtitle1" gutterBottom sx={{ marginTop: 1 }}>
                  Comments:
                </Typography>
                <List dense>
                  {photo.comments.map((comment) => (
                    <React.Fragment key={comment._id}>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={comment.comment}
                          secondary={
                            <>
                              <Typography
                                sx={{ display: 'inline' }}
                                component={Link}
                                to={`/users/${comment.user._id}`}
                                variant="body2"
                                color="text.primary"
                              >
                                {`${comment.user.first_name} ${comment.user.last_name}`}
                              </Typography>
                              {` — ${comment.date_time}`}
                            </>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </div>
            )}
            {!photo.comments || photo.comments.length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>No comments yet.</Typography>
            )}
          </CardContent>
        </Card>
      })}
    </div>
  );
}

export default UserPhotos;
