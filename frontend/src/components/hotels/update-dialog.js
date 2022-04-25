import axios from "axios";
import { useState, useEffect } from "react";
import { Button, TextField, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import EditIcon from "@mui/icons-material/Edit";

export default function UpdateDialog({ hotelId }) {
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

  async function getHotel() {
    try {
      const result = await axios.get(`http://localhost:5000/hotel/${hotelId}`);

      if (result.data) {
        const hotel = result.data[0];
        if (!hotel) return;
        setName(hotel.hotel_name);
        setContact(hotel.hotel_contact_number);
        setEmail(hotel.hotel_email_address);
        setWebsite(hotel.hotel_website);
        setDesc(hotel.hotel_description);
        setFloor(hotel.hotel_floor_count);
        setRoom(hotel.hotel_room_capacity);
        setRating(hotel.star_ratings_star_rating);
        setCheckIn(new Date(hotel.check_in_time));
        setCheckOut(new Date(hotel.check_out_time));
      }
    } catch (error) {
      console.log(error);
    }
  }

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

  async function handleUpdate() {
    if (!validate()) return;

    try {
      const result = await axios.post("http://localhost:5000/update/hotel", {
        hotel_id: hotelId,
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

  const [openUpdate, setOpenUpdate] = useState(false);

  useEffect(() => {
    getHotel();
  }, []);

  return (
    <>
      <IconButton sx={{ padding: "0px" }} title="Edit" onClick={() => setOpenUpdate(true)}>
        <EditIcon />
      </IconButton>
      <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)}>
        <DialogTitle>Update Hotel</DialogTitle>
        <DialogContent>
          <DialogContentText>Input information to update hotel item.</DialogContentText>
          <div style={{ margin: "8px" }}>
            <TextField
              autoComplete="off"
              autoFocus
              value={name}
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
              value={contact}
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
              value={email}
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
              value={website}
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
              value={desc}
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
              value={floor}
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
              value={room}
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
              value={rating}
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
                value={checkIn}
                label="Checkin Time"
                onChange={(value) => setCheckIn(value)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </div>
            <div style={{ margin: "18px 0px" }}>
              <TimePicker
                value={checkOut}
                views={["hours", "minutes"]}
                label="Checkout Time"
                onChange={(value) => setCheckOut(value)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdate(false)}>Cancel</Button>
          <Button onClick={() => handleUpdate()} disabled={!validate()}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
