import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { Box } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
//
import { varContainer } from '.';

// ----------------------------------------------------------------------

MotionViewport.propTypes = {
  children: PropTypes.node.isRequired,
  enableAnimatedMobile: PropTypes.bool,
};

export default function MotionViewport({ children, enableAnimatedMobile = false, ...other }) {
  const isMobile = useResponsive('down', 'sm');

  if (isMobile && !enableAnimatedMobile) {
    return <Box {...other}>{children}</Box>;
  }

  return (
    <Box
      component={m.div}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={varContainer()}
      {...other}
    >
      {children}
    </Box>
  );
}
