import React, { useState } from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Toast } from '../../component/alert';

const Login = () => {

  const router = useRouter();
  const [showPass, setShowPass] = useState(false)
  const [payload, setPayload] = useState({
    email: '',
    password: '',
  });

  const onChange = (e, type) => {
    setPayload({
      ...payload,
      [type]: e.target.value,
    });
  };

  const onSubmit = () => {
      axios.post(
          process.env.API_HOST + '/user/login', {
              email: payload.email,
              password: payload.password
          }
      ).then((res) => {
        //   console.log('res data', res.data)
          if(res.data.status === 200) {
              const userData = res.data.result[0]
              window.sessionStorage.setItem('session', JSON.stringify(userData))
              Toast.fire({
                icon: 'success',
                title: 'Berhasil Login',
              });
              router.replace('/hobby')
          }
      }).catch((err) => {
        //   console.log('err', err)
      })
  }

  return (
    <Grid>
      <Paper
        elevation={10}
        style={{
          padding: 20,
          height: '70vh',
          width: 380,
          margin: '10px auto',
        }}
      >
        <Grid align='center'>
          <Avatar className='bg-danger'>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant='h5'>
            Login
          </Typography>
        </Grid>

        <TextField
          label='email'
          value={payload.email}
          className='my-3'
          placeholder='email'
          variant='outlined'
          fullWidth
          required
          onChange={(e) => onChange(e, 'email')}
        />

        <TextField
          label='password'
          value={payload.password}
          className='my-3'
          placeholder='password'
          type={showPass ? 'text' : 'password'}
          variant='outlined'
          fullWidth
          required
          onChange={(e) =>
            onChange(e, 'password')
          }
        />

        <Typography>
          {' '}
          <Link
            href='#'
            onClick={() => setShowPass(!showPass)}
          >
            {showPass && 'hide password'}
            {!showPass && 'show password'}
          </Link>
        </Typography>

        <Button
          type='submit'
          className='my-3'
          color='primary'
          variant='contained'
          fullWidth
          onClick={() => onSubmit()}
        >
          Login
        </Button>

        <Typography>
          {' '}
          Do you have an account ?{' '}
          <Link href='/register'>Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
