import PropTypes from 'prop-types';
// @mui
import { Box, Tooltip, Typography } from '@mui/material';
//
import Iconify from '../../Iconify';
//
import { ListItemStyle, ListItemTextStyle, ListItemIconStyle } from './style';

// ----------------------------------------------------------------------

export default function NavItem({ item, depth, active, open, isCollapse, ...other }) {
  const { title, icon, info, children, disabled, caption } = item;

  const renderContent = (
    <ListItemStyle depth={depth} active={active} disabled={disabled} {...other}>
      {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}

      {depth !== 1 && <DotIcon active={active && depth !== 1} />}

      <ListItemTextStyle
        isCollapse={isCollapse}
        primary={<Typography sx={{fontWeight:600, fontSize:17.5}}>{title}</Typography>}
        secondary={
          caption && (
            <Tooltip title={caption} placement="top-start">
              <span>{caption}</span>
            </Tooltip>
          )
        }
        primaryTypographyProps={{
          noWrap: true,
          variant: active ? 'subtitle2' : 'body2',
        }}
        secondaryTypographyProps={{
          noWrap: true,
          variant: 'caption',
        }}
      />

      {!isCollapse && (
        <>
          {info && (
            <Box component="span" sx={{ lineHeight: 0 }}>
              {info}
            </Box>
          )}

          {!!children && (
            <Iconify
              icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
              sx={{ width: 16, height: 16, ml: 1, flexShrink: 0 }}
            />
          )}
        </>
      )}
    </ListItemStyle>
  );

  return renderContent;
}

NavItem.propTypes = {
  isCollapse: PropTypes.bool,
  active: PropTypes.bool,
  open: PropTypes.bool,
  depth: PropTypes.number,
  item: PropTypes.shape({
    children: PropTypes.array,
    icon: PropTypes.any,
    info: PropTypes.any,
    caption: PropTypes.string,
    path: PropTypes.string,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
};

// ----------------------------------------------------------------------

DotIcon.propTypes = {
  active: PropTypes.bool,
};

export function DotIcon({ active }) {
  return (
    <ListItemIconStyle>
      <Box
        component="span"
        sx={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          bgcolor: 'text.disabled',
          transition: (theme) =>
            theme.transitions.create('transform', {
              duration: theme.transitions.duration.shorter,
            }),
          ...(active && {
            transform: 'scale(2)',
            bgcolor: 'primary.main',
          }),
        }}
      />
    </ListItemIconStyle>
  );
}
