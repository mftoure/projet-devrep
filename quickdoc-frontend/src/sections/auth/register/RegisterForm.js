import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert, Button} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import Image from 'src/components/Image';
import { errorMessages } from '../../../utils/firebaseErrors';


// ----------------------------------------------------------------------

export default function RegisterForm({utilisateur}) {
  const { register, signInWithGoogle} = useAuth();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchemaPro = Yup.object().shape({
    nom: Yup.string().required('Nom requis'),
    prenom: Yup.string().required('Prenom requis'),
    email: Yup.string().email("L'adresse email doit être valide").required('email requis'),
    password: Yup.string().required('Mot de passe requis'),
    profession: Yup.string().required('Professions requis'),
    telephone: Yup.string().required('Telephone requis'),
    adresse: Yup.string().required('Adresse requise'),
    horaires: Yup.string().required('Horaires requis'),
  });

  const RegisterSchemaPatient = Yup.object().shape({
    nom: Yup.string().required('Nom requis'),
    prenom: Yup.string().required('Prenom requis'),
    email: Yup.string().email("L'adresse email doit être valide").required('email requis'),
    password: Yup.string().required('Mot de passe requis'),
  });

  const RegisterSchema = utilisateur === 'patient' ? RegisterSchemaPatient : RegisterSchemaPro; 

  const defaultValues= {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    profession: '',
    telephone: '',
    adresse: '',
    horaires: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
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
      await register(data.nom, data.prenom, data.email, data.password, data.profession, data.telephone, data.adresse, data.horaires);
    } catch (error) {
      console.error(error);
      // reset();
      const errorMessage = errorMessages.has(error.code) ? errorMessages.get(error.code) : error.code;

      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: errorMessage });
      }
    }
  };

 
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

       
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="nom" label="Nom" />
          <RHFTextField name="prenom" label="Prenom" />
        </Stack>

        <RHFTextField name="email" label="Email" />

        <RHFTextField
          name="password"
          label="Mot de passe"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {utilisateur=="professionnel" && <RHFTextField name="profession" label="Profession" />}
        {utilisateur=="professionnel" && <RHFTextField name="telephone" label="Telephone" />}
        {utilisateur=="professionnel" && <RHFTextField name="adresse" label="Adresse" />}
        {utilisateur=="professionnel" && <RHFTextField name="horaires" label="Horaires" />}


        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          S'inscrire
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
