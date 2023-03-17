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
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Toast } from '../../component/alert';

const Register = () => {

  const router = useRouter();
  const [payload, setPayload] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: 0,
    password: '',
    confirmPassword: '',
  });

  const [showPass, setShowPass] = useState(false);

  const onChange = (e, type) => {
    setPayload({
      ...payload,
      [type]: e.target.value,
    });
  };

  const generateAccount = () => {
    const first = uniqueNamesGenerator({
      dictionaries: [adjectives],
      length: 1,
    });

    const last = uniqueNamesGenerator({
      dictionaries: [colors],
      length: 1,
    });

    setPayload({
      firstName: first,
      lastName: last,
      email: `${first}_${last}@mail.com`,
      age: 30,
      password: '12345678',
      confirmPassword: '12345678',
    });
  };

  const onSubmit = () => {
    axios
      .post(process.env.API_HOST + '/user/add', {
        first_name: payload.firstName,
        last_name: payload.lastName,
        email: payload.email,
        age: payload.age,
        password: payload.password,
        hobby: 0,
      })
      .then((res) => {
        // console.log('res', res.data.status.code);
        if(res.data.status.code) {
            Toast.fire({
              icon: 'success',
              title: 'Berhasil Register',
            });

            router.replace('/login')
        } else {
            Toast.fire({
              icon: 'error',
              title: 'Register gagal',
            });

        }
      })
      .catch((err) => {
        // console.log('err', err);
      });
  };

  return (
    <Grid>
      <Paper
        elevation={10}
        style={{
          padding: 20,
          width: 580,
          margin: '10px auto',
        }}
      >
        <Grid align='center'>
          <Avatar className='bg-danger'>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant='h5'>
            Register
          </Typography>
        </Grid>

        <Grid item>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              md={6}
            >
              <TextField
                label='first name'
                value={payload.firstName}
                className='my-3'
                placeholder='first name'
                variant='outlined'
                required
                onChange={(e) =>
                  onChange(e, 'firstName')
                }
                fullWidth
              />
            </Grid>

            <Grid
              item
              md={6}
            >
              <TextField
                label='last name'
                value={payload.lastName}
                className='my-3'
                placeholder='last name'
                variant='outlined'
                required
                onChange={(e) =>
                  onChange(e, 'lastName')
                }
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              md={10}
            >
              <TextField
                label='email'
                value={payload.email}
                className='my-3'
                type='email'
                placeholder='email'
                variant='outlined'
                required
                onChange={(e) =>
                  onChange(e, 'email')
                }
                fullWidth
              />
            </Grid>

            <Grid
              item
              md={2}
            >
              <TextField
                label='age'
                value={payload.age}
                className='my-3'
                placeholder='age'
                variant='outlined'
                type='number'
                required
                onChange={(e) =>
                  onChange(e, 'age')
                }
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>

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

        <TextField
          label='confirm password'
          value={payload.confirmPassword}
          className='my-3'
          placeholder='confirm password'
          type={showPass ? 'text' : 'password'}
          variant='outlined'
          fullWidth
          required
          onChange={(e) =>
            onChange(e, 'confirmPassword')
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
          className='my-3'
          type='submit'
          color='primary'
          variant='contained'
          fullWidth
          onClick={() => onSubmit()}
        >
          Register
        </Button>

        <Typography>
          {' '}
          Generate dummy account{' '}
          <Link
            href='#'
            onClick={() => generateAccount()}
          >
            Click Here
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Register;
