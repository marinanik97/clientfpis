import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button"
import AuthContext from "../contexts/auth/AuthContext";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `100%`,
        zIndex: "10000"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

export default function PermanentDrawerLeft(props) {
    const classes = useStyles();
    const {getToken, setToken} = AuthContext();

    const LogOut = () =>{
        setToken(false)
    }

    const MenuItem = ({ link: { link, name } }) => {
        console.log(link);
        console.log(name);
        return(
            <Link to={link}>
                <ListItem button>
                    <ListItemText primary={name} />
                </ListItem>
            </Link>
        );
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Informacioni sistem bolnice
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <List>
                    {[{name: 'Izveštaji', link: '/reports'}, {name: 'Rezultati', link: '/types'},{name: 'Kartoni', link: '/card'}].map((link, index) => (
                        <MenuItem link={link} key={link.name}/>
                    ))}
                </List>
                <div style={{width: '100%', textAlign: 'center'}}>
                <Button
                    variant="contained"
                    color="primary"
                    style={{width: 120}}
                    onClick={LogOut}
                >Log out </Button>
                </div>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
        </div>
    );
}
