import axios from "axios";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteDialog({ hotelId }) {
  const [open, setOpen] = useState(false);

  async function deleteHotel() {
    try {
      const result = await axios.post("http://localhost:5000/delete/hotel", {
        hotel_id: hotelId,
      });

      if (result.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <IconButton
        sx={{ padding: "0px", marginLeft: "2px" }}
        title="Delete"
        onClick={() => setOpen(true)}
      >
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle id="alert-dialog-title">Delete Hotel?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete hotel will remove selected hotel from the list. This action is irreversible and
            must be processed with caution.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => deleteHotel()}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
