import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';

const StudentSideBar = () => {
    const location = useLocation();
    
    // Helper to check active path
    const isActive = (path) => {
        if (path === "/") return location.pathname === "/" || location.pathname === "/Student/dashboard";
        return location.pathname.startsWith(path);
    }

    const itemStyles = (path) => ({
        my: 0.5,
        mx: 1,
        borderRadius: 2,
        backgroundColor: isActive(path) ? 'primary.main' : 'transparent',
        color: isActive(path) ? 'white' : 'inherit',
        '&:hover': {
            backgroundColor: isActive(path) ? 'primary.dark' : 'rgba(0, 0, 0, 0.08)',
        },
        '& .MuiListItemIcon-root': {
            color: isActive(path) ? 'white' : 'inherit',
        }
    });

    return (
        <>
            <React.Fragment>
                <ListItemButton component={Link} to="/" sx={itemStyles("/")}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Student/subjects" sx={itemStyles("/Student/subjects")}>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Subjects" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Student/attendance" sx={itemStyles("/Student/attendance")}>
                    <ListItemIcon>
                        <ClassOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Attendance" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Student/complain" sx={itemStyles("/Student/complain")}>
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Complain" />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheader component="div" inset>
                    User
                </ListSubheader>
                <ListItemButton component={Link} to="/Student/profile" sx={itemStyles("/Student/profile")}>
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton component={Link} to="/logout" sx={itemStyles("/logout")}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </React.Fragment>
        </>
    )
}

export default StudentSideBar