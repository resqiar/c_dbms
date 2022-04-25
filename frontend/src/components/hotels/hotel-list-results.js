import axios from "axios";
import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Card,
  CardContent,
  InputAdornment,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import UpdateDialog from "./update-dialog";
import DeleteDialog from "./delete-dialog";

export const HotelListResults = ({ ...rest }) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getHotelList() {
    setLoading(true);
    try {
      const result = await axios.get("http://localhost:5000/hotels");

      if (result.data) {
        setHotels(result.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    getHotelList();
  }, []);

  const [search, setSearch] = useState();

  async function handleSearch() {
    if (!search) return;
    setLoading(true);

    try {
      const result = await axios.get(`http://localhost:5000/hotel/search/${search}`);

      if (result.data) {
        setLoading(false);
        setHotels(result.data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    if (!search) return getHotelList();
    handleSearch();
  }, [search]);

  return (
    <>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon color="action" fontSize="small">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search hotel"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050, overflow: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Action</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Website</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Floor</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Checkin Time</TableCell>
                  <TableCell>Checkout Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hotels.slice(0, limit).map((hotel) => (
                  <TableRow hover key={hotel.hotel_id}>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <UpdateDialog hotelId={hotel.hotel_id} />
                        <DeleteDialog hotelId={hotel.hotel_id} />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {hotel.hotel_name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{hotel.hotel_contact_number}</TableCell>
                    <TableCell>{hotel.hotel_email_address}</TableCell>
                    <TableCell>{hotel.hotel_website}</TableCell>
                    <TableCell>{hotel.hotel_description}</TableCell>
                    <TableCell>{hotel.hotel_floor_count}</TableCell>
                    <TableCell>{hotel.hotel_room_capacity}</TableCell>
                    <TableCell>{hotel.star_ratings_star_rating}</TableCell>
                    <TableCell>{new Date(hotel.check_in_time).toLocaleTimeString()}</TableCell>
                    <TableCell>{new Date(hotel.check_out_time).toLocaleTimeString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={hotels.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
  );
};
