import { Container, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography } from '@mui/material';
import { Card, Button, Dialog, Grid, Box } from '@mui/material';

// layouts
import Layout from '../layouts';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';

import useAuth from '../hooks/useAuth';
import {useEffect, useState} from 'react';
import { Router, useRouter } from 'next/router';
import AuthGuard from 'src/guards/AuthGuard';
import RoleBasedGuard from 'src/guards/RoleBasedGuard';
import axios from 'axios';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

Index.getLayout = function getLayout(page) {
  return <Layout variant='regular'>
            <RoleBasedGuard roles={["patient"]} hasContent={true}>
              {page}
            </RoleBasedGuard>
    </Layout>;
};

// ----------------------------------------------------------------------

export default function Index() {
  const { themeStretch } = useSettings();
  const {user, idToken} = useAuth();
  const {push} = useRouter();
  const [professionnels, setProfessionnels] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    
  fetchProfessionnels()
  .then()
    .catch(console.error);;
  }, [loading]);
  console.log(professionnels)

  const fetchProfessionnels = async () => {
    user.creneaux.forEach( async (creneau) => {
      const res = await axios.get(process.env.HOST_API_KEY + '/api/professionnels/' + creneau.professionnel, {headers: {'Authorization': 'Bearer ' + idToken}});
      setProfessionnels(professionnels.set(creneau.professionnel, res.data));
      setLoading(false);
    });
  }

  const handleDelete = async (creneauId) => {
    try {
      const resp = await axios.delete(process.env.HOST_API_KEY + '/api/creneaux/' + creneauId , {headers: {'Authorization': 'Bearer ' + idToken}});
      console.log(resp)
      enqueueSnackbar('Suppression réussi!');
      window.location.reload();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Il y a eu une erreur, Veuillez réessayer !", { variant: 'error' });
    }
    }
  return (
    <Page title="Mes rendez-bous" sx={{mt:10}}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Mes rendez-vous
        </Typography>
        <Grid container spacing={3}>
          {user.creneaux.map((creneau) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={creneau.id}>
                <Card sx={{ display: "flex", flexDirection:"column", gap:1.5, padding:2}}>
                  <Typography style={{"fontWeight":"bold"}}>
                    {professionnels.get(creneau.professionnel)?.nom} {professionnels.get(creneau.professionnel)?.prenom}
                  </Typography>
                  <Typography>
                    {professionnels.get(creneau.professionnel)?.profession}
                  </Typography>
                  <Typography>
                    {creneau.creneauDate.split("T")[0]} à {creneau.creneauDate.split("T")[1]}
                  </Typography>
                  <Button onClick={()=> handleDelete(creneau.id)} style={{"alignSelf":"flex-end", width:"100px"}} color="error">Supprimer</Button>
                </Card>
              </Grid>
            );
          })}




        </Grid>

        
      </Container>
    </Page>
  );
}