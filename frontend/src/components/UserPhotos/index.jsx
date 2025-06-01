import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  TextField,
  Button
} from "@mui/material";

import "./styles.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import { userModel, photoOfUserModel, userListModel, AddComment, AddPhoto } from "../../modelData/model";

/**
 * Define UserPhotos, a React component of Project 4.
 */

function UserPhotos({ user }) {
  const { userId } = useParams();
  // const data = models.userModel(user.userId);
  // const photos = models.photoOfUserModel(user.userId);
  const [data, setData] = useState();
  const [photos, setPhotos] = useState();
  const [listUser, setListUser] = useState();
  const [comment, setComment] = useState("");
  const [addForm, setAddForm] = useState(false);
  const [photo, setPhoto] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  const getData = async () => {
    try {
      const res1 = await userModel(userId);
      const res2 = await photoOfUserModel(userId);
      const res3 = await userListModel();
      setData(res1);
      setPhotos(res2);
      setListUser(res3);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  console.log("data: ", data);
  console.log("photo: ", photos);
  if (!data) {
    return <Typography variant="body1">User not found</Typography>;
  }
  // if (!photos || photos.length === 0) {
  //   return (
  //     <Typography>
  //       {data.last_name} donn't have a photo
  //       {user._id === data._id && <button onClick={() => setAddForm(true)}>{!addForm ? "AddPhoto" : "Cancel"}</button>}
  //     </Typography>
  //   );
  // }

  const handelComment = async (e, photoId) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert("Please enter a comment.");
      return;
    }
    try {
      const payload = {
        user_id: user._id,
        comment: comment,
      };
      const res = await AddComment(photoId, payload);
      alert("Comment posted successfully");
      setComment("");
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPhoto = async (e) => {
    e.preventDefault();
    // console.log("photo: ", photo);
    if (!photo.trim()) {
      alert("Please enter a photo.");
      return;
    }


    try {
      const payload = {
        user_id: user._id,
        file_name: photo,
      };
      const res = await AddPhoto(payload);
      alert("Photo added successfully");
      setPhoto("");
      setAddForm(false);
      getData();
    } catch (error) {
      alert(error);
    }
  }

  // ...existing code...
  return (
    <div className="user-photos-container">
      <Card className="user-photos-card">
        <CardContent>
          {photos && photos.length > 0 ? (
            <div>
              <div className="user-photos-header">
                <h1>
                  Photo of{" "}
                  <Link to={`/users/${data._id}`} className="user-link">
                    {data.first_name} {data.last_name}
                  </Link>
                </h1>
                {user._id === data._id && (
                  <button className="add-photo-btn" onClick={() => setAddForm(!addForm)}>
                    {!addForm ? "Add Photo" : "Cancel"}
                  </button>
                )}
              </div>
              {!addForm && (
                <div>
                  {photos.map((photo) => (
                    <Card key={photo._id} className="photo-block" sx={{ mb: 3, p: 2 }}>
                      <CardContent>
                        <div className="photo-img-block">
                          <img src={`../../images/${photo.file_name}`} alt="" className="photo-img" />
                          <p className="photo-date">Post at: {photo.date_time}</p>
                        </div>
                        <div className="photo-comments-block">
                          {photo.comments && photo.comments.length > 0 ? (
                            <div>
                              <p className="comments-title">List of comments:</p>
                              {photo.comments.map((item) => (
                                <Card key={item._id} className="comment-card" sx={{ mb: 1, p: 1 }}>
                                  <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom>
                                      <Link to={`/users/${item.user_id}`} className="user-link">
                                        {listUser.find((e) => e._id === item.user_id)?.first_name} {listUser.find((e) => e._id === item.user_id)?.last_name}
                                      </Link>
                                    </Typography>
                                    <Typography variant="body2">
                                      Comment: {item.comment}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      Post at: {item.date_time}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          ) : (
                            <div className="no-comment">No comment</div>
                          )}
                        </div>
                        <div className="comment-form-block">
                          <form onSubmit={(e) => handelComment(e, photo._id)}>
                            <input
                              type="text"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="Enter your comment"
                              className="comment-input"
                            />
                            <button type="submit" className="comment-btn">Post</button>
                          </form>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="no-photo-block">
              <Typography variant="body1">
                {data.last_name} doesn't have a photo
                <br />
                {user._id === data._id && (
                  <button className="add-photo-btn" onClick={() => setAddForm(!addForm)}>
                    {!addForm ? "Add Photo" : "Cancel"}
                  </button>
                )}
              </Typography>
            </div>
          )}

          {addForm && (
            <Box className="add-photo-form-block" sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <form onSubmit={handleAddPhoto} style={{ width: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Upload Photo
                </Typography>
                <TextField
                  type="file"
                  fullWidth
                  inputProps={{ accept: "image/*" }}
                  className="photo-input"
                  onChange={(e) => setPhoto(e.target.files[0]?.name)}
                  sx={{ mb: 2, background: "#fff", borderRadius: 1 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="comment-btn"
                  fullWidth
                >
                  Post
                </Button>
              </form>
            </Box>
          )}
        </CardContent>
      </Card>
    </div>
  );
  // ...existing code...
}

export default UserPhotos;
