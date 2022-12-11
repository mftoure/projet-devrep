import { Container, Typography } from '@mui/material';
// layouts
import Layout from '../../../layouts';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import {useState, useEffect} from 'react';
import { Card, Grid, Box } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';

// ----------------------------------------------------------------------

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Home() {
  const { themeStretch } = useSettings();
  const [patients, setPatients] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const {user, idToken} = useAuth();
  useEffect(() => {

    getPatients()
    .then(

    )
      .catch(console.error);;
    }, [loading]);

  const getPatients = async () => {
    user.creneaux.forEach( async (creneau) => {
      const res = await axios.get(process.env.HOST_API_KEY + '/api/patients/' + creneau.patient, {headers: {'Authorization': 'Bearer ' + idToken}});
      setPatients(patients.set(creneau.patient, res.data));
      setLoading(false);
    });
  }

  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Mes consultations
        </Typography>
        <Grid container spacing={3} style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
          {user.creneaux.length === 0 && <Typography sx={{ fontWeight: "600", color: "black", fontSize: "18px","marginTop":"100px" }}>Aucun résultat</Typography>}

          {user.creneaux.map((creneau) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={creneau.id}>
                <Card sx={{ display: "flex", flexDirection:"column", gap:1.5, padding:2}}>
                  <Typography style={{"fontWeight":"bold"}}>
                    {patients.get(creneau.patient)?.nom} {patients.get(creneau.patient)?.prenom}
                  </Typography>
                  <Typography>
                    {creneau.creneauDate.split("T")[0]} à {creneau.creneauDate.split("T")[1]}
                  </Typography>

                </Card>
              </Grid>
            );
          })}




        </Grid>
      </Container>
    </Page>
  );
}