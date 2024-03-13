
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

export default function EditProfile({ user,refetch }) {
    const [open, setOpen] = useState(false);
    console.log(user)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button size="small" color='secondary' variant="outlined" onClick={handleClickOpen}>
                Edit profile
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: async (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const name = formJson.name;
                        const email = formJson.email;
                        const phone = formJson.phone;
                        const dob = formJson.dob
                        const userInfo = { name, email, phone,dob }
                        const res = await axios.patch(`http://localhost:5000/updateUser?email=${user.email}`, userInfo)
                        if(res.data){
                            refetch()
                        }
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Edit you details</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        required
                        defaultValue={user.name}
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        color='secondary'
                    />
                    <TextField
                        autoFocus
                        required
                        defaultValue={user.phone}
                        margin="dense"
                        name="phone"
                        label="Phone number"
                        type="number"
                        fullWidth
                        variant="standard"
                        color='secondary'
                    />
                    <TextField
                        autoFocus
                        required
                        defaultValue={user.email}
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        color='secondary'
                    />
                    <Box>
                        <Typography variant='h7' component={'h6'} fontWeight={'semibold'}>Date of birth:</Typography>
                        <TextField
                            autoFocus
                            required
                            defaultValue={user.dob}
                            margin="dense"
                            name="dob"
                            type="date"
                            fullWidth
                            variant="standard"
                            color='secondary'
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color='secondary' onClick={handleClose}>Cancel</Button>
                    <Button color='secondary' type="submit">Update</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}