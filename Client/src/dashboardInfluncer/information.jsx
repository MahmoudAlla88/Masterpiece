
 import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from 'react-toastify';
import { setCurrentUser } from "../redux/slices/AuthSlices";


import {
  Box,
  Typography,
  Grid,
  Button,
  Avatar,
  TextField,
  CircularProgress,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Card,
  CardContent,
  IconButton,
  Tabs,
  Tab,
  Container,
   Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";

import { 
  PhotoCamera, 
  EventNote, 
  CalendarMonth, 
  AccessTime, 
  LocationOn, 
  Person,
  Email,
  Phone,
  Edit,
  VpnKey
} from "@mui/icons-material";


const GradientButton = ({ children, ...props }) => (
  <Button
    {...props}
    sx={{
      background: "linear-gradient(to right, #6F42C1, #D63384)",
      color: "white",
      "&:hover": {
        background: "linear-gradient(to right, #5a33a0, #b02a6f)",
      },
      ...props.sx
    }}
  >
    {children}
  </Button>
);

const OutlinedGradientButton = ({ children, ...props }) => (
  <Button
    variant="outlined"
    {...props}
    sx={{
      color: "#6F42C1",
      borderColor: "#6F42C1",
      "&:hover": {
        borderColor: "#D63384",
        backgroundColor: "rgba(111, 66, 193, 0.04)",
      },
      ...props.sx
    }}
  >
    {children}
  </Button>
);

// Tab Panel Component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && (
        <Box sx={{ py: 3, width: '100%' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function InformationPersonality() {
  const currentUser = useSelector((s) => s.user.currentUser);
  const dispatch = useDispatch();
  
  const [activeTab, setActiveTab] = useState(0);
  const [editOpen, setEditOpen] = useState(false);
  const [pwdOpen, setPwdOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    location: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [pwdForm, setPwdForm] = useState({ current: "", newPwd: "", confirm: "" });

  useEffect(() => {
    if (currentUser) {
      setProfile({
        name: currentUser.name || "",
        phone: currentUser.phone || "",
        location: currentUser.location || "",
        image: currentUser.image || "",
      });
      fetchUserBookings();
    }
  }, [currentUser]);

 
  const fetchUserBookings = async () => {
    if (!currentUser?.id) return;
    
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:4000/api/users/bookings/${currentUser.id}`,
        { withCredentials: true }
      );
      console.log("booking",response)
      setBookings(response.data);
    } catch (err) {
      toast.error("Failed to load your bookings");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

 
  const handleField = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setProfile((p) => ({ ...p, image: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      const body = new FormData();
      body.append("name", profile.name);
      body.append("phone", profile.phone);
      body.append("location", profile.location);
      if (imageFile) body.append("image", imageFile);

      const { data } = await axios.patch("http://localhost:4000/user/me", body, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(setCurrentUser(data));
      toast.success("Profile updated");
      setEditOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const savePassword = async () => {
    if (pwdForm.newPwd !== pwdForm.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setSaving(true);
    try {
      await axios.patch(
        "http://localhost:4000/user/change-password",
        {
          currentPassword: pwdForm.current,
          newPassword: pwdForm.newPwd,
        },
        { withCredentials: true }
      );
      toast.success("Password changed");
      setPwdOpen(false);
      setPwdForm({ current: "", newPwd: "", confirm: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Password change failed");
    } finally {
      setSaving(false);
    }
  };

  // بتساعدني عشان الفورمات
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  //وهاي عشان فورمات الوقت
  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
const act = async (cencel, bookingId) => {
  try {
    await axios.put(
      `http://localhost:4000/api/users/status/${bookingId}`, 
      { action : cencel  , withCredentials: true  }
    );

    fetchUserBookings();
  } catch (err) {
    console.error(err);
  }
};

//   const renderProfileInfo = () => (
//     <Card
//       elevation={3}
//       sx={{
//         p: 3,
//         borderRadius: 3,
//         boxShadow: "0 8px 24px rgba(149, 157, 165, 0.2)",
//         width: '100%',
//         maxWidth: '100%',
//         mx: 'auto',
//       }}
//     >
//       {/* Avatar + Name */}
//       <Box
//         sx={{
//           width: '100%',
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           mb: 4
//         }}
//       >
//         <Avatar
//           src={profile?.image ? `http://localhost:4000${profile.image}` : "/avatar-placeholder.svg"}
//           sx={{
//             width: 150,
//             height: 150,
//             mb: 2,
//             border: "4px solid #F3E8FF",
//             boxShadow: "0 4px 12px rgba(111, 66, 193, 0.2)"
//           }}
//         />
//         <Typography
//           variant="h5"
//           sx={{
//             fontWeight: 700,
//             color: "#6F42C1",
//             textAlign: "center"
//           }}
//         >
//           {currentUser?.name}
//         </Typography>
//         <Chip
//           label={currentUser?.role || "User"}
//           sx={{
//             mt: 1,
//             bgcolor: "#6F42C1",
//             color: "white",
//             fontWeight: 600
//           }}
//         />
//       </Box>
  
//       <Divider sx={{ mb: 3 }} />
  
//       {/* Personal Information */}
//       <Box
//         sx={{
//           p: 3,
//           borderRadius: 2,
//           bgcolor: "rgba(255, 255, 255, 0.7)",
//           boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
//         }}
//       >
//         <Typography
//           variant="h6"
//           sx={{
//             mb: 3,
//             color: "#6F42C1",
//             fontWeight: 600
//           }}
//         >
//           Personal Information
//         </Typography>
  
//         <Grid
//          sx={{
//           display:"flex",
//           justifyContent:"center"
//          }}
//           container
//           spacing={3}
//           alignItems="stretch"
//         >
//           {[ 
//             {
//               icon: <Person sx={{ color: "#6F42C1", mr: 1 }} />,
//               label: "Full Name",
//               value: currentUser?.name || "-"
//             },
//             {
//               icon: <Email sx={{ color: "#6F42C1", mr: 1 }} />,
//               label: "Email Address",
//               value: currentUser?.email || "-"
//             },
//             {
//               icon: <Phone sx={{ color: "#6F42C1", mr: 1 }} />,
//               label: "Phone Number",
//               value: currentUser?.phone || "-"
//             },
//             {
//               icon: <LocationOn sx={{ color: "#6F42C1", mr: 1 }} />,
//               label: "Location",
//               value: currentUser?.location || "-"
//             }
//           ].map((info, idx) => (
//             <Grid item xs={12} sm={6} key={idx}>
//               <Box
//                 sx={{
//                   height: "100%",
//                   display: "flex",
//                   alignItems: "center",
//                   p: 2,
//                   border: "1px solid rgba(0,0,0,0.12)",
//                   borderRadius: 2,
//                   bgcolor: "white",
//                   boxSizing: "border-box"
//                 }}
//               >
//                 {info.icon}
//                 <Box>
//                   <Typography
//                     variant="subtitle2"
//                     sx={{ color: "#6F42C1", fontWeight: 600 }}
//                   >
//                     {info.label}
//                   </Typography>
//                   <Typography sx={{ fontWeight: 500 }}>
//                     {info.value}
//                   </Typography>
//                 </Box>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Card>
//   );
  
//   const renderBookings = () => (
//     <Card elevation={3} sx={{ 
//       p: 3, 
//       borderRadius: 3,
//       boxShadow: "0 8px 24px rgba(149, 157, 165, 0.2)",
//       width: '100%'
//     }}>
//       <Typography 
//         variant="h5" 
//         sx={{ 
//           fontWeight: 700, 
//           color: "#6F42C1",
//           mb: 3
//         }}
//       >
//         My Bookings
//       </Typography>
      
//       <Divider sx={{ mb: 3 }} />
      
//       {loading ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
//           <CircularProgress sx={{ color: "#6F42C1" }} />
//         </Box>
//       ) : bookings.length === 0 ? (
//         <Box 
//           sx={{ 
//             py: 6, 
//             textAlign: 'center',
//             borderRadius: 2,
//             bgcolor: 'rgba(255, 255, 255, 0.7)',
//           }}
//         >
//           <Typography variant="h6" color="text.secondary">
//             You don't have any bookings yet
//           </Typography>
//           <Typography sx={{ mt: 1, color: 'text.secondary' }}>
//             When you make reservations, they will appear here
//           </Typography>
//         </Box>
//       ) : (
//         <List sx={{ width: '100%' }}>
//           {bookings.map((booking, index) => (
            
//             <Paper
//               key={booking.id || index}
//               elevation={1}
//               sx={{
//                 mb: 2,
//                 borderRadius: 2,
//                 overflow: 'hidden',
//                 transition: 'transform 0.2s, box-shadow 0.2s',
//                 '&:hover': {
//                   transform: 'translateY(-2px)',
//                   boxShadow: '0 6px 20px rgba(111, 66, 193, 0.15)'
//                 }
//               }}
//             >
//               <ListItem 
//                 sx={{ 
//                   py: 2,
//                   borderLeft: '4px solid #6F42C1',
//                   bgcolor: 'rgba(255, 255, 255, 0.9)'
//                 }}
//               >
//                 <ListItemIcon>
//                   <Avatar sx={{ bgcolor: '#6F42C1' }}>
//                     <CalendarMonth />
//                   </Avatar>
//                 </ListItemIcon>
                
//                 <ListItemText
//                   primary={
//                     <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333' }}>
//                   <span style={{color: '#6F42C1'}}>Title:</span>     {booking.campaignTitle || 'Service Booking'}
//                     </Typography>
//                   }
               
//                   secondary={
//                     <Box sx={{ mt: 1 }}>  
//                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
//                     <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333' }}>
//                     <span style={{color: '#6F42C1'}}>Influncer_Name:</span>  {booking.InfluencerRegistration.User.name || 'Service Booking'}
//                     </Typography>
//                     </Box>
//                       <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
//                         <CalendarMonth sx={{ fontSize: 16, mr: 1, color: '#6F42C1' }} />
//                         <Typography variant="body2" color="text.secondary">
//                           {booking?.requestedDate ? formatDate(booking.requestedDate) : 'Date not specified'}
//                         </Typography>
//                       </Box>
                      
//                       <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
//                         <Typography variant="body2" color="text.secondary">
//                         <span style={{color: '#6F42C1'}}>Price:</span>    {booking.proposedPrice || 'Time not specified'}JD
//                         </Typography>
//                       </Box>
                      
//                       {booking.location && (
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           <LocationOn sx={{ fontSize: 16, mr: 1, color: '#6F42C1' }} />
//                           <Typography variant="body2" color="text.secondary">
//                             {booking.location}
//                           </Typography>
//                         </Box>
//                       )}
//                     </Box>
//                   }
//                 />
                
//                 <ListItemSecondaryAction>
//               {new Date(booking.requestedDate) < new Date() && booking.status === 'pending' && (
//                     <Button
//                       size="small"
//                       variant="outlined"
//                       color="error"
//                       sx={{ mr: 1 }}
//                       onClick={() => act('cancel', booking.id)}
//                     >
//                       Cancel
//                     </Button>
//                   )}
//                   <Chip 
//                     label={booking.status || 'Confirmed'} 
//                     sx={{ 
//                       fontWeight: 600,
//                       bgcolor: booking.status === 'Completed' ? '#4caf50' : 
//                              booking.status === 'Cancelled' ? '#f44336' : '#6F42C1',
//                       color: 'white'
//                     }} 
//                   />
//                 </ListItemSecondaryAction>
//               </ListItem>
//             </Paper>
//           ))}
//         </List>
//       )}
//     </Card>
//   );


  const renderEditProfile = () => (
    <Card elevation={3} sx={{ 
      p: 3, 
      borderRadius: 3,
      boxShadow: "0 8px 24px rgba(149, 157, 165, 0.2)",
      width: '100%'
    }}>
      <Typography 
        variant="h5" 
        sx={{ 
          fontWeight: 700, 
          color: "#6F42C1",
          mb: 3
        }}
      >
        Edit Profile
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      <Grid container spacing={3} display="flex" justifyContent="center" flexDirection="column">
        <Grid item xs={12} display="flex" justifyContent="center"  mb={3}>
          {/* <Box textAlign="center">
            <Avatar
              src={profile?.image || `http://localhost:4000${currentUser?.image}` || "/avatar-placeholder.svg"}
              sx={{ 
                width: 120, 
                height: 120, 
                mb: 2,
                border: '4px solid #F3E8FF',
                boxShadow: '0 4px 12px rgba(111, 66, 193, 0.2)'
              }}
            />
            <label htmlFor="icon-button-file">
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                style={{ display: 'none' }}
                onChange={handleImage}
              />
              <IconButton 
                color="primary" 
                aria-label="upload picture" 
                component="span"
                sx={{ 
                  background: "linear-gradient(to right, #6F42C1, #D63384)",
                  color: "white",
                  '&:hover': {
                    background: "linear-gradient(to right, #5a33a0, #b02a6f)"
                  }
                }}
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Box> */}
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={profile.name}
            onChange={handleField}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#6F42C1',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#6F42C1',
              }
            }}
          />
          
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={profile.phone}
            onChange={handleField}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#6F42C1',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#6F42C1',
              }
            }}
          />
          
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={profile.location}
            onChange={handleField}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#6F42C1',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#6F42C1',
              }
            }}
          />
        </Grid>
        
        <Grid item xs={12} display="flex" justifyContent="center" gap={2}>
          <GradientButton 
            onClick={saveProfile}
            disabled={saving}
            sx={{ px: 4, py: 1, borderRadius: 2 }}
          >
            {saving ? <CircularProgress size={22} sx={{ color: "white" }} /> : "Save Changes"}
          </GradientButton>
          
          <OutlinedGradientButton 
            onClick={() => setPwdOpen(true)}
            sx={{ px: 4, py: 1, borderRadius: 2 }}
          >
            Change Password
          </OutlinedGradientButton>
        </Grid>
      </Grid>
    </Card>
    
  );
const renderPasswordDialog = () => (
  <Dialog open={pwdOpen} onClose={() => setPwdOpen(false)} fullWidth maxWidth="sm">
    <DialogTitle>Change Password</DialogTitle>
    <DialogContent sx={{ pt: 2 }}>
      <TextField
        fullWidth
        label="Current Password"
        type="password"
        value={pwdForm.current}
        onChange={(e) => setPwdForm({ ...pwdForm, current: e.target.value })}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        label="New Password"
        type="password"
        value={pwdForm.newPwd}
        onChange={(e) => setPwdForm({ ...pwdForm, newPwd: e.target.value })}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        label="Confirm New Password"
        type="password"
        value={pwdForm.confirm}
        onChange={(e) => setPwdForm({ ...pwdForm, confirm: e.target.value })}
      />
    </DialogContent>
    <DialogActions sx={{ px: 3, pb: 2 }}>
      <Button onClick={() => setPwdOpen(false)}>Cancel</Button>
      <GradientButton onClick={savePassword} disabled={saving}>
        {saving ? <CircularProgress size={20} sx={{ color: "white" }} /> : "Save"}
      </GradientButton>
    </DialogActions>
  </Dialog>
);

  if (!currentUser) return <Typography align="center" sx={{ mt: 10 }}>Loading…</Typography>;

  return (
    <Box sx={{ 
      background: 'linear-gradient(to bottom right, #EBF5FF, #F3E8FF)', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%'
    }}>
      {/* Header with gradient background */}
      <Box 
        sx={{ 
          width: '100%', 
          background: 'linear-gradient(135deg, #6F42C1, #D63384)',
          p: { xs: 2, md: 3 },
          mb: 4,
          borderRadius: { xs: '0 0 12px 12px', md: '0 0 24px 24px' },
          boxShadow: '0 4px 20px rgba(111, 66, 193, 0.25)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>User Profile</Typography>
      </Box>

      {/* Main Content Container */}
      <Container maxWidth="lg" sx={{ mb: 6, width: '100%' }}>
        {/* Custom Styled Tabs */}
        {/* <Paper 
          elevation={3} 
          sx={{ 
            borderRadius: 3,
            overflow: 'hidden',
            mb: 4,
            boxShadow: '0 4px 12px rgba(111, 66, 193, 0.15)'
          }}
        >
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            variant="fullWidth"
            textColor="inherit"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#D63384',
                height: 3
              },
              '& .MuiTab-root': {
                fontSize: { xs: '0.85rem', md: '1rem' },
                fontWeight: 600,
                color: '#666',
                py: 2
              },
              '& .Mui-selected': {
                color: '#6F42C1 !important'
              }
            }}
          >
            <Tab 
              icon={<Person />} 
              iconPosition="start" 
              label="Profile Info" 
              sx={{ 
                '&:hover': { bgcolor: 'rgba(111, 66, 193, 0.04)' } 
              }}
            />
            <Tab 
              icon={<EventNote />} 
              iconPosition="start" 
              label="My Bookings" 
              sx={{ 
                '&:hover': { bgcolor: 'rgba(111, 66, 193, 0.04)' } 
              }}
            />
            <Tab 
              icon={<Edit />} 
              iconPosition="start" 
              label="Edit Profile" 
              sx={{ 
                '&:hover': { bgcolor: 'rgba(111, 66, 193, 0.04)' } 
              }}
            />
          </Tabs>
        </Paper> */}

        {/* Tab Panels */}
        {/* <TabPanel value={activeTab} index={0}>
          {renderProfileInfo()}
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          {renderBookings()}
        </TabPanel> */}
        <TabPanel value={activeTab} index={0}>
          {renderEditProfile()}
        </TabPanel>
      </Container>
      {renderPasswordDialog()}
    </Box>
  );
}

// Helper component for profile info display
function InfoItem({ icon, label, value }) {
  return (
    <Grid item xs={12} sm={6}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',  
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          p: 2,
          border: '1px solid rgba(0,0,0,0.12)',
          borderRadius: 2,
          boxSizing: 'border-box',
          bgcolor: 'white',
        }}
      >
        {icon}
        <Typography
          variant="caption"
          sx={{ color: '#6F42C1', fontWeight: 600 }}
        >
          {label}
        </Typography>
        <Typography sx={{ fontWeight: 500 }}>
          {value}
        </Typography>
      </Box>
    </Grid>
  );
}