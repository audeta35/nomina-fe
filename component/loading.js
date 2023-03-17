import { CircularProgress, Grid } from "@mui/material";

const Loading = () => {
    return (
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        style={{ minHeight: '100vh' }}
      >
        <Grid
          item
          xs={3}
        >
          <CircularProgress />
        </Grid>
      </Grid>
    );
}

export default Loading