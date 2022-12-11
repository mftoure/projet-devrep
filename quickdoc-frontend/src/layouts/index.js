import PropTypes from 'prop-types';
// guards
import AuthGuard from '../guards/AuthGuard';
// components
import DashboardLayout from './dashboard';
import DashboardHeader from './dashboard/header';
import LogoOnlyLayout from './LogoOnlyLayout';
import { useRouter } from 'next/router';


import useAuth from '../hooks/useAuth';
import Logo from 'src/components/Logo';

import Link from 'next/link';

import Button from '@mui/material/Button';
import RoleBasedGuard from 'src/guards/RoleBasedGuard';
// ----------------------------------------------------------------------

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['dashboard', 'main', 'logoOnly','regular']),
};

export default function Layout({ variant = 'dashboard', children }) {

  const { user, logout} = useAuth();
  const {push} = useRouter();


  const handleLogout = async () => {
    try {
      await logout();
      push('/');
      window.location.reload()

    } catch (error) {
      console.error(error);
    }
  };

  if (variant === 'logoOnly') {
    return <LogoOnlyLayout> {children} </LogoOnlyLayout>;
  }

  if (variant === 'regular') {
    return (
      <>
      <div className='header-homepage' style={{"display":"flex", "justifyContent":"space-between", "alignItems":"center", padding:"0 60px", "height":"80px"}}>
        <Logo url="/"/>
        <div>
          {!user && <Link href="/auth/login"><Button variant='contained' style={{"height":"40px", "marginRight":"12px"}}>Se connecter</Button></Link> }
          {!user && <Link href="/pro/dashboard"><Button variant='outlined' style={{"height":"40px"}}>Vous êtes practicien ?</Button></Link> }
        {user && <Link href="/rendez-vous"><Button style={{"height":"40px"}}>Mes rendez-vous</Button></Link> }
      {user && <Button onClick={handleLogout} style={{"height":"40px"}}>Se deconnecter</Button>} 
        </div>
      
      </div>
      {children}
      </>) ;
  }

  return (
    <AuthGuard>
      <RoleBasedGuard roles={["professionnel"]} hasContent={true}>
      <DashboardLayout>
        {children}
      </DashboardLayout>
      </RoleBasedGuard>
    </AuthGuard>
  );
}
