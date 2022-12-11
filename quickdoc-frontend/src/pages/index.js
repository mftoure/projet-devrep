import { Container, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, Stack } from '@mui/material';

// layouts
import Layout from '../layouts';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import { Card, Button, Dialog, Grid, Box } from '@mui/material';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import { Router, useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';

// form
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField } from '../components/hook-form';

//transition
import { TypeAnimation } from 'react-type-animation';
import axios from 'axios';
import { width } from '@mui/system';

import { useSnackbar } from 'notistack';


// ----------------------------------------------------------------------

Index.getLayout = function getLayout(page) {
  return <Layout variant='regular'>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Index() {
  const { themeStretch } = useSettings();
  const { user, idToken } = useAuth();
  const { push } = useRouter();
  const [open, setOpen] = useState(false);
  const [res, setRes] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleReservation = async (idCreneau) => {
    try{
      if (!user) {
        handleClickOpen();
      } else {
        console.log(user)
        const res = await axios.post(process.env.HOST_API_KEY + '/api/patients/' + user.id + '/creneaux/' + idCreneau, { headers: { 'Authorization': 'Bearer ' + idToken } });
        console.log(res.data);
        enqueueSnackbar('Réservation réussie!');
        window.location.reload();
      }
    }catch(error){
      console.log(error);
      enqueueSnackbar("Il y a eu une erreur, Veuillez réessayer !", { variant: 'error' });
    }
  }

  const handleRedirectToLogin = () => {
    push('/auth/login');
  }

  const searchSchema = Yup.object().shape({
    nomOrPrenomm: Yup.string(),
    profession: Yup.string(),
    adresse: Yup.string(),
  });

  const defaultValues = {
    nomOrPrenom: '',
    profession: '',
    adresse: ''
  };
  const methods = useForm({
    resolver: yupResolver(searchSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      let res;
      if (data.nomOrPrenom === '' && data.profession === '' && data.adresse === '') {
        res = await axios.get(process.env.HOST_API_KEY + '/api/professionnels');
      } else if (data.nomOrPrenom === '' && data.profession === '' && data.adresse !== '') {
        res = await axios.get(process.env.HOST_API_KEY + '/api/professionnels/?adresse=' + data.adresse);
      } else if (data.nomOrPrenom === '' && data.profession !== '' && data.adresse === '') {
        res = await axios.get(process.env.HOST_API_KEY + '/api/professionnels/?profession=' + data.profession);
      } else if (data.nomOrPrenom === '' && data.profession !== '' && data.adresse !== '') {
        res = await axios.get(process.env.HOST_API_KEY + '/api/professionnels/?profession=' + data.profession + '&adresse=' + data.adresse);
      } else if (data.nomOrPrenom !== '' && data.profession === '' && data.adresse === '') {
        res = await axios.get(process.env.HOST_API_KEY + '/api/professionnels/?nomOrPrenom=' + data.nomOrPrenom);
      } else if (data.nomOrPrenom !== '' && data.profession === '' && data.adresse !== '') {
        res = await axios.get(process.env.HOST_API_KEY + '/api/professionnels/?nomOrPrenom=' + data.nomOrPrenom + '&adresse=' + data.adresse);
      } else if (data.nomOrPrenom !== '' && data.profession !== '' && data.adresse === '') {
        res = await axios.get(process.env.HOST_API_KEY + '/api/professionnels/?nomOrPrenom=' + data.nomOrPrenom + '&profession=' + data.profession);
      } else {
        res = await axios.get(process.env.HOST_API_KEY + '/api/professionnels/?nomOrPrenom=' + data.nomOrPrenom + '&profession=' + data.profession + '&adresse=' + data.adresse);
      }
      console.log(res.data);
      setRes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page title="Home" sx={{ mt: 10 }}>
      <Container maxWidth={themeStretch ? false : 'xl'} style={{ display: "flex", "alignItems": "center", "flexDirection": "column" }}>

        <Card style={{ display: "flex", "alignItems": "center", "flexDirection": "column", "padding": "50px", "backgroundColor": "#37acff", justifyContent: "center", "gap": "20px", "marginBottom": "80px" }}>
          <div style={{ display: "flex", "alignItems": "center", "gap": "8px" }}>
            <Typography style={{ display: "inline", "color": "white", "fontSize": "2em", "fontWeight": "800" }}>
              Trouvez un rendez-vous avec
            </Typography>
            <TypeAnimation
              sequence={[' un(e) médecin généraliste', 4000, ' un(e) chirurgien(ne)',
                4000, ' un(e) orthopédiste', 4000, ' un(e) gynécologue', 4000, ' un(e) cardiologue', 4000, ' un(e) pédiatre', 4000, " un(e) ophtalmologue", 4000, " un(e) pharmacien(ne)", 4000, " un(e) psycholoque", 4000, " un(e) ostéopathe", 4000]}
              style={{ display: "inline", color: "white", "fontSize": "2em", "fontWeight": "800" }}
              wrapper="h3"
              repeat={Infinity}
            />
          </div>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <RHFTextField variant="filled" style={{ "backgroundColor": "white", "borderRadius": "8px" }} name="nomOrPrenom" label="Nom ou prénom" />
              <RHFTextField variant="filled" style={{ "backgroundColor": "white", "borderRadius": "8px" }} name="profession" label="Profession" />
              <RHFTextField variant="filled" style={{ "backgroundColor": "white", "borderRadius": "8px" }} name="adresse" label="Adresse" />
              <LoadingButton variant='contained' style={{ "minWidth": "120px" }} type="submit" loading={isSubmitting} variant="contained">
                Rechercher
              </LoadingButton>
            </Stack>
          </FormProvider>
        </Card>

        <Grid container spacing={3} alignItems="center" justifyContent={"center"}>
          {res.length === 0 && <Typography sx={{ fontWeight: "600", color: "black", fontSize: "18px" }}>Aucun résultat</Typography>}
          {res.length !== 0 && res.map((professionnel) => {
            console.log(professionnel)
            return (
              <Grid item xs={12} sm={6} md={4} key={professionnel.id}>
                <Card sx={{ display: "flex", height:"200px"}}>
                  <Box sx={{ display: "flex", flexDirection: "column", background:"#37acff", padding:2, width:"300px","gap":2}}>
                    <Typography sx={{ fontWeight: "600", color:"white", fontSize:"18px" }}>
                      {professionnel.nom} {professionnel.prenom}
                    </Typography>
                    <Typography sx={{ fontWeight: "400",color:"white",fontSize:"16px" }}>
                      {professionnel.profession}
                    </Typography>
                    <Typography  sx={{ fontWeight: "400", "color":"white", fontSize:"15px" }}>
                      {professionnel.adresse}
                    </Typography>
                    <Typography  sx={{ fontWeight: "400",color:"white", fontSize:"15px" }}>
                      {professionnel.telephone}
                    </Typography>
                  </Box >
                  <Grid container spacing={1} alignItems="center" justifyContent={"center"} padding={2} sx={{width:"300px", overflow:"auto"}}>
                    {professionnel.creneaux.length === 0 && <Typography sx={{ fontWeight: "bold", color:"#37acff", fontSize:"16px" }}> Pas de disponibilites</Typography>}
                    {professionnel.creneaux.map((creneau) => {
                      return (
                      <Grid item>

                      <Button disabled={creneau.reserve} onClick={() => handleReservation(creneau.id)}>
                        {creneau.creneauDate.split('T')[0]} {creneau.creneauDate.split('T')[1]}
                      </Button>
                      </Grid>
                      )
                    })}

                  </Grid>

                </Card>
              </Grid>
            );
          })}




        </Grid>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Connexion</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Vous devez d'abord vous connecter afin de prendre des rendez vous !
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRedirectToLogin}>Se connecter</Button>
          </DialogActions>

        </Dialog>

      

      </Container>
    </Page>
  );
}