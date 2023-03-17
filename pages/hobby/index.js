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
} from '@mui/material';

import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';
import { Troubleshoot } from '@mui/icons-material';

const Hobby = () => {
  const [hobby, setHobby] = useState([]);
  const [modalAdd, setModalAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [payload, setPayload] = useState({
    name: '',
    status: 0,
  });

  useEffect(() => {
    getHobby();
  }, []);

  const getHobby = async () => {
    axios
      .get(process.env.API_HOST + '/hobby')
      .then((res) => {
        // console.log('res data', res.data);
        setHobby(res.data.result)
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
      setIsEdit(true)
      setPayload(row)
      setModalAdd(true)
  }

  const onSubmit = () => {
    let endpoint = isEdit ? 'edit' : 'add';
    axios
      .post(`${process.env.API_HOST}/hobby/${endpoint}`, payload)
      .then((res) => {
        // console.log('res', res.data);
      })
      .catch((err) => {
        // console.log(err);
      })
      .finally(() => {
        getHobby();
        setPayload({
          name: '',
          status: 0,
        });
        // console.log('endpoint', endpoint);
        {
            setModalAdd(!modalAdd)
            setIsEdit(false)
        };
        setIsEdit(false);
      });
  };

  const generateHobby = () => {
    setPayload({
      name: uniqueNamesGenerator({
        dictionaries: [adjectives], 
        length: 1,
      }),
      status: 1
    });
  };

    const onDelete = (id) => {
      axios
        .delete(
          `${process.env.API_HOST}/hobt/delete/${id}`
        )
        .then((res) => {
          Toast.fire({
            icon: 'success',
            title: 'Hapus Berhasil',
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          getHobby();
        });
    };

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
                <TableCell>Hobby Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Option</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hobby &&
                hobby.map((row, index) => (
                  <TableRow>
                    <TableCell>
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      {row.name}
                    </TableCell>
                    <TableCell>
                      {row.status === 1 &&
                        'active'}
                      {row.status === 0 &&
                        'disabled'}
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
                        onClick={() => onDelete(row.id)}
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
          onClick={() => {
            setModalAdd(!modalAdd);
            setIsEdit(false);
          }}
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
            name: '',
            status: 0,
          });
        }}
      >
        <DialogTitle>Hobby</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid
              item
              md={12}
            >
              <TextField
                label='name'
                value={payload.name}
                className='my-3'
                placeholder='name'
                variant='outlined'
                fullWidth
                required
                onChange={(e) =>
                  onChange(e, 'name')
                }
              />
            </Grid>
            <Grid
              item
              md={12}
            >
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>
                  Status
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={payload.status}
                  label='status'
                  onChange={(e) =>
                    onChange(e, 'status')
                  }
                >
                  <MenuItem value={0}>
                    disabled
                  </MenuItem>
                  <MenuItem value={1}>
                    actived
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setModalAdd(!modalAdd);
              setIsEdit(false);
              setPayload({
                name: '',
                status: 0,
              });
            }}
          >
            Close
          </Button>
          {!isEdit && (
            <Button
              onClick={() => generateHobby()}
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

export default Hobby;
