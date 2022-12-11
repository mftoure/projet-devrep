import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import "@fontsource/fjalla-one"; // Defaults to weight 400.

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, onlyLogo, url},props, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     ref={ref}
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = <Box component="img" src="/logo/logo.png" sx={{ width: 33, height: 33, ...sx }} />;

  const logoWithText = 
  <div style={{"fontSize":"24px", "display":"flex","gap":"10px","fontFamily":"Fjalla One,sans-serif","alignItems":"center", "cursor": "pointer"}}>
    <span>QuickDoc</span>
    {logo}
  </div>

  if (onlyLogo)
  {
    return <>{logo}</>
  }
  if (disabledLink) {
    return <>
    {logoWithText}
    </>;
  }

  return <NextLink href={url}>{logoWithText}</NextLink>;
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
