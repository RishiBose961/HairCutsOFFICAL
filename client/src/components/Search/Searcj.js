import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../context/SeacrchContext';
import { CircularProgress, InputBase,MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [destination, setDestination] = React.useState("");

  const { data, loading } = useFetch(
    `api/auth/alluser/?search=${destination}`)

  const { dispatch } = React.useContext(SearchContext)

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination } })
  };

  return (
    <div>
      <Button  onClick={handleClickOpen}>
      <SearchIcon />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth

        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{ display: "flex", justifyContent: "center" }}>
          <InputBase
            fullWidth
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Hair Cuts   "
            onChange={(e) => setDestination(e.target.value)}
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
        <Scrollbars style={{ width: 500, height: 200}}>
          <div className="listResult">
            {
              loading ? <CircularProgress /> : <>
                {data.map((item) => (
                  <Link style={{
                    textDecoration: "none",
                    color:"black",
                    textTransform:"capitalize"}} 
                    to={`/${item._id}`}>
                    <MenuItem>{item.shopname}  {"✂"} {item.state}</MenuItem></Link>
                ))
                }
              </>
            }

          </div>
          </Scrollbars>
        </DialogContent>
      </Dialog>
    </div>
  );
}
