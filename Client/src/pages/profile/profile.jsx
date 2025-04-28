// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { setCurrentUser } from "../../redux/slices/AuthSlices"; // adjust path
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
// import { Camera } from "lucide-react";
// import clsx from "clsx";

// export default function ProfilePage() {
//   const currentUser = useSelector((s) => s.user.currentUser);
//   const dispatch = useDispatch();

//   const [editOpen, setEditOpen] = useState(false);
//   const [passwordOpen, setPasswordOpen] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     location: "",
//     image: "",
//   });
//   const [imageFile, setImageFile] = useState(null);
//   const [pwdForm, setPwdForm] = useState({ current: "", newPwd: "", confirm: "" });
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     if (currentUser) {
//       setForm({
//         name: currentUser.name || "",
//         phone: currentUser.phone || "",
//         location: currentUser.location || "",
//         image: currentUser.image || "",
//       });
//     }
//   }, [currentUser]);

//   /* ---------- helpers ---------- */
//   const handleField = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setImageFile(file);
//     const reader = new FileReader();
//     reader.onload = (e) => setForm((f) => ({ ...f, image: e.target.result }));
//     reader.readAsDataURL(file);
//   };

//   const saveProfile = async () => {
//     setSaving(true);
//     try {
//       const body = new FormData();
//       body.append("name", form.name);
//       body.append("phone", form.phone);
//       body.append("location", form.location);
//       if (imageFile) body.append("image", imageFile);

//       const { data } = await axios.patch("http://localhost:4000/user/me", body, {
//         withCredentials: true,
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       toast.success("Profile updated");
//       dispatch(setCurrentUser(data));
//       setEditOpen(false);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Update failed");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const savePassword = async () => {
//     if (pwdForm.newPwd !== pwdForm.confirm) {
//       toast.error("Passwords do not match");
//       return;
//     }
//     setSaving(true);
//     try {
//       await axios.patch(
//         "http://localhost:4000/user/change-password",
//         {
//           currentPassword: pwdForm.current,
//           newPassword: pwdForm.newPwd,
//         },
//         { withCredentials: true }
//       );
//       toast.success("Password changed");
//       setPasswordOpen(false);
//       setPwdForm({ current: "", newPwd: "", confirm: "" });
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Password change failed");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (!currentUser) return <p className="text-center mt-20">Loading…</p>;

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-10">
//       <h1 className="text-3xl font-bold mb-8 text-purple-600">My Profile</h1>

//       {/* --------------- profile card --------------- */}
//       <Card className="p-6 flex flex-col md:flex-row gap-6 shadow-xl">
//         <div className="relative w-40 h-40 shrink-0 mx-auto md:mx-0">
//           <img
//             src={form.image || "/avatar-placeholder.svg"}
//             alt="avatar"
//             className="w-full h-full object-cover rounded-2xl shadow"
//           />
//         </div>

//         <CardContent className="flex-1 grid md:grid-cols-2 gap-4 text-gray-700 text-base">
//           <Info label="Name" value={currentUser.name} />
//           <Info label="Email" value={currentUser.email} />
//           <Info label="Phone" value={currentUser.phone} />
//           <Info label="Location" value={currentUser.location} />
//           <Info label="Role" value={currentUser.role} />
//         </CardContent>

//         <div className="flex flex-col gap-3 md:justify-center">
//           <Button onClick={() => setEditOpen(true)} className="w-full">
//             Edit profile
//           </Button>
//           <Button variant="outline" onClick={() => setPasswordOpen(true)} className="w-full">
//             Change password
//           </Button>
//         </div>
//       </Card>

//       {/* --------------- edit dialog --------------- */}
//       <Dialog open={editOpen} onOpenChange={setEditOpen}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>Edit profile</DialogHeader>
//           <div className="space-y-4">
//             <label className="block">Name<Input name="name" value={form.name} onChange={handleField} /></label>
//             <label className="block">Phone<Input name="phone" value={form.phone} onChange={handleField} /></label>
//             <label className="block">Location<Input name="location" value={form.location} onChange={handleField} /></label>
//             <label className="block text-sm font-medium text-gray-700">Avatar</label>
//             <div className="flex items-center gap-4">
//               <label className={clsx("cursor-pointer relative group")}> 
//                 <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
//                 <span className="w-20 h-20 rounded-2xl flex items-center justify-center bg-gray-100 ring-1 ring-gray-200 group-hover:ring-purple-400 transition">
//                   <Camera />
//                 </span>
//               </label>
//               {form.image && (
//                 <img src={form.image} alt="preview" className="w-20 h-20 rounded-2xl object-cover" />
//               )}
//             </div>
//             <div className="flex gap-3 justify-end mt-4">
//               <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
//               <Button disabled={saving} onClick={saveProfile}>Save</Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* --------------- password dialog --------------- */}
//       <Dialog open={passwordOpen} onOpenChange={setPasswordOpen}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>Change password</DialogHeader>
//           <div className="space-y-4">
//             <label className="block">Current password<Input type="password" value={pwdForm.current} onChange={(e)=>setPwdForm({...pwdForm,current:e.target.value})} /></label>
//             <label className="block">New password<Input type="password" value={pwdForm.newPwd} onChange={(e)=>setPwdForm({...pwdForm,newPwd:e.target.value})} /></label>
//             <label className="block">Confirm new password<Input type="password" value={pwdForm.confirm} onChange={(e)=>setPwdForm({...pwdForm,confirm:e.target.value})} /></label>
//             <div className="flex gap-3 justify-end mt-4">
//               <Button variant="outline" onClick={()=>setPasswordOpen(false)}>Cancel</Button>
//               <Button disabled={saving} onClick={savePassword}>Change</Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// /* ---------- helper component ---------- */
// function Info({ label, value }) {
//   return (
//     <div>
//       <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">{label}</p>
//       <p className="font-medium text-gray-800 truncate max-w-xs">{value || "-"}</p>
//     </div>
//   );
// }
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { setCurrentUser } from "../../redux/slices/AuthSlices"; // adjust path if needed

// // MUI components
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   Typography,
//   Grid,
//   Button,
//   Avatar,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton,
//   CircularProgress,
// } from "@mui/material";
// import { PhotoCamera } from "@mui/icons-material";

// export default function ProfilePage() {
//   const currentUser = useSelector((s) => s.user.currentUser);
//   const dispatch = useDispatch();

//   const [editOpen, setEditOpen] = useState(false);
//   const [pwdOpen, setPwdOpen] = useState(false);
//   const [saving, setSaving] = useState(false);

//   const [profile, setProfile] = useState({
//     name: "",
//     phone: "",
//     location: "",
//     image: "",
//   });
//   const [imageFile, setImageFile] = useState(null);
//   const [pwdForm, setPwdForm] = useState({ current: "", newPwd: "", confirm: "" });

//   useEffect(() => {
//     if (currentUser) {
//       setProfile({
//         name: currentUser.name || "",
//         phone: currentUser.phone || "",
//         location: currentUser.location || "",
//         image: currentUser.image || "",
//       });
//     }
//   }, [currentUser]);

//   /* ---------------- handlers ---------------- */
//   const handleField = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setImageFile(file);
//     const reader = new FileReader();
//     reader.onload = (ev) => setProfile((p) => ({ ...p, image: ev.target.result }));
//     reader.readAsDataURL(file);
//   };

//   const saveProfile = async () => {
//     setSaving(true);
//     try {
//       const body = new FormData();
//       body.append("name", profile.name);
//       body.append("phone", profile.phone);
//       body.append("location", profile.location);
//       if (imageFile) body.append("image", imageFile);

//       const { data } = await axios.patch("http://localhost:4000/user/me", body, {
//         withCredentials: true,
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       dispatch(setCurrentUser(data));
//       toast.success("Profile updated");
//       setEditOpen(false);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Update failed");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const savePassword = async () => {
//     if (pwdForm.newPwd !== pwdForm.confirm) {
//       toast.error("Passwords do not match");
//       return;
//     }
//     setSaving(true);
//     try {
//       await axios.patch(
//         "http://localhost:4000/user/change-password",
//         {
//           currentPassword: pwdForm.current,
//           newPassword: pwdForm.newPwd,
//         },
//         { withCredentials: true }
//       );
//       toast.success("Password changed");
//       setPwdOpen(false);
//       setPwdForm({ current: "", newPwd: "", confirm: "" });
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Password change failed");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (!currentUser) return <Typography align="center" sx={{ mt: 10 }}>Loading…</Typography>;

//   return (
//     <Grid container justifyContent="center" sx={{ p: 4 }}>
//       <Grid item xs={12} md={10} lg={8}>
//         <Card elevation={3} sx={{ p: 3 }}>
//           <CardHeader title="My Profile" titleTypographyProps={{ variant: "h5", color: "primary" }} />

//           <Grid container spacing={4} alignItems="center">
//             <Grid item xs={12} md="auto" textAlign="center">
//               <Avatar
//                 src={`http://localhost:4000${profile?.image}` || "/avatar-placeholder.svg"}
//                 sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
//               />
//             </Grid>
//             <Grid item xs>
//               <CardContent>
//                 <Info label="Name" value={currentUser.name} />
//                 <Info label="Email" value={currentUser.email} />
//                 <Info label="Phone" value={currentUser.phone} />
//                 <Info label="Location" value={currentUser.location} />
//                 <Info label="Role" value={currentUser.role} />
//               </CardContent>
//             </Grid>
//             <Grid item xs={12} md={3} textAlign="center">
//               <Button variant="contained" fullWidth sx={{ mb: 1 }} onClick={() => setEditOpen(true)}>
//                 Edit profile
//               </Button>
//               <Button variant="outlined" fullWidth onClick={() => setPwdOpen(true)}>
//                 Change password
//               </Button>
//             </Grid>
//           </Grid>
//         </Card>
//       </Grid>

//       {/* ---------- Edit Dialog ---------- */}
//       <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="sm">
//         <DialogTitle>Edit profile</DialogTitle>
//         <DialogContent dividers>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             {[
//               { label: "Name", name: "name", value: profile.name },
//               { label: "Phone", name: "phone", value: profile.phone },
//               { label: "Location", name: "location", value: profile.location },
//             ].map((f) => (
//               <Grid item xs={12} key={f.name}>
//                 <TextField
//                   fullWidth
//                   label={f.label}
//                   name={f.name}
//                   value={f.value}
//                   onChange={handleField}
//                 />
//               </Grid>
//             ))}
//             <Grid item xs={12}>
//               <Typography variant="subtitle2" sx={{ mb: 1 }}>
//                 Avatar
//               </Typography>
//               <label htmlFor="avatar-upload">
//                 <input
//                   id="avatar-upload"
//                   hidden
//                   accept="image/*"
//                   type="file"
//                   onChange={handleImage}
//                 />
//                 <IconButton color="primary" component="span">
//                   <PhotoCamera />
//                 </IconButton>
//               </label>
//               {profile.image && (
//                 <Avatar src={profile.image} sx={{ width: 64, height: 64, ml: 2 }} />
//               )}
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setEditOpen(false)} disabled={saving}>
//             Cancel
//           </Button>
//           <Button variant="contained" onClick={saveProfile} disabled={saving}>
//             {saving ? <CircularProgress size={22} /> : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* ---------- Password Dialog ---------- */}
//       <Dialog open={pwdOpen} onClose={() => setPwdOpen(false)} fullWidth maxWidth="sm">
//         <DialogTitle>Change password</DialogTitle>
//         <DialogContent dividers>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Current password"
//                 type="password"
//                 value={pwdForm.current}
//                 onChange={(e) => setPwdForm({ ...pwdForm, current: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="New password"
//                 type="password"
//                 value={pwdForm.newPwd}
//                 onChange={(e) => setPwdForm({ ...pwdForm, newPwd: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Confirm new password"
//                 type="password"
//                 value={pwdForm.confirm}
//                 onChange={(e) => setPwdForm({ ...pwdForm, confirm: e.target.value })}
//               />
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setPwdOpen(false)} disabled={saving}>
//             Cancel
//           </Button>
//           <Button variant="contained" onClick={savePassword} disabled={saving}>
//             {saving ? <CircularProgress size={22} /> : "Change"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Grid>
//   );
// }

// /* ---------- helper ---------- */
// function Info({ label, value }) {
//   return (
//     <Typography sx={{ mb: 1 }}>
//       <Typography component="span" sx={{ fontWeight: 500, color: "text.secondary", mr: 1 }}>
//         {label}:
//       </Typography>
//       {value || "-"}
//     </Typography>
//   );
// }
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from 'react-toastify';
import { setCurrentUser } from "../../redux/slices/AuthSlices"; // adjust path if needed

// MUI components
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Button,
  Avatar,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
  Box,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Styled components for custom colors
const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(to right, #6F42C1, #D63384)",
  color: "white",
  "&:hover": {
    background: "linear-gradient(to right, #5a33a0, #b02a6f)",
  },
}));

const OutlinedGradientButton = styled(Button)(({ theme }) => ({
  color: "#6F42C1",
  borderColor: "#6F42C1",
  "&:hover": {
    borderColor: "#D63384",
    backgroundColor: "rgba(111, 66, 193, 0.04)",
  },
}));

export default function ProfilePage() {
  const currentUser = useSelector((s) => s.user.currentUser);
  const dispatch = useDispatch();

  const [editOpen, setEditOpen] = useState(false);
  const [pwdOpen, setPwdOpen] = useState(false);
  const [saving, setSaving] = useState(false);

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
    }
  }, [currentUser]);

  /* ---------------- handlers ---------------- */
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

  if (!currentUser) return <Typography align="center" sx={{ mt: 10 }}>Loading…</Typography>;

  return (
    <Box sx={{ 
      background: "linear-gradient(to bottom right, #EBF5FF, #F3E8FF)", 
      minHeight: "100vh", 
      py: 4 
    }}>
      <Grid container justifyContent="center" sx={{ p: 2 }}>
        <Grid item xs={12} md={10} lg={8}>
          <Card elevation={5} sx={{ 
            p: 3, 
            borderRadius: 2,
            boxShadow: "0 8px 24px rgba(149, 157, 165, 0.2)"
          }}>
            <CardHeader 
              title="My Profile" 
              titleTypographyProps={{ 
                variant: "h5", 
                fontWeight: 600,
                color: "#6F42C1"
              }} 
            />

            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md="auto" textAlign="center">
                <Avatar
                  src={`http://localhost:4000${profile?.image}` || "/avatar-placeholder.svg"}
                  sx={{ 
                    width: 150, 
                    height: 150, 
                    mx: "auto", 
                    mb: 2,
                    border: '4px solid #F3E8FF'
                  }}
                />
              </Grid>
              <Grid item xs>
                <CardContent>
                  <Info label="Name" value={currentUser.name} />
                  <Info label="Email" value={currentUser.email} />
                  <Info label="Phone" value={currentUser.phone} />
                  <Info label="Location" value={currentUser.location} />
                  <Info label="Role" value={currentUser.role} />
                </CardContent>
              </Grid>
              <Grid item xs={12} md={3} textAlign="center">
                <GradientButton fullWidth sx={{ mb: 2, py: 1.2, borderRadius: 2 }} onClick={() => setEditOpen(true)}>
                  Edit profile
                </GradientButton>
                <OutlinedGradientButton variant="outlined" fullWidth sx={{ borderRadius: 2, py: 1.2 }} onClick={() => setPwdOpen(true)}>
                  Change password
                </OutlinedGradientButton>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>

      {/* ---------- Edit Dialog ---------- */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: "#6F42C1", fontWeight: 600 }}>Edit profile</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {[
              { label: "Name", name: "name", value: profile.name },
              { label: "Phone", name: "phone", value: profile.phone },
              { label: "Location", name: "location", value: profile.location },
            ].map((f) => (
              <Grid item xs={12} key={f.name}>
                <TextField
                  fullWidth
                  label={f.label}
                  name={f.name}
                  value={f.value}
                  onChange={handleField}
                  sx={{
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#6F42C1',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#6F42C1',
                    }
                  }}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: "#6F42C1" }}>
                Avatar
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="avatar-upload">
                  <input
                    id="avatar-upload"
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleImage}
                  />
                  <IconButton 
                    color="primary" 
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
                {profile.image && (
                  <Avatar 
                    src={profile.image} 
                    sx={{ 
                      width: 64, 
                      height: 64, 
                      ml: 2,
                      border: '2px solid #F3E8FF' 
                    }} 
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button 
            onClick={() => setEditOpen(false)} 
            disabled={saving}
            sx={{ color: "#6F42C1" }}
          >
            Cancel
          </Button>
          <GradientButton 
            onClick={saveProfile} 
            disabled={saving}
            sx={{ px: 3, borderRadius: 1 }}
          >
            {saving ? <CircularProgress size={22} sx={{ color: "white" }} /> : "Save"}
          </GradientButton>
        </DialogActions>
      </Dialog>

      {/* ---------- Password Dialog ---------- */}
      <Dialog open={pwdOpen} onClose={() => setPwdOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: "#6F42C1", fontWeight: 600 }}>Change password</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current password"
                type="password"
                value={pwdForm.current}
                onChange={(e) => setPwdForm({ ...pwdForm, current: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#6F42C1',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#6F42C1',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="New password"
                type="password"
                value={pwdForm.newPwd}
                onChange={(e) => setPwdForm({ ...pwdForm, newPwd: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#6F42C1',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#6F42C1',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm new password"
                type="password"
                value={pwdForm.confirm}
                onChange={(e) => setPwdForm({ ...pwdForm, confirm: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#6F42C1',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#6F42C1',
                  }
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button 
            onClick={() => setPwdOpen(false)} 
            disabled={saving}
            sx={{ color: "#6F42C1" }}
          >
            Cancel
          </Button>
          <GradientButton 
            onClick={savePassword} 
            disabled={saving}
            sx={{ px: 3, borderRadius: 1 }}
          >
            {saving ? <CircularProgress size={22} sx={{ color: "white" }} /> : "Change"}
          </GradientButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

/* ---------- helper ---------- */
function Info({ label, value }) {
  return (
    <Typography sx={{ mb: 1.5 }}>
      <Typography 
        component="span" 
        sx={{ 
          fontWeight: 600, 
          color: "#6F42C1", 
          mr: 1,
          display: "inline-block",
          minWidth: "80px"
        }}
      >
        {label}:
      </Typography>
      {value || "-"}
    </Typography>
  );
}