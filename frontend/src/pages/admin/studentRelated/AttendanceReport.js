import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
    Box, Typography, Table, TableBody, TableHead, Tooltip,
    Chip, MenuItem, Select, FormControl, InputLabel,
    Collapse, IconButton, LinearProgress, Paper, Tabs, Tab,
    TextField, InputAdornment, CircularProgress,
} from '@mui/material';
import {
    KeyboardArrowDown, KeyboardArrowUp, PictureAsPdf,
    GridOn, FilterList, Search as SearchIcon,
    AssessmentOutlined, Warning as WarningIcon, CheckCircleOutline,
} from '@mui/icons-material';
import GlassCard from '../../../components/GlassCard';
import { PurpleButton, GreenButton } from '../../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import { exportToPdf, exportToExcel } from '../../../utils/reportUtils';

/* ─── Helpers ─────────────────────────────────────────────── */
const pct = (v) => parseFloat(v ?? 0);

const StatusChip = ({ value }) => {
    const n = pct(value);
    const color = n >= 75 ? '#10b981' : n >= 50 ? '#f59e0b' : '#ef4444';
    const bg = n >= 75 ? 'rgba(16,185,129,0.12)' : n >= 50 ? 'rgba(245,158,11,0.12)' : 'rgba(239,68,68,0.12)';
    return (
        <Chip
            label={`${n.toFixed(1)}%`}
            size="small"
            icon={n >= 75 ? <CheckCircleOutline style={{ fontSize: 14, color }} /> : <WarningIcon style={{ fontSize: 14, color }} />}
            sx={{ bgcolor: bg, color, fontWeight: 700, fontSize: '0.78rem', '& .MuiChip-icon': { ml: '6px' } }}
        />
    );
};

const AttendanceMiniBar = ({ value }) => {
    const n = pct(value);
    const color = n >= 75 ? '#10b981' : n >= 50 ? '#f59e0b' : '#ef4444';
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 100 }}>
            <LinearProgress
                variant="determinate"
                value={Math.min(n, 100)}
                sx={{
                    flex: 1, height: 6, borderRadius: 8,
                    bgcolor: `${color}22`,
                    '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: 8 },
                }}
            />
            <Typography variant="caption" sx={{ color, fontWeight: 700, whiteSpace: 'nowrap' }}>
                {n.toFixed(1)}%
            </Typography>
        </Box>
    );
};

/* ─── Main Component ──────────────────────────────────────── */
const AttendanceReport = () => {
    const { currentUser } = useSelector((state) => state.user);

    const [reportData, setReportData] = useState([]);
    const [loading, setLoading]       = useState(true);
    const [error, setError]           = useState(null);
    const [openRows, setOpenRows]     = useState({});
    const [filterClass, setFilterClass]   = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');
    const [search, setSearch]         = useState('');
    const [tabValue, setTabValue]     = useState(0);

    /* Fetch report */
    useEffect(() => {
        const token = currentUser?.token;
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/AttendanceReport/${currentUser._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => { setReportData(res.data); setLoading(false); })
            .catch((err) => {
                setError(err.response?.data?.message || 'Failed to load attendance report.');
                setLoading(false);
            });
    }, [currentUser]);

    /* Derived lists */
    const classes = useMemo(() => {
        const set = new Set(reportData.map((s) => s.className));
        return ['All', ...Array.from(set).sort()];
    }, [reportData]);

    const filtered = useMemo(() => {
        return reportData.filter((s) => {
            const classOk = filterClass === 'All' || s.className === filterClass;
            const pctVal = pct(s.overallPercentage);
            const statusOk =
                filterStatus === 'All' ||
                (filterStatus === 'Good' && pctVal >= 75) ||
                (filterStatus === 'Low' && pctVal < 75);
            const searchOk =
                search === '' ||
                s.name.toLowerCase().includes(search.toLowerCase()) ||
                String(s.rollNum).includes(search);
            return classOk && statusOk && searchOk;
        });
    }, [reportData, filterClass, filterStatus, search]);

    /* Stats */
    const stats = useMemo(() => {
        if (!filtered.length) return { avg: 0, good: 0, low: 0 };
        const avg = filtered.reduce((a, s) => a + pct(s.overallPercentage), 0) / filtered.length;
        const good = filtered.filter((s) => pct(s.overallPercentage) >= 75).length;
        return { avg: avg.toFixed(1), good, low: filtered.length - good };
    }, [filtered]);

    /* Export helpers */
    const summaryColumns = [
        { id: 'rollNum',           label: 'Roll No'    },
        { id: 'name',              label: 'Name'       },
        { id: 'className',         label: 'Class'      },
        { id: 'totalPresent',      label: 'Present'    },
        { id: 'totalSessions',     label: 'Total'      },
        { id: 'overallPercentage', label: 'Overall %'  },
    ];

    const summaryRows = filtered.map((s) => ({
        rollNum: s.rollNum,
        name: s.name,
        className: s.className,
        totalPresent: s.totalPresent,
        totalSessions: s.totalSessions,
        overallPercentage: `${pct(s.overallPercentage).toFixed(1)}%`,
    }));

    /* Detailed export: one row per student-subject */
    const detailColumns = [
        { id: 'rollNum',    label: 'Roll No'   },
        { id: 'name',       label: 'Name'      },
        { id: 'className',  label: 'Class'     },
        { id: 'subName',    label: 'Subject'   },
        { id: 'present',    label: 'Present'   },
        { id: 'sessions',   label: 'Sessions'  },
        { id: 'percentage', label: 'Attendance %' },
    ];
    const detailRows = filtered.flatMap((s) =>
        s.subjects.length > 0
            ? s.subjects.map((sub) => ({
                rollNum:    s.rollNum,
                name:       s.name,
                className:  s.className,
                subName:    sub.subName,
                present:    sub.present,
                sessions:   sub.sessions,
                percentage: `${pct(sub.percentage).toFixed(1)}%`,
            }))
            : [{
                rollNum:    s.rollNum,
                name:       s.name,
                className:  s.className,
                subName:    'No Data',
                present:    0,
                sessions:   0,
                percentage: '0%',
            }]
    );

    const toggleRow = (id) =>
        setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));

    /* ── Render ── */
    if (loading) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: 2 }}>
                <CircularProgress sx={{ color: '#7f56da' }} size={48} />
                <Typography sx={{ color: 'text.secondary' }}>Loading Attendance Report…</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                <GlassCard sx={{ p: 4, textAlign: 'center', maxWidth: 400 }}>
                    <WarningIcon sx={{ fontSize: 48, color: '#ef4444', mb: 1 }} />
                    <Typography variant="h6" color="error">{error}</Typography>
                </GlassCard>
            </Box>
        );
    }

    return (
        <Box sx={{ p: { xs: 2, md: 3 }, pb: 6 }}>
            {/* ── Page Header ── */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box sx={{
                    width: 44, height: 44, borderRadius: 2.5,
                    background: 'linear-gradient(135deg, #7f56da, #06b6d4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 14px rgba(127,86,218,0.4)',
                }}>
                    <AssessmentOutlined sx={{ color: '#fff', fontSize: 24 }} />
                </Box>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                        Attendance Report
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Comprehensive student attendance analysis
                    </Typography>
                </Box>
            </Box>

            {/* ── Summary Cards ── */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 2, mb: 3 }}>
                {[
                    { label: 'Total Students', value: filtered.length, color: '#7f56da' },
                    { label: 'Avg Attendance', value: `${stats.avg}%`, color: '#06b6d4' },
                    { label: '≥75% (Good)', value: stats.good, color: '#10b981' },
                    { label: '<75% (Low)', value: stats.low, color: '#ef4444' },
                ].map(({ label, value, color }) => (
                    <GlassCard key={label} sx={{ p: 2.5, textAlign: 'center', border: `1px solid ${color}33` }}>
                        <Typography variant="h4" sx={{ fontWeight: 800, color }}>{value}</Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>{label}</Typography>
                    </GlassCard>
                ))}
            </Box>

            {/* ── Filters & Export ── */}
            <GlassCard sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center' }}>
                    <FilterList sx={{ color: '#7f56da' }} />

                    <TextField
                        size="small"
                        placeholder="Search student…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18 }} /></InputAdornment> }}
                        sx={{ minWidth: 180 }}
                    />

                    <FormControl size="small" sx={{ minWidth: 130 }}>
                        <InputLabel>Class</InputLabel>
                        <Select value={filterClass} label="Class" onChange={(e) => setFilterClass(e.target.value)}>
                            {classes.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 140 }}>
                        <InputLabel>Status</InputLabel>
                        <Select value={filterStatus} label="Status" onChange={(e) => setFilterStatus(e.target.value)}>
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="Good">≥75% (Good)</MenuItem>
                            <MenuItem value="Low">&lt;75% (Low)</MenuItem>
                        </Select>
                    </FormControl>

                    <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
                        <Tooltip title="Export Summary PDF">
                            <PurpleButton
                                id="export-attendance-pdf"
                                size="small"
                                startIcon={<PictureAsPdf />}
                                onClick={() => exportToPdf('Attendance Report', summaryColumns, summaryRows)}
                            >PDF</PurpleButton>
                        </Tooltip>
                        <Tooltip title="Export Detailed Excel">
                            <GreenButton
                                id="export-attendance-excel"
                                size="small"
                                startIcon={<GridOn />}
                                onClick={() => exportToExcel('Attendance Report', detailColumns, detailRows)}
                            >Excel</GreenButton>
                        </Tooltip>
                    </Box>
                </Box>
            </GlassCard>

            {/* ── Tabs: Summary / Detailed ── */}
            <Paper sx={{ bgcolor: 'transparent', mb: 1.5, border: '1px solid rgba(127,86,218,0.15)', borderRadius: 2 }} elevation={0}>
                <Tabs
                    value={tabValue}
                    onChange={(_, v) => setTabValue(v)}
                    sx={{ '& .MuiTab-root': { fontWeight: 600 }, '& .MuiTabs-indicator': { bgcolor: '#7f56da' } }}
                >
                    <Tab label="Summary View" />
                    <Tab label="Subject-wise Detail" />
                </Tabs>
            </Paper>

            {/* ── SUMMARY TABLE ── */}
            {tabValue === 0 && (
                <GlassCard sx={{ overflow: 'hidden' }}>
                    <Table stickyHeader size="small">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell sx={{ width: 40 }} />
                                <StyledTableCell>Roll No</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Class</StyledTableCell>
                                <StyledTableCell>Present</StyledTableCell>
                                <StyledTableCell>Total Sessions</StyledTableCell>
                                <StyledTableCell>Overall %</StyledTableCell>
                                <StyledTableCell>Progress</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {filtered.length === 0 ? (
                                <StyledTableRow>
                                    <StyledTableCell colSpan={8} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                                        No students match the current filters.
                                    </StyledTableCell>
                                </StyledTableRow>
                            ) : filtered.map((student) => (
                                <React.Fragment key={student._id}>
                                    <StyledTableRow sx={{ '&:hover': { bgcolor: 'rgba(127,86,218,0.04)' } }}>
                                        <StyledTableCell>
                                            <IconButton
                                                size="small"
                                                onClick={() => toggleRow(student._id)}
                                                disabled={!student.subjects?.length}
                                            >
                                                {openRows[student._id] ? <KeyboardArrowUp fontSize="small" /> : <KeyboardArrowDown fontSize="small" />}
                                            </IconButton>
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ fontWeight: 600, color: '#7f56da' }}>{student.rollNum}</StyledTableCell>
                                        <StyledTableCell sx={{ fontWeight: 600 }}>{student.name}</StyledTableCell>
                                        <StyledTableCell>
                                            <Chip label={student.className} size="small" sx={{ bgcolor: 'rgba(6,182,212,0.12)', color: '#06b6d4', fontWeight: 600 }} />
                                        </StyledTableCell>
                                        <StyledTableCell>{student.totalPresent}</StyledTableCell>
                                        <StyledTableCell>{student.totalSessions}</StyledTableCell>
                                        <StyledTableCell><StatusChip value={student.overallPercentage} /></StyledTableCell>
                                        <StyledTableCell sx={{ minWidth: 140 }}>
                                            <AttendanceMiniBar value={student.overallPercentage} />
                                        </StyledTableCell>
                                    </StyledTableRow>

                                    {/* Expandable subject breakdown */}
                                    <StyledTableRow>
                                        <StyledTableCell colSpan={8} sx={{ p: 0, border: 0 }}>
                                            <Collapse in={openRows[student._id]} timeout="auto" unmountOnExit>
                                                <Box sx={{ m: 1.5, bgcolor: 'rgba(127,86,218,0.04)', borderRadius: 2, border: '1px solid rgba(127,86,218,0.1)', p: 1.5 }}>
                                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700, color: '#7f56da' }}>
                                                        Subject-wise Breakdown
                                                    </Typography>
                                                    <Table size="small">
                                                        <TableHead>
                                                            <StyledTableRow>
                                                                <StyledTableCell>Subject</StyledTableCell>
                                                                <StyledTableCell>Present</StyledTableCell>
                                                                <StyledTableCell>Absent</StyledTableCell>
                                                                <StyledTableCell>Sessions</StyledTableCell>
                                                                <StyledTableCell>Attendance %</StyledTableCell>
                                                            </StyledTableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {student.subjects.map((sub, i) => (
                                                                <StyledTableRow key={i}>
                                                                    <StyledTableCell sx={{ fontWeight: 600 }}>{sub.subName}</StyledTableCell>
                                                                    <StyledTableCell sx={{ color: '#10b981' }}>{sub.present}</StyledTableCell>
                                                                    <StyledTableCell sx={{ color: '#ef4444' }}>{sub.absent}</StyledTableCell>
                                                                    <StyledTableCell>{sub.sessions}</StyledTableCell>
                                                                    <StyledTableCell><AttendanceMiniBar value={sub.percentage} /></StyledTableCell>
                                                                </StyledTableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </Box>
                                            </Collapse>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </GlassCard>
            )}

            {/* ── SUBJECT-WISE DETAIL TABLE ── */}
            {tabValue === 1 && (
                <GlassCard sx={{ overflow: 'hidden' }}>
                    <Table stickyHeader size="small">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Roll No</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Class</StyledTableCell>
                                <StyledTableCell>Subject</StyledTableCell>
                                <StyledTableCell>Present</StyledTableCell>
                                <StyledTableCell>Absent</StyledTableCell>
                                <StyledTableCell>Sessions</StyledTableCell>
                                <StyledTableCell>Attendance %</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {filtered.length === 0 ? (
                                <StyledTableRow>
                                    <StyledTableCell colSpan={8} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                                        No students match the current filters.
                                    </StyledTableCell>
                                </StyledTableRow>
                            ) : filtered.flatMap((student) =>
                                student.subjects.length > 0
                                    ? student.subjects.map((sub, i) => (
                                        <StyledTableRow key={`${student._id}-${i}`} sx={{ '&:hover': { bgcolor: 'rgba(127,86,218,0.04)' } }}>
                                            {i === 0 && (
                                                <>
                                                    <StyledTableCell rowSpan={student.subjects.length} sx={{ fontWeight: 700, color: '#7f56da', verticalAlign: 'top', borderRight: '1px solid rgba(127,86,218,0.15)' }}>{student.rollNum}</StyledTableCell>
                                                    <StyledTableCell rowSpan={student.subjects.length} sx={{ fontWeight: 700, verticalAlign: 'top', borderRight: '1px solid rgba(127,86,218,0.1)' }}>{student.name}</StyledTableCell>
                                                    <StyledTableCell rowSpan={student.subjects.length} sx={{ verticalAlign: 'top', borderRight: '1px solid rgba(127,86,218,0.1)' }}>
                                                        <Chip label={student.className} size="small" sx={{ bgcolor: 'rgba(6,182,212,0.12)', color: '#06b6d4', fontWeight: 600 }} />
                                                    </StyledTableCell>
                                                </>
                                            )}
                                            <StyledTableCell sx={{ fontWeight: 600 }}>{sub.subName}</StyledTableCell>
                                            <StyledTableCell sx={{ color: '#10b981', fontWeight: 600 }}>{sub.present}</StyledTableCell>
                                            <StyledTableCell sx={{ color: '#ef4444', fontWeight: 600 }}>{sub.absent}</StyledTableCell>
                                            <StyledTableCell>{sub.sessions}</StyledTableCell>
                                            <StyledTableCell><AttendanceMiniBar value={sub.percentage} /></StyledTableCell>
                                        </StyledTableRow>
                                    ))
                                    : [
                                        <StyledTableRow key={student._id}>
                                            <StyledTableCell sx={{ color: '#7f56da', fontWeight: 700 }}>{student.rollNum}</StyledTableCell>
                                            <StyledTableCell sx={{ fontWeight: 700 }}>{student.name}</StyledTableCell>
                                            <StyledTableCell>
                                                <Chip label={student.className} size="small" sx={{ bgcolor: 'rgba(6,182,212,0.12)', color: '#06b6d4', fontWeight: 600 }} />
                                            </StyledTableCell>
                                            <StyledTableCell colSpan={5} sx={{ color: 'text.disabled', fontStyle: 'italic' }}>No attendance data recorded</StyledTableCell>
                                        </StyledTableRow>
                                    ]
                            )}
                        </TableBody>
                    </Table>
                </GlassCard>
            )}
        </Box>
    );
};

export default AttendanceReport;
