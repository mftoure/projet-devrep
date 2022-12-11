import { capitalCase } from 'change-case';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography, Tooltip } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// routes
// guards
import GuestGuard from '../../guards/GuestGuard';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';
// sections
import { RegisterForm } from '../../sections/auth/register';

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

export default function Register() {
  const { method } = useAuth();

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <GuestGuard url="/">
      <Page title="S'inscrire">
        <RootStyle>
          <HeaderStyle>
            <Logo url="/" />
            {smUp && (
              <Typography variant="body2" sx={{ mt: { md: -2 } }}>
                Vous avez déjà un compte ? {''}
                <NextLink href='/auth/login' passHref>
                  <Link variant="subtitle2">Se connecter</Link>
                </NextLink>
              </Typography>
            )}
          </HeaderStyle>

          {mdUp && (
            <SectionStyle>
              <Typography variant="h3" sx={{ px: 5, mb: 5}}>

              Retrouvez les professionnels de la santé avec Quickdoc !
              </Typography>
              <Image
                sx={{
                width:340,
                left: 65,
                zIndex: 9,
                 position: 'relative',
                filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.24))',
                }}
                visibleByDefault
                disabledEffect
                alt="register"
                // src="/assets/illustrations/illustration_register.png"
                src="/assets/illustrations/illustration_register.png"
              />
            </SectionStyle>
          )}

          <Container>
            <ContentStyle>
              <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    S'inscire
                  </Typography>
                </Box>
                <Tooltip title={capitalCase(method)}>
                  <>
                  </>
                </Tooltip>
              </Box>

              <RegisterForm utilisateur="patient" />

              {!smUp && (
                <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                  Vous avez déja un compte?{' '}
                  <NextLink href='/aut/login' passHref>
                    <Link variant="subtitle2">Se connecter</Link>
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
