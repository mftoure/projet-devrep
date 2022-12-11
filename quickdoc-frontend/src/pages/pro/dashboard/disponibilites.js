import { Container, Typography, Box, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
// layouts
import Layout from '../../../layouts';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';

import useAuth from '../../../hooks/useAuth';

import { fDate, fTimestamp } from '../../../utils/formatTime';
import axios from 'axios';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

disponibilites.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function disponibilites() {
  const { themeStretch } = useSettings();
  const { user, idToken } = useAuth();
  const [open, setOpen] = useState(false);
  const [newDate, setNewDate] = useState(dayjs(""));
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (newValue) => {
    setNewDate(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async () => {
    try {
      console.log(newDate);
      const resp = await axios.post(process.env.HOST_API_KEY + '/api/professionnels/' + user.id + '/creneaux', { creneauDate: newDate.format("DD-MM-YYYYTHH:mm") }, { headers: { 'Authorization': 'Bearer ' + idToken } });
      handleClose();
      enqueueSnackbar('Ajout réussi!');
      window.location.reload();

    } catch (error) {
      console.log(error);
      enqueueSnackbar("Il y a eu une erreur, Veuillez réessayer !", { variant: 'error' });
    }
  }
  
  const handleDelete = async (id) => {
    try {
      const resp = await axios.delete(process.env.HOST_API_KEY + '/api/creneaux/' + id,{ headers: { 'Authorization': 'Bearer ' + idToken } });
      window.location.reload();
      enqueueSnackbar('Suppression réussi!');
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Il y a eu une erreur, Veuillez réessayer !", { variant: 'error' });
    }
  }

  return (
    <Page title="Mes disponibilités">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Mes disponibilites
        </Typography>
        <Stack direction="row" justifyContent="flex-end">
          <Button onClick={handleClickOpen} variant='contained' style={{ "height": "45px", "marginBottom": "30px" }}>Ajouter une disponibilité</Button>
          <Dialog open={open} onClose={handleClose} >
            <DialogTitle>Ajouter une disponibilité</DialogTitle>
            <DialogContent style={{ height: "100px", width: "300px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>

                <DateTimePicker
                  value={newDate}
                  inputFormat="DD-MM-YYYY HH:mm"
                  ampm={false}
                  disablePast={true}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAdd}>Ajouter</Button>
            </DialogActions>

          </Dialog>

        </Stack>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{"boxShadow":"none", "borderRadius":"0"}}>ID</TableCell>
                <TableCell  align="center">Date</TableCell>
                <TableCell align="center">Heure</TableCell>
                <TableCell align="center">Réservé ?</TableCell>
                <TableCell style={{"boxShadow":"none", "borderRadius":"0"}} align="center">Supprimer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.creneaux.map((creneau) => (
                <TableRow
                  key={creneau.id}
                >
                  <TableCell component="th" scope="row">
                    {creneau.id}
                  </TableCell>
                  <TableCell align="center">{creneau.creneauDate.split("T")[0]}</TableCell>
                  <TableCell align="center">{creneau.creneauDate.split("T")[1]}</TableCell>
                  <TableCell align="center">{creneau.reserver ? "Oui" : "Non"}</TableCell>
                  <TableCell align='center'><Button color="error" onClick={() => handleDelete(creneau.id)}>Supprimer</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Page>
  );
}
