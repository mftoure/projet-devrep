import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../../hooks/useAuth';
import useResponsive from '../../../../hooks/useResponsive';
// utils
import { fData } from '../../../../utils/formatNumber';

// components
import { FormProvider, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';
import InviteFriends from '../../../../components/InviteFriends';
// import axios
import axios from 'axios';
// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();

  const { user, AUTH, DB, STORAGE, updateAuthHook } = useAuth();

  const UpdateUserSchema = Yup.object().shape({
    nom: Yup.string().required('Nom requis'),
    prenom: Yup.string().required('Prenom requis'),
    profession: Yup.string().required('Professions requis'),
    telephone: Yup.string().required('Telephone requis'),
    adresse: Yup.string().required('Adresse requise'),
    horaires: Yup.string().required('Horaires requis'),
  });

  const defaultValues = {
    nom: user?.nom || '',
    prenom: user?.prenom || '',
    profession: user?.profession || '',
    telephone: user?.telephone || '',
    adresse: user?.adresse || '',
    horaires: user?.horaire || '',

  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      // Update profile
      // axios put request
      const idToken = await AUTH.currentUser.getIdToken();
      const resp = await axios.put(process.env.HOST_API_KEY + '/api/professionnels/' + AUTH.currentUser.uid, {id:AUTH.currentUser.uid,nom:data.nom,prenom:data.prenom,profession:data.profession,telephone:data.telephone,adresse:data.adresse,horaire:data.horaires,role:"professionnel"}, {headers:{'Authorization': 'Bearer ' + idToken}});
     
      updateAuthHook();
      enqueueSnackbar('Update success!');
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Il y a eu une erreur, Veuillez réessayer !", { variant: 'error' });
    }
  };


  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Card sx={{ py: 3.5, px: 3, textAlign: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 5,
              }}
            >


              <RHFTextField name="nom" label="Nom" />
              <RHFTextField name="prenom" label="Prénom" />
              <RHFTextField name="telephone" label="Téléphone" />
              <RHFTextField name="adresse" label="Adresse" />
              <RHFTextField name="profession" label="Profession" />
              <RHFTextField name="horaires" label="Horaires" />
      
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Enregistrer
              </LoadingButton>
            </Stack>
          </Card>
        </FormProvider>
      </Grid>

    </Grid>
  );
}
