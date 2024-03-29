import { useEffect, useState } from 'react';
import { MenuList } from '../../component/menu';
import axios from 'axios';
import {
  Container,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
  Link,
} from '@mui/material';

import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';
import { Troubleshoot } from '@mui/icons-material';
import { Toast } from '@/component/alert';

const User = () => {
  const [hobby, setHobby] = useState([]);
  const [user, setUser] = useState([]);
  const [modalAdd, setModalAdd] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [payload, setPayload] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: 0,
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    getUsers();
    getHobby();
  }, []);

  const getHobby = async () => {
    axios
      .get(process.env.API_HOST + '/hobby')
      .then((res) => {
        // console.log('res data', res.data);
        setHobby(res.data.result);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const getUsers = async () => {
    axios
      .get(process.env.API_HOST + '/user')
      .then((res) => {
        // console.log('res data', res.data);
        setUser(res.data.result);
      })
      .catch((err) => {
        // console.log('err', err);
      });
  };

  const onChange = (e, type) => {
    setPayload({
      ...payload,
      [type]: e.target.value,
    });
  };

  const onEdit = (row) => {
    setIsEdit(true);
    setPayload({
      ...row,
      confirmPassword: row.password
    });
    setModalAdd(true);
  };

  const onSubmit = () => {
    let endpoint = isEdit ? 'edit' : 'add';
    if (
      payload.password === payload.confirmPassword
    ) {
      axios
        .post(
          `${process.env.API_HOST}/user/${endpoint}`,
          payload
        )
        .then((res) => {
          // console.log('res', res.data);
          Toast.fire({
            icon: 'success',
            title: 'Berhasil',
          });
        })
        .catch((err) => {
          // console.log(err);
        })
        .finally(() => {
          getUsers();
          setPayload({
            name: '',
            status: 0,
          });
          // console.log('endpoint', endpoint);
          setModalAdd(!modalAdd);
          setIsEdit(false);
        });
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Password tidak sesuai',
      });
    }
  };

  const generateUser = () => {
    const first = uniqueNamesGenerator({
      dictionaries: [adjectives],
      length: 1,
    });

    const last = uniqueNamesGenerator({
      dictionaries: [colors],
      length: 1,
    });

    setPayload({
      first_name: first,
      last_name: last,
      email: `${first}_${last}@mail.com`,
      age: 30,
      password: '12345678',
      confirmPassword: '12345678',
    });
  };

  const onDelete = (id) => {
    axios.delete(`${process.env.API_HOST}/user/delete/${id}`).then(res => {
      Toast.fire({
        icon: 'success',
        title: 'Hapus Berhasil',
      });
    }).catch(err => {
      console.log(err)
    }).finally(() => {
        getUsers();
    })
  }

  return (
    <>
      <Container maxWidth='md'>
        <TableContainer
          className='mt-4'
          component={Paper}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>age</TableCell>
                <TableCell>Hobby</TableCell>
                <TableCell>Option</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user &&
                user.map((row, index) => (
                  <TableRow>
                    <TableCell>
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      {row.first_name}
                    </TableCell>
                    <TableCell>
                      {row.last_name}
                    </TableCell>
                    <TableCell>
                      {row.email}
                    </TableCell>
                    <TableCell>
                      {row.age}
                    </TableCell>
                    <TableCell>
                      {hobby &&
                        hobby.map(
                          (data, index) => (
                            <Typography>
                              {parseInt(
                                row.hobby
                              ) === data.id &&
                                data.name}
                            </Typography>
                          )
                        )}
                    </TableCell>

                    <TableCell>
                      <Button
                        onClick={() =>
                          onEdit(row)
                        }
                      >
                        edit
                      </Button>
                      <Button
                        onClick={() =>
                          onDelete(row.id)
                        }
                      >
                        delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant='contained'
          className='my-2'
          onClick={() => setModalAdd(!modalAdd)}
        >
          Add
        </Button>
      </Container>

      <Dialog
        open={modalAdd}
        onClocse={() => {
          setModalAdd(!modalAdd);
          setIsEdit(false);
          setPayload({
            firstName: '',
            lastName: '',
            email: '',
            age: 0,
            password: '',
            confirmPassword: '',
          });
        }}
      >
        <DialogTitle>User</DialogTitle>
        <DialogContent>
          <Grid container>
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
                    value={payload.first_name}
                    className='my-3'
                    placeholder='first name'
                    variant='outlined'
                    required
                    onChange={(e) =>
                      onChange(e, 'first_name')
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
                    value={payload.last_name}
                    className='my-3'
                    placeholder='last name'
                    variant='outlined'
                    required
                    onChange={(e) =>
                      onChange(e, 'last_name')
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

            <Grid
              item
              md={12}
            >
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>
                  Hobby
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={payload.hobby}
                  label='hobby'
                  onChange={(e) =>
                    onChange(e, 'hobby')
                  }
                >
                  <MenuItem
                    value={0}
                    disabled
                    selected
                  >
                    pilih hobby
                  </MenuItem>
                  {hobby &&
                    hobby.map((data, index) => (
                      <MenuItem
                        value={data.id}
                        disabled={
                          data.status !== 1
                        }
                      >
                        {data.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid
              item
              md={12}
            >
              <TextField
                label='password'
                value={payload.password}
                className='my-3'
                placeholder='password'
                type={
                  showPass ? 'text' : 'password'
                }
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
                type={
                  showPass ? 'text' : 'password'
                }
                variant='outlined'
                fullWidth
                required
                onChange={(e) =>
                  onChange(e, 'confirmPassword')
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setModalAdd(!modalAdd);
              setIsEdit(false);
              setPayload({
                firstName: '',
                lastName: '',
                email: '',
                age: 0,
                password: '',
                confirmPassword: '',
              });
            }}
          >
            Close
          </Button>
          {!isEdit && (
            <Button
              onClick={() => generateUser()}
            >
              Generate dummy
            </Button>
          )}
          <Button onClick={() => onSubmit()}>
            {isEdit && 'edit'}
            {!isEdit && 'add'}
          </Button>
        </DialogActions>
      </Dialog>
      <MenuList />
    </>
  );
};

export default User;
