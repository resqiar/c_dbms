import { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export const HotelListToolbar = (props) => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState();
  const [contact, setContact] = useState();
  const [email, setEmail] = useState();
  const [website, setWebsite] = useState();
  const [desc, setDesc] = useState();
  const [floor, setFloor] = useState();
  const [room, setRoom] = useState();
  const [rating, setRating] = useState();
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function validate() {
    if (
      !name ||
      !contact ||
      !email ||
      !website ||
      !desc ||
      !floor ||
      !room ||
      !rating ||
      !checkIn ||
      !checkOut
    ) {
      return false;
    }
    return true;
  }

  async function handleCreate() {
    if (!validate()) return;

    try {
      const result = await axios.post("http://localhost:5000/create/hotel", {
        name: name,
        contact: contact,
        email: email,
        website: website,
        desc: desc,
        floor: floor,
        room: room,
        rating: rating,
        check_in_time: checkIn,
        check_out_time: checkOut,
      });

      if (result.status === 200) {
        return window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Hotels
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button color="primary" variant="contained" onClick={() => handleClickOpen()}>
            Add Hotels
          </Button>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create Hotel</DialogTitle>
            <DialogContent>
              <DialogContentText>Input information to create hotel item.</DialogContentText>
              <div style={{ margin: "8px" }}>
                <TextField
                  autoComplete="off"
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Hotel Name"
                  type="text"
                  fullWidth
                  sx={{ marginTop: "8px" }}
                  variant="standard"
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  autoComplete="off"
                  margin="dense"
                  label="Hotel Contact"
                  type="text"
                  fullWidth
                  sx={{ marginTop: "8px" }}
                  variant="standard"
                  onChange={(e) => setContact(e.target.value)}
                />
                <TextField
                  autoComplete="off"
                  margin="dense"
                  id="email"
                  label="Email Address"
                  type="email"
                  fullWidth
                  sx={{ marginTop: "8px" }}
                  variant="standard"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  autoComplete="off"
                  margin="dense"
                  label="Hotel Website"
                  type="text"
                  fullWidth
                  sx={{ marginTop: "8px" }}
                  variant="standard"
                  onChange={(e) => setWebsite(e.target.value)}
                />
                <TextField
                  autoComplete="off"
                  margin="dense"
                  label="Hotel Description"
                  type="text"
                  fullWidth
                  sx={{ marginTop: "8px" }}
                  variant="standard"
                  onChange={(e) => setDesc(e.target.value)}
                />
                <TextField
                  autoComplete="off"
                  margin="dense"
                  label="Hotel Total Floor"
                  type="number"
                  fullWidth
                  sx={{ marginTop: "8px" }}
                  variant="standard"
                  onChange={(e) => setFloor(e.target.value)}
                />
                <TextField
                  autoComplete="off"
                  margin="dense"
                  label="Hotel Total Rooms"
                  type="number"
                  fullWidth
                  sx={{ marginTop: "8px" }}
                  variant="standard"
                  onChange={(e) => setRoom(e.target.value)}
                />
                <TextField
                  autoComplete="off"
                  margin="dense"
                  label="Hotel Rating"
                  type="number"
                  fullWidth
                  sx={{ marginTop: "8px" }}
                  variant="standard"
                  onChange={(e) => setRating(e.target.value)}
                />
                <div style={{ margin: "24px 0px 18px 0px" }}>
                  <TimePicker
                    label="Checkin Time"
                    value={checkIn}
                    onChange={(value) => setCheckIn(value)}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                  />
                </div>
                <div style={{ margin: "18px 0px" }}>
                  <TimePicker
                    views={["hours", "minutes"]}
                    label="Checkout Time"
                    value={checkOut}
                    onChange={(value) => setCheckOut(value)}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                  />
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => handleCreate()} disabled={!validate()}>
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
};
