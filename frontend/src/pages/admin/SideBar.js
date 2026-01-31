import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';


const SideBar = () => {
    const location = useLocation();
    
    // Helper to check active path
    const isActive = (path) => {
        if (path === "/") return location.pathname === "/" || location.pathname === "/Admin/dashboard";
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
                <ListItemButton component={Link} to="/Admin/classes" sx={itemStyles("/Admin/classes")}>
                    <ListItemIcon>
                        <ClassOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Classes" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/subjects" sx={itemStyles("/Admin/subjects")}>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Subjects" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/teachers" sx={itemStyles("/Admin/teachers")}>
                    <ListItemIcon>
                        <SupervisorAccountOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Teachers" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/students" sx={itemStyles("/Admin/students")}>
                    <ListItemIcon>
                        <PersonOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Students" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/notices" sx={itemStyles("/Admin/notices")}>
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Notices" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/complains" sx={itemStyles("/Admin/complains")}>
                    <ListItemIcon>
                        <ReportIcon />
                    </ListItemIcon>
                    <ListItemText primary="Complains" />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheader component="div" inset>
                    User
                </ListSubheader>
                <ListItemButton component={Link} to="/Admin/profile" sx={itemStyles("/Admin/profile")}>
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

export default SideBar
