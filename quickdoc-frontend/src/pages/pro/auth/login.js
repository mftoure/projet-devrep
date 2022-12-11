import { capitalCase } from 'change-case';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Alert, Tooltip, Container, Typography } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
import useResponsive from '../../../hooks/useResponsive';
// guards
import GuestGuard from '../../../guards/GuestGuard';
// components
import Page from '../../../components/Page';
import Logo from '../../../components/Logo';
import Image from '../../../components/Image';
// sections
import { LoginForm } from '../../../sections/auth/login';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuth();

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <GuestGuard url="/pro/dashboard">
      <Page title="Se connecter">
        <RootStyle>
          <HeaderStyle>
            <Logo url="/pro/dashboard" />
            {smUp && (
              <Typography variant="body2" sx={{ mt: { md: -2 } }}>
                Pas de compte ?  {''}
                <NextLink href='/pro/auth/register' passHref>
                  <Link variant="subtitle2"> Inscrivez-vous</Link>
                </NextLink>
              </Typography>
            )}
          </HeaderStyle>

          {mdUp && (
            <SectionStyle>
    
              <Image
                sx={{
                width:300,
                left: 80,
                zIndex: 9,
                 position: 'relative',
                filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.24))',
                }}
                visibleByDefault
                disabledEffect
                alt="register"
                // src="/assets/illustrations/illustration_register.png"
                src="/assets/illustrations/illustration_login.png"
              />
            </SectionStyle>
          )}

          <Container maxWidth="sm">
            <ContentStyle>
              <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    Se connecter
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>Entrez vos identifiants.</Typography>
                </Box>

                <Tooltip title={capitalCase(method)} placement="right">
                  <>
                   
                  </>
                </Tooltip>
              </Stack>

            

              <LoginForm />

              {!smUp && (
                <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                  Pas de compte ? {' '}
                  <NextLink href='/pro/auth/register' passHref>
                    <Link variant="subtitle2">Inscrivez-vous</Link>
                  </NextLink>
                </Typography>
              )}
            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
    </GuestGuard>
  );
}
