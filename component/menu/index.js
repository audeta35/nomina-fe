import React from 'react';

import {
  SpeedDial,
  SpeedDialAction,
} from '@mui/material';

// icon
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PostAddIcon from '@mui/icons-material/PostAdd';

import { useRouter } from 'next/router';

import {Toast} from '../alert';

export const MenuList = () => {
  const navigate = useRouter();
  const redirect = (uri) => {
    navigate.push(uri);
  };

  return (
    <SpeedDial
      ariaLabel='SpeedDial basic example'
      sx={{
        position: 'absolute',
        bottom: 20,
        right: 20,
      }}
      icon={<MenuIcon />}
    >
      <SpeedDialAction
        icon={<HomeIcon />}
        color='primary'
        tooltipOpen
        tooltipTitle={'Hobby'}
        onClick={() => redirect('/')}
      />
      <SpeedDialAction
        icon={<PostAddIcon />}
        tooltipOpen
        tooltipTitle={'User'}
        onClick={() => redirect('/user')}
      />
      <SpeedDialAction
        icon={<LogoutIcon />}
        tooltipOpen
        tooltipTitle={'Logout'}
        onClick={() => {
          window.sessionStorage.clear();
          Toast.fire({
            icon: 'success',
            title: `Berhasil Logout`,
          });
          redirect('/');
        }}
      />
    </SpeedDial>
  );
};
