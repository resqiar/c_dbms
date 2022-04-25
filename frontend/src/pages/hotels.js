import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";
import { HotelListToolbar } from "src/components/hotels/hotel-list-toolbar";
import { HotelListResults } from "src/components/hotels/hotel-list-results";

const Hotels = () => (
  <>
    <Head>
      <title>Hotels | Hotel Management System</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <HotelListToolbar />
        <Box sx={{ mt: 3 }}>
          <HotelListResults hotels={customers} />
        </Box>
      </Container>
    </Box>
  </>
);
Hotels.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Hotels;
