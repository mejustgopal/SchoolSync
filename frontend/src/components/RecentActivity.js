import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    timelineItemClasses
} from '@mui/lab';
import CampaignIcon from '@mui/icons-material/Campaign';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { getAllNotices } from '../redux/noticeRelated/noticeHandle';
import { ROLE_CONSTANTS } from '../constants';

const RecentActivity = () => {
    const dispatch = useDispatch();
    const { noticesList, loading, response } = useSelector((state) => state.notice);
    const { currentUser, currentRole } = useSelector((state) => state.user);
    const [expandedNotices, setExpandedNotices] = useState({});

    useEffect(() => {
        if (currentRole === ROLE_CONSTANTS.ADMIN && currentUser?._id) {
            dispatch(getAllNotices(currentUser._id, "Notice"));
        }
        else if (currentRole !== ROLE_CONSTANTS.ADMIN && currentUser?.school?._id) {
            dispatch(getAllNotices(currentUser.school._id, "Notice"));
        }
    }, [dispatch, currentRole, currentUser]);

    // Filter out invalid dates, sort by newest first, and take max 5
    const activities = Array.isArray(noticesList) && noticesList.length > 0
        ? [...noticesList]
            .filter(n => new Date(n.date).toString() !== "Invalid Date")
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5)
        : [];

    const toggleNotice = (id) => {
        setExpandedNotices(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <Box sx={{ width: '100%', overflowY: 'auto', pr: 1, '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '4px' } }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'text.primary', pl: 1 }}>
                Recent Activity
            </Typography>

            {loading && <Typography sx={{ pl: 1, color: 'text.secondary' }}>Loading feed...</Typography>}
            {response && <Typography sx={{ pl: 1, color: 'text.secondary' }}>No recent activity.</Typography>}

            {!loading && !response && activities.length === 0 && (
                <Typography sx={{ pl: 1, color: 'text.secondary' }}>No recent activity.</Typography>
            )}

            <Timeline
                sx={{
                    [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0,
                    },
                    padding: 0,
                    margin: 0,
                }}
            >
                {activities.map((activity, index) => {
                    const isLast = index === activities.length - 1;
                    const dateObj = new Date(activity.date);
                    const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    
                    // Add some fun to the dots for visual variety
                    const colors = ['#7f56da', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'];
                    const color = colors[index % colors.length];
                    const isExpanded = expandedNotices[activity._id || index];
                    const isLongText = activity.details && activity.details.length > 60;

                    return (
                        <TimelineItem key={activity._id || index}>
                            <TimelineSeparator>
                                <TimelineDot sx={{ bgcolor: `${color}22`, color: color, boxShadow: 'none', p: 1 }}>
                                    {index % 2 === 0 ? <CampaignIcon fontSize="small" /> : <EventNoteIcon fontSize="small" />}
                                </TimelineDot>
                                {!isLast && <TimelineConnector sx={{ bgcolor: 'divider' }} />}
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                <Typography variant="subtitle2" component="span" sx={{ fontWeight: 600, display: 'block' }}>
                                    {activity.title}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                                    {formattedDate}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{
                                    display: isExpanded ? 'block' : '-webkit-box',
                                    WebkitLineClamp: isExpanded ? 'unset' : 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    whiteSpace: 'pre-wrap',
                                    transition: 'all 0.3s ease'
                                }}>
                                    {activity.details}
                                </Typography>
                                {isLongText && (
                                    <Typography 
                                        variant="caption" 
                                        color="primary.main" 
                                        sx={{ 
                                            cursor: 'pointer', 
                                            mt: 0.5, 
                                            display: 'inline-block', 
                                            fontWeight: 600,
                                            '&:hover': { textDecoration: 'underline' }
                                        }}
                                        onClick={() => toggleNotice(activity._id || index)}
                                    >
                                        {isExpanded ? 'Show less' : 'Read more'}
                                    </Typography>
                                )}
                            </TimelineContent>
                        </TimelineItem>
                    );
                })}
            </Timeline>
        </Box>
    );
};

export default RecentActivity;
