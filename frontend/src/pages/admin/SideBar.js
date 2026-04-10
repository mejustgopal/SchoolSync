import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Box, Tooltip } from '@mui/material';
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
import AssessmentIcon from '@mui/icons-material/Assessment';

const navItems = [
    { path: "/",                        label: "Home",               Icon: HomeIcon,                      color: "#7f56da" },
    { path: "/Admin/classes",           label: "Classes",            Icon: ClassOutlinedIcon,             color: "#4f46e5" },
    { path: "/Admin/subjects",          label: "Subjects",           Icon: AssignmentIcon,                color: "#06b6d4" },
    { path: "/Admin/teachers",          label: "Teachers",           Icon: SupervisorAccountOutlinedIcon, color: "#10b981" },
    { path: "/Admin/students",          label: "Students",           Icon: PersonOutlineIcon,             color: "#f59e0b" },
    { path: "/Admin/attendance-report", label: "Attendance Report",  Icon: AssessmentIcon,                color: "#8b5cf6" },
    { path: "/Admin/notices",           label: "Notices",            Icon: AnnouncementOutlinedIcon,      color: "#ef4444" },
    { path: "/Admin/complains",         label: "Complains",          Icon: ReportIcon,                    color: "#ec4899" },
];

const userItems = [
    { path: "/Admin/profile", label: "Profile", Icon: AccountCircleOutlinedIcon, color: "#7f56da" },
    { path: "/logout",        label: "Logout",  Icon: ExitToAppIcon,             color: "#ef4444" },
];

const SideBar = ({ open = true }) => {
    const location = useLocation();

    const isActive = (path) => {
        if (path === "/") return location.pathname === "/" || location.pathname === "/Admin/dashboard";
        return location.pathname.startsWith(path);
    };

    const renderItem = ({ path, label, Icon, color }) => {
        const active = isActive(path);

        const button = (
            <ListItemButton
                key={path}
                component={Link}
                to={path}
                sx={{
                    my: 0.4,
                    mx: 1,
                    borderRadius: 3,
                    minHeight: 44,
                    justifyContent: open ? 'initial' : 'center',
                    background: active
                        ? `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`
                        : 'transparent',
                    color: active ? 'white' : 'inherit',
                    boxShadow: active ? `0 4px 14px ${color}44` : 'none',
                    transition: 'all 0.18s ease',
                    '&:hover': {
                        background: active
                            ? `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`
                            : `${color}18`,
                        color: active ? 'white' : color,
                        transform: 'translateX(2px)',
                        '& .MuiListItemIcon-root': { color: active ? 'white' : color },
                    },
                    '& .MuiListItemIcon-root': {
                        color: active ? 'white' : color,
                        minWidth: open ? 38 : 'unset',
                        mr: open ? 0 : 'auto',
                        transition: 'all 0.18s ease',
                    },
                    '& .MuiListItemText-primary': {
                        fontWeight: active ? 700 : 500,
                        fontSize: '0.875rem',
                    },
                }}
            >
                <ListItemIcon>
                    <Icon fontSize="small" />
                </ListItemIcon>
                {open && (
                    <>
                        <ListItemText primary={label} />
                        {active && (
                            <Box sx={{
                                width: 6, height: 6, borderRadius: '50%',
                                backgroundColor: 'white',
                                boxShadow: `0 0 6px white`,
                                flexShrink: 0,
                                ml: 0.5,
                            }} />
                        )}
                    </>
                )}
            </ListItemButton>
        );

        // Wrap with Tooltip showing label when collapsed
        return open ? button : (
            <Tooltip key={path} title={label} placement="right" arrow>
                {button}
            </Tooltip>
        );
    };

    return (
        <>
            {/* Brand */}
            <Box sx={{
                px: open ? 2.5 : 1,
                py: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: open ? 'flex-start' : 'center',
                gap: 1,
                overflow: 'hidden',
            }}>
                <Box sx={{
                    width: 32, height: 32,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #7f56da, #06b6d4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(127,86,218,0.4)',
                    flexShrink: 0,
                }}>
                    <span style={{ color: '#fff', fontWeight: 800, fontSize: 14, fontFamily: 'Poppins' }}>S</span>
                </Box>
                {open && (
                    <span style={{
                        fontWeight: 700, fontSize: '1rem', fontFamily: 'Poppins',
                        background: 'linear-gradient(135deg,#7f56da,#06b6d4)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        whiteSpace: 'nowrap',
                    }}>
                        SchoolSync
                    </span>
                )}
            </Box>

            <Divider sx={{ mx: open ? 2 : 1, my: 0.5, borderColor: 'rgba(127,86,218,0.15)' }} />

            <React.Fragment>
                {open && (
                    <ListSubheader
                        component="div"
                        sx={{
                            background: 'transparent', color: 'text.secondary',
                            fontSize: '0.65rem', fontWeight: 700, letterSpacing: '1.2px',
                            textTransform: 'uppercase', lineHeight: '28px', px: 2.5, mt: 0.5,
                        }}
                    >
                        Navigation
                    </ListSubheader>
                )}
                {navItems.map(renderItem)}
            </React.Fragment>

            <Divider sx={{ mx: open ? 2 : 1, my: 1, borderColor: 'rgba(127,86,218,0.15)' }} />

            <React.Fragment>
                {open && (
                    <ListSubheader
                        component="div"
                        sx={{
                            background: 'transparent', color: 'text.secondary',
                            fontSize: '0.65rem', fontWeight: 700, letterSpacing: '1.2px',
                            textTransform: 'uppercase', lineHeight: '28px', px: 2.5,
                        }}
                    >
                        Account
                    </ListSubheader>
                )}
                {userItems.map(renderItem)}
            </React.Fragment>
        </>
    );
};

export default SideBar;
