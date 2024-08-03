import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Snackbar } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';

const defaultTheme = createTheme();

export default function Authentication() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [formState, setFormState] = React.useState(0); // 0 for sign-in, 1 for sign-up
    const [open, setOpen] = React.useState(false);
    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    const handleAuth = async () => {
        try {
            if (formState === 0) {
                let result = await handleLogin(username, password);
                setMessage(result);
                setOpen(true);
                setError("");
                setUsername("");
                setPassword("");
            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                setMessage(result);
                setOpen(true);
                setError("");
                setUsername("");
                setPassword("");
                setFormState(0);
            }
        } catch (err) {
            console.log(err);
            let message = (err.response && err.response.data.message) || "Something went wrong";
            setError(message);
        }
    };

    const switchForm = (newFormState) => {
        setFormState(newFormState);
        setUsername(""); // Reset username when switching forms
        setPassword(""); // Reset password when switching forms
        if (newFormState === 1) {
            setName(""); // Reset name when switching to sign-up
        }
        setError(""); // Reset error message
    };

    const backgroundImageUrl = 'https://img.freepik.com/free-vector/cyber-security-concept_23-2148534564.jpg?ga=GA1.1.1320894144.1722445449&semt=ais_hybrid';

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${backgroundImageUrl})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <div>
                            <Button
                                variant={formState === 0 ? 'contained' : ''}
                                onClick={() => switchForm(0)}
                            >
                                Sign In
                            </Button>
                            <Button
                                variant={formState === 1 ? 'contained' : ''}
                                onClick={() => switchForm(1)}
                            >
                                Sign Up
                            </Button>
                        </div>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            {formState === 1 && (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Full Name"
                                    name="name"
                                    value={name}
                                    autoFocus
                                    onChange={(e) => setName(e.target.value)}
                                />
                            )}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={username}
                                autoFocus
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                            />
                            <p style={{ color: 'red' }}>{error}</p>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleAuth}
                            >
                                {formState === 0 ? 'Login' : 'Register'}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Snackbar open={open} autoHideDuration={4000} message={message} />
        </ThemeProvider>
    );
}
