// // // // import { useState, useEffect } from "react";
// // // // import { useSelector, useDispatch } from "react-redux";
// // // // import axios from "axios";
// // // // import { toast } from "react-hot-toast";
// // // // import { setCurrentUser } from "../../redux/slices/AuthSlices"; // adjust path
// // // // import { Card, CardContent } from "@/components/ui/card";
// // // // import { Button } from "@/components/ui/button";
// // // // import { Input } from "@/components/ui/input";
// // // // import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
// // // // import { Camera } from "lucide-react";
// // // // import clsx from "clsx";

// // // // export default function ProfilePage() {
// // // //   const currentUser = useSelector((s) => s.user.currentUser);
// // // //   const dispatch = useDispatch();

// // // //   const [editOpen, setEditOpen] = useState(false);
// // // //   const [passwordOpen, setPasswordOpen] = useState(false);

// // // //   const [form, setForm] = useState({
// // // //     name: "",
// // // //     phone: "",
// // // //     location: "",
// // // //     image: "",
// // // //   });
// // // //   const [imageFile, setImageFile] = useState(null);
// // // //   const [pwdForm, setPwdForm] = useState({ current: "", newPwd: "", confirm: "" });
// // // //   const [saving, setSaving] = useState(false);

// // // //   useEffect(() => {
// // // //     if (currentUser) {
// // // //       setForm({
// // // //         name: currentUser.name || "",
// // // //         phone: currentUser.phone || "",
// // // //         location: currentUser.location || "",
// // // //         image: currentUser.image || "",
// // // //       });
// // // //     }
// // // //   }, [currentUser]);

// // // //   /* ---------- helpers ---------- */
// // // //   const handleField = (e) => setForm({ ...form, [e.target.name]: e.target.value });

// // // //   const handleImage = (e) => {
// // // //     const file = e.target.files[0];
// // // //     if (!file) return;
// // // //     setImageFile(file);
// // // //     const reader = new FileReader();
// // // //     reader.onload = (e) => setForm((f) => ({ ...f, image: e.target.result }));
// // // //     reader.readAsDataURL(file);
// // // //   };

// // // //   const saveProfile = async () => {
// // // //     setSaving(true);
// // // //     try {
// // // //       const body = new FormData();
// // // //       body.append("name", form.name);
// // // //       body.append("phone", form.phone);
// // // //       body.append("location", form.location);
// // // //       if (imageFile) body.append("image", imageFile);

// // // //       const { data } = await axios.patch("http://localhost:4000/user/me", body, {
// // // //         withCredentials: true,
// // // //         headers: { "Content-Type": "multipart/form-data" },
// // // //       });
// // // //       toast.success("Profile updated");
// // // //       dispatch(setCurrentUser(data));
// // // //       setEditOpen(false);
// // // //     } catch (err) {
// // // //       toast.error(err.response?.data?.message || "Update failed");
// // // //     } finally {
// // // //       setSaving(false);
// // // //     }
// // // //   };

// // // //   const savePassword = async () => {
// // // //     if (pwdForm.newPwd !== pwdForm.confirm) {
// // // //       toast.error("Passwords do not match");
// // // //       return;
// // // //     }
// // // //     setSaving(true);
// // // //     try {
// // // //       await axios.patch(
// // // //         "http://localhost:4000/user/change-password",
// // // //         {
// // // //           currentPassword: pwdForm.current,
// // // //           newPassword: pwdForm.newPwd,
// // // //         },
// // // //         { withCredentials: true }
// // // //       );
// // // //       toast.success("Password changed");
// // // //       setPasswordOpen(false);
// // // //       setPwdForm({ current: "", newPwd: "", confirm: "" });
// // // //     } catch (err) {
// // // //       toast.error(err.response?.data?.message || "Password change failed");
// // // //     } finally {
// // // //       setSaving(false);
// // // //     }
// // // //   };

// // // //   if (!currentUser) return <p className="text-center mt-20">Loading…</p>;

// // // //   return (
// // // //     <div className="max-w-4xl mx-auto px-4 py-10">
// // // //       <h1 className="text-3xl font-bold mb-8 text-purple-600">My Profile</h1>

// // // //       {/* --------------- profile card --------------- */}
// // // //       <Card className="p-6 flex flex-col md:flex-row gap-6 shadow-xl">
// // // //         <div className="relative w-40 h-40 shrink-0 mx-auto md:mx-0">
// // // //           <img
// // // //             src={form.image || "/avatar-placeholder.svg"}
// // // //             alt="avatar"
// // // //             className="w-full h-full object-cover rounded-2xl shadow"
// // // //           />
// // // //         </div>

// // // //         <CardContent className="flex-1 grid md:grid-cols-2 gap-4 text-gray-700 text-base">
// // // //           <Info label="Name" value={currentUser.name} />
// // // //           <Info label="Email" value={currentUser.email} />
// // // //           <Info label="Phone" value={currentUser.phone} />
// // // //           <Info label="Location" value={currentUser.location} />
// // // //           <Info label="Role" value={currentUser.role} />
// // // //         </CardContent>

// // // //         <div className="flex flex-col gap-3 md:justify-center">
// // // //           <Button onClick={() => setEditOpen(true)} className="w-full">
// // // //             Edit profile
// // // //           </Button>
// // // //           <Button variant="outline" onClick={() => setPasswordOpen(true)} className="w-full">
// // // //             Change password
// // // //           </Button>
// // // //         </div>
// // // //       </Card>

// // // //       {/* --------------- edit dialog --------------- */}
// // // //       <Dialog open={editOpen} onOpenChange={setEditOpen}>
// // // //         <DialogContent className="max-w-md">
// // // //           <DialogHeader>Edit profile</DialogHeader>
// // // //           <div className="space-y-4">
// // // //             <label className="block">Name<Input name="name" value={form.name} onChange={handleField} /></label>
// // // //             <label className="block">Phone<Input name="phone" value={form.phone} onChange={handleField} /></label>
// // // //             <label className="block">Location<Input name="location" value={form.location} onChange={handleField} /></label>
// // // //             <label className="block text-sm font-medium text-gray-700">Avatar</label>
// // // //             <div className="flex items-center gap-4">
// // // //               <label className={clsx("cursor-pointer relative group")}> 
// // // //                 <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
// // // //                 <span className="w-20 h-20 rounded-2xl flex items-center justify-center bg-gray-100 ring-1 ring-gray-200 group-hover:ring-purple-400 transition">
// // // //                   <Camera />
// // // //                 </span>
// // // //               </label>
// // // //               {form.image && (
// // // //                 <img src={form.image} alt="preview" className="w-20 h-20 rounded-2xl object-cover" />
// // // //               )}
// // // //             </div>
// // // //             <div className="flex gap-3 justify-end mt-4">
// // // //               <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
// // // //               <Button disabled={saving} onClick={saveProfile}>Save</Button>
// // // //             </div>
// // // //           </div>
// // // //         </DialogContent>
// // // //       </Dialog>

// // // //       {/* --------------- password dialog --------------- */}
// // // //       <Dialog open={passwordOpen} onOpenChange={setPasswordOpen}>
// // // //         <DialogContent className="max-w-md">
// // // //           <DialogHeader>Change password</DialogHeader>
// // // //           <div className="space-y-4">
// // // //             <label className="block">Current password<Input type="password" value={pwdForm.current} onChange={(e)=>setPwdForm({...pwdForm,current:e.target.value})} /></label>
// // // //             <label className="block">New password<Input type="password" value={pwdForm.newPwd} onChange={(e)=>setPwdForm({...pwdForm,newPwd:e.target.value})} /></label>
// // // //             <label className="block">Confirm new password<Input type="password" value={pwdForm.confirm} onChange={(e)=>setPwdForm({...pwdForm,confirm:e.target.value})} /></label>
// // // //             <div className="flex gap-3 justify-end mt-4">
// // // //               <Button variant="outline" onClick={()=>setPasswordOpen(false)}>Cancel</Button>
// // // //               <Button disabled={saving} onClick={savePassword}>Change</Button>
// // // //             </div>
// // // //           </div>
// // // //         </DialogContent>
// // // //       </Dialog>
// // // //     </div>
// // // //   );
// // // // }

// // // // /* ---------- helper component ---------- */
// // // // function Info({ label, value }) {
// // // //   return (
// // // //     <div>
// // // //       <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">{label}</p>
// // // //       <p className="font-medium text-gray-800 truncate max-w-xs">{value || "-"}</p>
// // // //     </div>
// // // //   );
// // // // }
// // // // import { useState, useEffect } from "react";
// // // // import { useSelector, useDispatch } from "react-redux";
// // // // import axios from "axios";
// // // // import { toast } from "react-hot-toast";
// // // // import { setCurrentUser } from "../../redux/slices/AuthSlices"; // adjust path if needed

// // // // // MUI components
// // // // import {
// // // //   Card,
// // // //   CardContent,
// // // //   CardHeader,
// // // //   Typography,
// // // //   Grid,
// // // //   Button,
// // // //   Avatar,
// // // //   TextField,
// // // //   Dialog,
// // // //   DialogTitle,
// // // //   DialogContent,
// // // //   DialogActions,
// // // //   IconButton,
// // // //   CircularProgress,
// // // // } from "@mui/material";
// // // // import { PhotoCamera } from "@mui/icons-material";

// // // // export default function ProfilePage() {
// // // //   const currentUser = useSelector((s) => s.user.currentUser);
// // // //   const dispatch = useDispatch();

// // // //   const [editOpen, setEditOpen] = useState(false);
// // // //   const [pwdOpen, setPwdOpen] = useState(false);
// // // //   const [saving, setSaving] = useState(false);

// // // //   const [profile, setProfile] = useState({
// // // //     name: "",
// // // //     phone: "",
// // // //     location: "",
// // // //     image: "",
// // // //   });
// // // //   const [imageFile, setImageFile] = useState(null);
// // // //   const [pwdForm, setPwdForm] = useState({ current: "", newPwd: "", confirm: "" });

// // // //   useEffect(() => {
// // // //     if (currentUser) {
// // // //       setProfile({
// // // //         name: currentUser.name || "",
// // // //         phone: currentUser.phone || "",
// // // //         location: currentUser.location || "",
// // // //         image: currentUser.image || "",
// // // //       });
// // // //     }
// // // //   }, [currentUser]);

// // // //   /* ---------------- handlers ---------------- */
// // // //   const handleField = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

// // // //   const handleImage = (e) => {
// // // //     const file = e.target.files[0];
// // // //     if (!file) return;
// // // //     setImageFile(file);
// // // //     const reader = new FileReader();
// // // //     reader.onload = (ev) => setProfile((p) => ({ ...p, image: ev.target.result }));
// // // //     reader.readAsDataURL(file);
// // // //   };

// // // //   const saveProfile = async () => {
// // // //     setSaving(true);
// // // //     try {
// // // //       const body = new FormData();
// // // //       body.append("name", profile.name);
// // // //       body.append("phone", profile.phone);
// // // //       body.append("location", profile.location);
// // // //       if (imageFile) body.append("image", imageFile);

// // // //       const { data } = await axios.patch("http://localhost:4000/user/me", body, {
// // // //         withCredentials: true,
// // // //         headers: { "Content-Type": "multipart/form-data" },
// // // //       });
// // // //       dispatch(setCurrentUser(data));
// // // //       toast.success("Profile updated");
// // // //       setEditOpen(false);
// // // //     } catch (err) {
// // // //       toast.error(err.response?.data?.message || "Update failed");
// // // //     } finally {
// // // //       setSaving(false);
// // // //     }
// // // //   };

// // // //   const savePassword = async () => {
// // // //     if (pwdForm.newPwd !== pwdForm.confirm) {
// // // //       toast.error("Passwords do not match");
// // // //       return;
// // // //     }
// // // //     setSaving(true);
// // // //     try {
// // // //       await axios.patch(
// // // //         "http://localhost:4000/user/change-password",
// // // //         {
// // // //           currentPassword: pwdForm.current,
// // // //           newPassword: pwdForm.newPwd,
// // // //         },
// // // //         { withCredentials: true }
// // // //       );
// // // //       toast.success("Password changed");
// // // //       setPwdOpen(false);
// // // //       setPwdForm({ current: "", newPwd: "", confirm: "" });
// // // //     } catch (err) {
// // // //       toast.error(err.response?.data?.message || "Password change failed");
// // // //     } finally {
// // // //       setSaving(false);
// // // //     }
// // // //   };

// // // //   if (!currentUser) return <Typography align="center" sx={{ mt: 10 }}>Loading…</Typography>;

// // // //   return (
// // // //     <Grid container justifyContent="center" sx={{ p: 4 }}>
// // // //       <Grid item xs={12} md={10} lg={8}>
// // // //         <Card elevation={3} sx={{ p: 3 }}>
// // // //           <CardHeader title="My Profile" titleTypographyProps={{ variant: "h5", color: "primary" }} />

// // // //           <Grid container spacing={4} alignItems="center">
// // // //             <Grid item xs={12} md="auto" textAlign="center">
// // // //               <Avatar
// // // //                 src={`http://localhost:4000${profile?.image}` || "/avatar-placeholder.svg"}
// // // //                 sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
// // // //               />
// // // //             </Grid>
// // // //             <Grid item xs>
// // // //               <CardContent>
// // // //                 <Info label="Name" value={currentUser.name} />
// // // //                 <Info label="Email" value={currentUser.email} />
// // // //                 <Info label="Phone" value={currentUser.phone} />
// // // //                 <Info label="Location" value={currentUser.location} />
// // // //                 <Info label="Role" value={currentUser.role} />
// // // //               </CardContent>
// // // //             </Grid>
// // // //             <Grid item xs={12} md={3} textAlign="center">
// // // //               <Button variant="contained" fullWidth sx={{ mb: 1 }} onClick={() => setEditOpen(true)}>
// // // //                 Edit profile
// // // //               </Button>
// // // //               <Button variant="outlined" fullWidth onClick={() => setPwdOpen(true)}>
// // // //                 Change password
// // // //               </Button>
// // // //             </Grid>
// // // //           </Grid>
// // // //         </Card>
// // // //       </Grid>

// // // //       {/* ---------- Edit Dialog ---------- */}
// // // //       <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="sm">
// // // //         <DialogTitle>Edit profile</DialogTitle>
// // // //         <DialogContent dividers>
// // // //           <Grid container spacing={2} sx={{ mt: 1 }}>
// // // //             {[
// // // //               { label: "Name", name: "name", value: profile.name },
// // // //               { label: "Phone", name: "phone", value: profile.phone },
// // // //               { label: "Location", name: "location", value: profile.location },
// // // //             ].map((f) => (
// // // //               <Grid item xs={12} key={f.name}>
// // // //                 <TextField
// // // //                   fullWidth
// // // //                   label={f.label}
// // // //                   name={f.name}
// // // //                   value={f.value}
// // // //                   onChange={handleField}
// // // //                 />
// // // //               </Grid>
// // // //             ))}
// // // //             <Grid item xs={12}>
// // // //               <Typography variant="subtitle2" sx={{ mb: 1 }}>
// // // //                 Avatar
// // // //               </Typography>
// // // //               <label htmlFor="avatar-upload">
// // // //                 <input
// // // //                   id="avatar-upload"
// // // //                   hidden
// // // //                   accept="image/*"
// // // //                   type="file"
// // // //                   onChange={handleImage}
// // // //                 />
// // // //                 <IconButton color="primary" component="span">
// // // //                   <PhotoCamera />
// // // //                 </IconButton>
// // // //               </label>
// // // //               {profile.image && (
// // // //                 <Avatar src={profile.image} sx={{ width: 64, height: 64, ml: 2 }} />
// // // //               )}
// // // //             </Grid>
// // // //           </Grid>
// // // //         </DialogContent>
// // // //         <DialogActions>
// // // //           <Button onClick={() => setEditOpen(false)} disabled={saving}>
// // // //             Cancel
// // // //           </Button>
// // // //           <Button variant="contained" onClick={saveProfile} disabled={saving}>
// // // //             {saving ? <CircularProgress size={22} /> : "Save"}
// // // //           </Button>
// // // //         </DialogActions>
// // // //       </Dialog>

// // // //       {/* ---------- Password Dialog ---------- */}
// // // //       <Dialog open={pwdOpen} onClose={() => setPwdOpen(false)} fullWidth maxWidth="sm">
// // // //         <DialogTitle>Change password</DialogTitle>
// // // //         <DialogContent dividers>
// // // //           <Grid container spacing={2} sx={{ mt: 1 }}>
// // // //             <Grid item xs={12}>
// // // //               <TextField
// // // //                 fullWidth
// // // //                 label="Current password"
// // // //                 type="password"
// // // //                 value={pwdForm.current}
// // // //                 onChange={(e) => setPwdForm({ ...pwdForm, current: e.target.value })}
// // // //               />
// // // //             </Grid>
// // // //             <Grid item xs={12}>
// // // //               <TextField
// // // //                 fullWidth
// // // //                 label="New password"
// // // //                 type="password"
// // // //                 value={pwdForm.newPwd}
// // // //                 onChange={(e) => setPwdForm({ ...pwdForm, newPwd: e.target.value })}
// // // //               />
// // // //             </Grid>
// // // //             <Grid item xs={12}>
// // // //               <TextField
// // // //                 fullWidth
// // // //                 label="Confirm new password"
// // // //                 type="password"
// // // //                 value={pwdForm.confirm}
// // // //                 onChange={(e) => setPwdForm({ ...pwdForm, confirm: e.target.value })}
// // // //               />
// // // //             </Grid>
// // // //           </Grid>
// // // //         </DialogContent>
// // // //         <DialogActions>
// // // //           <Button onClick={() => setPwdOpen(false)} disabled={saving}>
// // // //             Cancel
// // // //           </Button>
// // // //           <Button variant="contained" onClick={savePassword} disabled={saving}>
// // // //             {saving ? <CircularProgress size={22} /> : "Change"}
// // // //           </Button>
// // // //         </DialogActions>
// // // //       </Dialog>
// // // //     </Grid>
// // // //   );
// // // // }

// // // // /* ---------- helper ---------- */
// // // // function Info({ label, value }) {
// // // //   return (
// // // //     <Typography sx={{ mb: 1 }}>
// // // //       <Typography component="span" sx={{ fontWeight: 500, color: "text.secondary", mr: 1 }}>
// // // //         {label}:
// // // //       </Typography>
// // // //       {value || "-"}
// // // //     </Typography>
// // // //   );
// // // // }
// // // import { useState, useEffect } from "react";
// // // import { useSelector, useDispatch } from "react-redux";
// // // import axios from "axios";
// // // import { toast } from 'react-toastify';
// // // import { setCurrentUser } from "../../redux/slices/AuthSlices"; // adjust path if needed

// // // // MUI components
// // // import {
// // //   Card,
// // //   CardContent,
// // //   CardHeader,
// // //   Typography,
// // //   Grid,
// // //   Button,
// // //   Avatar,
// // //   TextField,
// // //   Dialog,
// // //   DialogTitle,
// // //   DialogContent,
// // //   DialogActions,
// // //   IconButton,
// // //   CircularProgress,
// // //   Box,
// // // } from "@mui/material";
// // // import { PhotoCamera } from "@mui/icons-material";
// // // import { styled } from "@mui/material/styles";

// // // // Styled components for custom colors
// // // const GradientButton = styled(Button)(({ theme }) => ({
// // //   background: "linear-gradient(to right, #6F42C1, #D63384)",
// // //   color: "white",
// // //   "&:hover": {
// // //     background: "linear-gradient(to right, #5a33a0, #b02a6f)",
// // //   },
// // // }));

// // // const OutlinedGradientButton = styled(Button)(({ theme }) => ({
// // //   color: "#6F42C1",
// // //   borderColor: "#6F42C1",
// // //   "&:hover": {
// // //     borderColor: "#D63384",
// // //     backgroundColor: "rgba(111, 66, 193, 0.04)",
// // //   },
// // // }));

// // // export default function ProfilePage() {
// // //   const currentUser = useSelector((s) => s.user.currentUser);
// // //   const dispatch = useDispatch();

// // //   const [editOpen, setEditOpen] = useState(false);
// // //   const [pwdOpen, setPwdOpen] = useState(false);
// // //   const [saving, setSaving] = useState(false);

// // //   const [profile, setProfile] = useState({
// // //     name: "",
// // //     phone: "",
// // //     location: "",
// // //     image: "",
// // //   });
// // //   const [imageFile, setImageFile] = useState(null);
// // //   const [pwdForm, setPwdForm] = useState({ current: "", newPwd: "", confirm: "" });

// // //   useEffect(() => {
// // //     if (currentUser) {
// // //       setProfile({
// // //         name: currentUser.name || "",
// // //         phone: currentUser.phone || "",
// // //         location: currentUser.location || "",
// // //         image: currentUser.image || "",
// // //       });
// // //     }
// // //   }, [currentUser]);

// // //   /* ---------------- handlers ---------------- */
// // //   const handleField = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

// // //   const handleImage = (e) => {
// // //     const file = e.target.files[0];
// // //     if (!file) return;
// // //     setImageFile(file);
// // //     const reader = new FileReader();
// // //     reader.onload = (ev) => setProfile((p) => ({ ...p, image: ev.target.result }));
// // //     reader.readAsDataURL(file);
// // //   };

// // //   const saveProfile = async () => {
// // //     setSaving(true);
// // //     try {
// // //       const body = new FormData();
// // //       body.append("name", profile.name);
// // //       body.append("phone", profile.phone);
// // //       body.append("location", profile.location);
// // //       if (imageFile) body.append("image", imageFile);

// // //       const { data } = await axios.patch("http://localhost:4000/user/me", body, {
// // //         withCredentials: true,
// // //         headers: { "Content-Type": "multipart/form-data" },
// // //       });
// // //       dispatch(setCurrentUser(data));
// // //       toast.success("Profile updated");
// // //       setEditOpen(false);
// // //     } catch (err) {
// // //       toast.error(err.response?.data?.message || "Update failed");
// // //     } finally {
// // //       setSaving(false);
// // //     }
// // //   };

// // //   const savePassword = async () => {
// // //     if (pwdForm.newPwd !== pwdForm.confirm) {
// // //       toast.error("Passwords do not match");
// // //       return;
// // //     }
// // //     setSaving(true);
// // //     try {
// // //       await axios.patch(
// // //         "http://localhost:4000/user/change-password",
// // //         {
// // //           currentPassword: pwdForm.current,
// // //           newPassword: pwdForm.newPwd,
// // //         },
// // //         { withCredentials: true }
// // //       );
// // //       toast.success("Password changed");
// // //       setPwdOpen(false);
// // //       setPwdForm({ current: "", newPwd: "", confirm: "" });
// // //     } catch (err) {
// // //       toast.error(err.response?.data?.message || "Password change failed");
// // //     } finally {
// // //       setSaving(false);
// // //     }
// // //   };

// // //   if (!currentUser) return <Typography align="center" sx={{ mt: 10 }}>Loading…</Typography>;

// // //   return (
// // //     <Box sx={{ 
// // //       background: "linear-gradient(to bottom right, #EBF5FF, #F3E8FF)", 
// // //       minHeight: "100vh", 
// // //       py: 4 
// // //     }}>
// // //       <Grid container justifyContent="center" sx={{ p: 2 }}>
// // //         <Grid item xs={12} md={10} lg={8}>
// // //           <Card elevation={5} sx={{ 
// // //             p: 3, 
// // //             borderRadius: 2,
// // //             boxShadow: "0 8px 24px rgba(149, 157, 165, 0.2)"
// // //           }}>
// // //             <CardHeader 
// // //               title="My Profile" 
// // //               titleTypographyProps={{ 
// // //                 variant: "h5", 
// // //                 fontWeight: 600,
// // //                 color: "#6F42C1"
// // //               }} 
// // //             />

// // //             <Grid container spacing={4} alignItems="center">
// // //               <Grid item xs={12} md="auto" textAlign="center">
// // //                 <Avatar
// // //                   src={`http://localhost:4000${profile?.image}` || "/avatar-placeholder.svg"}
// // //                   sx={{ 
// // //                     width: 150, 
// // //                     height: 150, 
// // //                     mx: "auto", 
// // //                     mb: 2,
// // //                     border: '4px solid #F3E8FF'
// // //                   }}
// // //                 />
// // //               </Grid>
// // //               <Grid item xs>
// // //                 <CardContent>
// // //                   <Info label="Name" value={currentUser.name} />
// // //                   <Info label="Email" value={currentUser.email} />
// // //                   <Info label="Phone" value={currentUser.phone} />
// // //                   <Info label="Location" value={currentUser.location} />
// // //                   <Info label="Role" value={currentUser.role} />
// // //                 </CardContent>
// // //               </Grid>
// // //               <Grid item xs={12} md={3} textAlign="center">
// // //                 <GradientButton fullWidth sx={{ mb: 2, py: 1.2, borderRadius: 2 }} onClick={() => setEditOpen(true)}>
// // //                   Edit profile
// // //                 </GradientButton>
// // //                 <OutlinedGradientButton variant="outlined" fullWidth sx={{ borderRadius: 2, py: 1.2 }} onClick={() => setPwdOpen(true)}>
// // //                   Change password
// // //                 </OutlinedGradientButton>
// // //               </Grid>
// // //             </Grid>
// // //           </Card>
// // //         </Grid>
// // //       </Grid>

// // //       {/* ---------- Edit Dialog ---------- */}
// // //       <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="sm">
// // //         <DialogTitle sx={{ color: "#6F42C1", fontWeight: 600 }}>Edit profile</DialogTitle>
// // //         <DialogContent dividers>
// // //           <Grid container spacing={2} sx={{ mt: 1 }}>
// // //             {[
// // //               { label: "Name", name: "name", value: profile.name },
// // //               { label: "Phone", name: "phone", value: profile.phone },
// // //               { label: "Location", name: "location", value: profile.location },
// // //             ].map((f) => (
// // //               <Grid item xs={12} key={f.name}>
// // //                 <TextField
// // //                   fullWidth
// // //                   label={f.label}
// // //                   name={f.name}
// // //                   value={f.value}
// // //                   onChange={handleField}
// // //                   sx={{
// // //                     '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
// // //                       borderColor: '#6F42C1',
// // //                     },
// // //                     '& .MuiInputLabel-root.Mui-focused': {
// // //                       color: '#6F42C1',
// // //                     }
// // //                   }}
// // //                 />
// // //               </Grid>
// // //             ))}
// // //             <Grid item xs={12}>
// // //               <Typography variant="subtitle2" sx={{ mb: 1, color: "#6F42C1" }}>
// // //                 Avatar
// // //               </Typography>
// // //               <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // //                 <label htmlFor="avatar-upload">
// // //                   <input
// // //                     id="avatar-upload"
// // //                     hidden
// // //                     accept="image/*"
// // //                     type="file"
// // //                     onChange={handleImage}
// // //                   />
// // //                   <IconButton 
// // //                     color="primary" 
// // //                     component="span"
// // //                     sx={{ 
// // //                       background: "linear-gradient(to right, #6F42C1, #D63384)",
// // //                       color: "white",
// // //                       '&:hover': {
// // //                         background: "linear-gradient(to right, #5a33a0, #b02a6f)"
// // //                       }
// // //                     }}
// // //                   >
// // //                     <PhotoCamera />
// // //                   </IconButton>
// // //                 </label>
// // //                 {profile.image && (
// // //                   <Avatar 
// // //                     src={profile.image} 
// // //                     sx={{ 
// // //                       width: 64, 
// // //                       height: 64, 
// // //                       ml: 2,
// // //                       border: '2px solid #F3E8FF' 
// // //                     }} 
// // //                   />
// // //                 )}
// // //               </Box>
// // //             </Grid>
// // //           </Grid>
// // //         </DialogContent>
// // //         <DialogActions sx={{ px: 3, py: 2 }}>
// // //           <Button 
// // //             onClick={() => setEditOpen(false)} 
// // //             disabled={saving}
// // //             sx={{ color: "#6F42C1" }}
// // //           >
// // //             Cancel
// // //           </Button>
// // //           <GradientButton 
// // //             onClick={saveProfile} 
// // //             disabled={saving}
// // //             sx={{ px: 3, borderRadius: 1 }}
// // //           >
// // //             {saving ? <CircularProgress size={22} sx={{ color: "white" }} /> : "Save"}
// // //           </GradientButton>
// // //         </DialogActions>
// // //       </Dialog>

// // //       {/* ---------- Password Dialog ---------- */}
// // //       <Dialog open={pwdOpen} onClose={() => setPwdOpen(false)} fullWidth maxWidth="sm">
// // //         <DialogTitle sx={{ color: "#6F42C1", fontWeight: 600 }}>Change password</DialogTitle>
// // //         <DialogContent dividers>
// // //           <Grid container spacing={2} sx={{ mt: 1 }}>
// // //             <Grid item xs={12}>
// // //               <TextField
// // //                 fullWidth
// // //                 label="Current password"
// // //                 type="password"
// // //                 value={pwdForm.current}
// // //                 onChange={(e) => setPwdForm({ ...pwdForm, current: e.target.value })}
// // //                 sx={{
// // //                   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
// // //                     borderColor: '#6F42C1',
// // //                   },
// // //                   '& .MuiInputLabel-root.Mui-focused': {
// // //                     color: '#6F42C1',
// // //                   }
// // //                 }}
// // //               />
// // //             </Grid>
// // //             <Grid item xs={12}>
// // //               <TextField
// // //                 fullWidth
// // //                 label="New password"
// // //                 type="password"
// // //                 value={pwdForm.newPwd}
// // //                 onChange={(e) => setPwdForm({ ...pwdForm, newPwd: e.target.value })}
// // //                 sx={{
// // //                   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
// // //                     borderColor: '#6F42C1',
// // //                   },
// // //                   '& .MuiInputLabel-root.Mui-focused': {
// // //                     color: '#6F42C1',
// // //                   }
// // //                 }}
// // //               />
// // //             </Grid>
// // //             <Grid item xs={12}>
// // //               <TextField
// // //                 fullWidth
// // //                 label="Confirm new password"
// // //                 type="password"
// // //                 value={pwdForm.confirm}
// // //                 onChange={(e) => setPwdForm({ ...pwdForm, confirm: e.target.value })}
// // //                 sx={{
// // //                   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
// // //                     borderColor: '#6F42C1',
// // //                   },
// // //                   '& .MuiInputLabel-root.Mui-focused': {
// // //                     color: '#6F42C1',
// // //                   }
// // //                 }}
// // //               />
// // //             </Grid>
// // //           </Grid>
// // //         </DialogContent>
// // //         <DialogActions sx={{ px: 3, py: 2 }}>
// // //           <Button 
// // //             onClick={() => setPwdOpen(false)} 
// // //             disabled={saving}
// // //             sx={{ color: "#6F42C1" }}
// // //           >
// // //             Cancel
// // //           </Button>
// // //           <GradientButton 
// // //             onClick={savePassword} 
// // //             disabled={saving}
// // //             sx={{ px: 3, borderRadius: 1 }}
// // //           >
// // //             {saving ? <CircularProgress size={22} sx={{ color: "white" }} /> : "Change"}
// // //           </GradientButton>
// // //         </DialogActions>
// // //       </Dialog>
// // //     </Box>
// // //   );
// // // }

// // // /* ---------- helper ---------- */
// // // function Info({ label, value }) {
// // //   return (
// // //     <Typography sx={{ mb: 1.5 }}>
// // //       <Typography 
// // //         component="span" 
// // //         sx={{ 
// // //           fontWeight: 600, 
// // //           color: "#6F42C1", 
// // //           mr: 1,
// // //           display: "inline-block",
// // //           minWidth: "80px"
// // //         }}
// // //       >
// // //         {label}:
// // //       </Typography>
// // //       {value || "-"}
// // //     </Typography>
// // //   );
// // // }
// // import { useState, useEffect } from "react";
// // import { useSelector, useDispatch } from "react-redux";
// // import axios from "axios";
// // import { toast } from 'react-toastify';
// // import { setCurrentUser } from "../../redux/slices/AuthSlices"; // adjust path if needed

// // // MUI components
// // import {
// //   Card,
// //   CardContent,
// //   CardHeader,
// //   Typography,
// //   Grid,
// //   Button,
// //   Avatar,
// //   TextField,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   IconButton,
// //   CircularProgress,
// //   Box,
// //   Tabs,
// //   Tab,
// //   Paper,
// //   Divider,
// //   Chip,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   ListItemAvatar,
// //   ListItemSecondaryAction,
// // } from "@mui/material";
// // import { 
// //   PhotoCamera, 
// //   EventNote, 
// //   CalendarMonth, 
// //   AccessTime, 
// //   LocationOn, 
// //   Person
// // } from "@mui/icons-material";
// // import { styled } from "@mui/material/styles";

// // // Styled components for custom colors
// // const GradientButton = styled(Button)(({ theme }) => ({
// //   background: "linear-gradient(to right, #6F42C1, #D63384)",
// //   color: "white",
// //   "&:hover": {
// //     background: "linear-gradient(to right, #5a33a0, #b02a6f)",
// //   },
// // }));

// // const OutlinedGradientButton = styled(Button)(({ theme }) => ({
// //   color: "#6F42C1",
// //   borderColor: "#6F42C1",
// //   "&:hover": {
// //     borderColor: "#D63384",
// //     backgroundColor: "rgba(111, 66, 193, 0.04)",
// //   },
// // }));

// // const StyledTab = styled(Tab)(({ theme }) => ({
// //   color: "#6F42C1",
// //   fontWeight: 600,
// //   "&.Mui-selected": {
// //     color: "#D63384",
// //   },
// // }));

// // // Custom TabPanel component
// // function TabPanel({ children, value, index, ...other }) {
// //   return (
// //     <div
// //       role="tabpanel"
// //       hidden={value !== index}
// //       id={`profile-tabpanel-${index}`}
// //       aria-labelledby={`profile-tab-${index}`}
// //       {...other}
// //     >
// //       {value === index && (
// //         <Box sx={{ py: 3 }}>
// //           {children}
// //         </Box>
// //       )}
// //     </div>
// //   );
// // }

// // export default function ProfilePage() {
// //   const currentUser = useSelector((s) => s.user.currentUser);
// //   const dispatch = useDispatch();

// //   const [editOpen, setEditOpen] = useState(false);
// //   const [pwdOpen, setPwdOpen] = useState(false);
// //   const [saving, setSaving] = useState(false);
// //   const [tabValue, setTabValue] = useState(0);
// //   const [bookings, setBookings] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   const [profile, setProfile] = useState({
// //     name: "",
// //     phone: "",
// //     location: "",
// //     image: "",
// //   });
// //   const [imageFile, setImageFile] = useState(null);
// //   const [pwdForm, setPwdForm] = useState({ current: "", newPwd: "", confirm: "" });

// //   useEffect(() => {
// //     if (currentUser) {
// //       setProfile({
// //         name: currentUser.name || "",
// //         phone: currentUser.phone || "",
// //         location: currentUser.location || "",
// //         image: currentUser.image || "",
// //       });
// //       fetchUserBookings();
// //     }
// //   }, [currentUser]);

// //   // Fetch user bookings
// //   const fetchUserBookings = async () => {
// //     if (!currentUser?.id) return;
    
// //     setLoading(true);
// //     try {
// //       const response = await axios.get(
// //         `http://localhost:4000/api/users/bookings/${currentUser.id}`,
// //         { withCredentials: true }
// //       );
// //       setBookings(response.data);
// //     } catch (err) {
// //       toast.error("Failed to load your bookings");
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleTabChange = (event, newValue) => {
// //     setTabValue(newValue);
// //   };

// //   /* ---------------- handlers ---------------- */
// //   const handleField = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

// //   const handleImage = (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;
// //     setImageFile(file);
// //     const reader = new FileReader();
// //     reader.onload = (ev) => setProfile((p) => ({ ...p, image: ev.target.result }));
// //     reader.readAsDataURL(file);
// //   };

// //   const saveProfile = async () => {
// //     setSaving(true);
// //     try {
// //       const body = new FormData();
// //       body.append("name", profile.name);
// //       body.append("phone", profile.phone);
// //       body.append("location", profile.location);
// //       if (imageFile) body.append("image", imageFile);

// //       const { data } = await axios.patch("http://localhost:4000/user/me", body, {
// //         withCredentials: true,
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });
// //       dispatch(setCurrentUser(data));
// //       toast.success("Profile updated");
// //       setEditOpen(false);
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || "Update failed");
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   const savePassword = async () => {
// //     if (pwdForm.newPwd !== pwdForm.confirm) {
// //       toast.error("Passwords do not match");
// //       return;
// //     }
// //     setSaving(true);
// //     try {
// //       await axios.patch(
// //         "http://localhost:4000/user/change-password",
// //         {
// //           currentPassword: pwdForm.current,
// //           newPassword: pwdForm.newPwd,
// //         },
// //         { withCredentials: true }
// //       );
// //       toast.success("Password changed");
// //       setPwdOpen(false);
// //       setPwdForm({ current: "", newPwd: "", confirm: "" });
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || "Password change failed");
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   // Helper function to format date
// //   const formatDate = (dateString) => {
// //     const options = { year: 'numeric', month: 'long', day: 'numeric' };
// //     return new Date(dateString).toLocaleDateString('en-US', options);
// //   };

// //   // Helper function to format time
// //   const formatTime = (timeString) => {
// //     return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
// //       hour: '2-digit',
// //       minute: '2-digit',
// //       hour12: true
// //     });
// //   };

// //   if (!currentUser) return <Typography align="center" sx={{ mt: 10 }}>Loading…</Typography>;

// //   return (
// //     <Box sx={{ 
// //       background: "linear-gradient(to bottom right, #EBF5FF, #F3E8FF)", 
// //       minHeight: "100vh", 
// //       py: 4 
// //     }}>
// //       <Grid container justifyContent="center" sx={{ px: 2 }}>
// //         <Grid item xs={12} md={10} lg={9}>
// //           <Paper 
// //             elevation={0} 
// //             sx={{
// //               p: 3,
// //               mb: 4,
// //               borderRadius: 3,
// //               background: 'linear-gradient(135deg, #8A4BDB10, #D63D8420)',
// //               backdropFilter: 'blur(10px)',
// //               border: '1px solid rgba(255,255,255,0.3)',
// //             }}
// //           >
// //             <Typography 
// //               variant="h4" 
// //               sx={{ 
// //                 fontWeight: 700, 
// //                 color: "#6F42C1",
// //                 textAlign: "center",
// //                 mb: 2,
// //                 textShadow: '0px 2px 4px rgba(0,0,0,0.1)'
// //               }}
// //             >
// //               My Dashboard
// //             </Typography>
            
// //             <Tabs 
// //               value={tabValue} 
// //               onChange={handleTabChange} 
// //               centered
// //               sx={{
// //                 '& .MuiTabs-indicator': {
// //                   backgroundColor: '#D63384',
// //                   height: 3,
// //                   borderRadius: '2px'
// //                 }
// //               }}
// //             >
// //               <StyledTab icon={<Person />} label="Profile" />
// //               <StyledTab icon={<EventNote />} label="My Bookings" />
// //             </Tabs>
// //           </Paper>

// //           {/* Profile Tab */}
// //           <TabPanel value={tabValue} index={0}>
// //             <Card elevation={5} sx={{ 
// //               p: 3, 
// //               borderRadius: 3,
// //               boxShadow: "0 8px 24px rgba(149, 157, 165, 0.2)"
// //             }}>
// //               <CardHeader 
// //                 title="Personal Information" 
// //                 titleTypographyProps={{ 
// //                   variant: "h5", 
// //                   fontWeight: 600,
// //                   color: "#6F42C1"
// //                 }} 
// //               />

// //               <Grid container spacing={4} alignItems="center">
// //                 <Grid item xs={12} md="auto" textAlign="center">
// //                   <Avatar
// //                     src={`http://localhost:4000${profile?.image}` || "/avatar-placeholder.svg"}
// //                     sx={{ 
// //                       width: 150, 
// //                       height: 150, 
// //                       mx: "auto", 
// //                       mb: 2,
// //                       border: '4px solid #F3E8FF',
// //                       boxShadow: '0 4px 12px rgba(111, 66, 193, 0.2)'
// //                     }}
// //                   />
// //                   <Box sx={{ mt: 2, display: { xs: 'flex', md: 'block' }, justifyContent: 'center', gap: 2 }}>
// //                     <GradientButton 
// //                       sx={{ 
// //                         px: 3, 
// //                         py: 1, 
// //                         borderRadius: 2,
// //                         fontSize: '0.9rem',
// //                         width: { xs: '45%', md: '80%' },
// //                         mb: { xs: 0, md: 2 }
// //                       }} 
// //                       onClick={() => setEditOpen(true)}
// //                     >
// //                       Edit profile
// //                     </GradientButton>
// //                     <OutlinedGradientButton 
// //                       variant="outlined" 
// //                       sx={{ 
// //                         px: 3, 
// //                         py: 1, 
// //                         borderRadius: 2,
// //                         fontSize: '0.9rem',
// //                         width: { xs: '45%', md: '80%' }
// //                       }} 
// //                       onClick={() => setPwdOpen(true)}
// //                     >
// //                       Change password
// //                     </OutlinedGradientButton>
// //                   </Box>
// //                 </Grid>
// //                 <Grid item xs>
// //                   <CardContent sx={{ pl: { md: 4 } }}>
// //                     <Box 
// //                       sx={{ 
// //                         p: 3,
// //                         borderRadius: 2,
// //                         bgcolor: 'rgba(255, 255, 255, 0.7)',
// //                         boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
// //                       }}
// //                     >
// //                       <Grid container spacing={3}>
// //                         <InfoItem label="Name" value={currentUser.name} icon={<Person sx={{ color: "#6F42C1" }} />} />
// //                         <InfoItem label="Email" value={currentUser.email} icon={<Person sx={{ color: "#6F42C1" }} />} />
// //                         <InfoItem label="Phone" value={currentUser.phone} icon={<Person sx={{ color: "#6F42C1" }} />} />
// //                         <InfoItem label="Location" value={currentUser.location} icon={<LocationOn sx={{ color: "#6F42C1" }} />} />
// //                         <InfoItem label="Role" value={currentUser.role} icon={<Person sx={{ color: "#6F42C1" }} />} />
// //                       </Grid>
// //                     </Box>
// //                   </CardContent>
// //                 </Grid>
// //               </Grid>
// //             </Card>
// //           </TabPanel>

// //           {/* Bookings Tab */}
// //           <TabPanel value={tabValue} index={1}>
// //             <Card elevation={5} sx={{ 
// //               p: 3, 
// //               borderRadius: 3,
// //               boxShadow: "0 8px 24px rgba(149, 157, 165, 0.2)"
// //             }}>
// //               <CardHeader 
// //                 title="My Bookings" 
// //                 titleTypographyProps={{ 
// //                   variant: "h5", 
// //                   fontWeight: 600,
// //                   color: "#6F42C1"
// //                 }} 
// //               />
              
// //               <Divider sx={{ my: 2 }} />
              
// //               {loading ? (
// //                 <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
// //                   <CircularProgress sx={{ color: "#6F42C1" }} />
// //                 </Box>
// //               ) : bookings.length === 0 ? (
// //                 <Box 
// //                   sx={{ 
// //                     py: 6, 
// //                     textAlign: 'center',
// //                     borderRadius: 2,
// //                     bgcolor: 'rgba(255, 255, 255, 0.7)',
// //                   }}
// //                 >
// //                   <Typography variant="h6" color="text.secondary">
// //                     You don't have any bookings yet
// //                   </Typography>
// //                   <Typography sx={{ mt: 1, color: 'text.secondary' }}>
// //                     When you make reservations, they will appear here
// //                   </Typography>
// //                 </Box>
// //               ) : (
// //                 <List sx={{ width: '100%' }}>
// //                   {bookings.map((booking, index) => (
// //                     <Paper
// //                       key={booking.id || index}
// //                       elevation={1}
// //                       sx={{
// //                         mb: 2,
// //                         borderRadius: 2,
// //                         overflow: 'hidden',
// //                         transition: 'transform 0.2s, box-shadow 0.2s',
// //                         '&:hover': {
// //                           transform: 'translateY(-2px)',
// //                           boxShadow: '0 6px 20px rgba(111, 66, 193, 0.15)'
// //                         }
// //                       }}
// //                     >
// //                       <ListItem 
// //                         sx={{ 
// //                           py: 2,
// //                           borderLeft: '4px solid #6F42C1',
// //                           bgcolor: 'rgba(255, 255, 255, 0.9)'
// //                         }}
// //                       >
// //                         <ListItemAvatar>
// //                           <Avatar sx={{ bgcolor: '#6F42C1' }}>
// //                             <CalendarMonth />
// //                           </Avatar>
// //                         </ListItemAvatar>
                        
// //                         <ListItemText
// //                           primary={
// //                             <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333' }}>
// //                               {booking.serviceName || 'Service Booking'}
// //                             </Typography>
// //                           }
// //                           secondary={
// //                             <Box sx={{ mt: 1 }}>
// //                               <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
// //                                 <CalendarMonth sx={{ fontSize: 16, mr: 1, color: '#6F42C1' }} />
// //                                 <Typography variant="body2" color="text.secondary">
// //                                   {booking.date ? formatDate(booking.date) : 'Date not specified'}
// //                                 </Typography>
// //                               </Box>
                              
// //                               <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
// //                                 <AccessTime sx={{ fontSize: 16, mr: 1, color: '#6F42C1' }} />
// //                                 <Typography variant="body2" color="text.secondary">
// //                                   {booking.time ? formatTime(booking.time) : 'Time not specified'}
// //                                 </Typography>
// //                               </Box>
                              
// //                               {booking.location && (
// //                                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                                   <LocationOn sx={{ fontSize: 16, mr: 1, color: '#6F42C1' }} />
// //                                   <Typography variant="body2" color="text.secondary">
// //                                     {booking.location}
// //                                   </Typography>
// //                                 </Box>
// //                               )}
// //                             </Box>
// //                           }
// //                         />
                        
// //                         <ListItemSecondaryAction>
// //                           <Chip 
// //                             label={booking.status || 'Confirmed'} 
// //                             sx={{ 
// //                               fontWeight: 600,
// //                               bgcolor: booking.status === 'Completed' ? '#4caf50' : 
// //                                     booking.status === 'Cancelled' ? '#f44336' : '#6F42C1',
// //                               color: 'white'
// //                             }} 
// //                           />
// //                         </ListItemSecondaryAction>
// //                       </ListItem>
// //                     </Paper>
// //                   ))}
// //                 </List>
// //               )}
// //             </Card>
// //           </TabPanel>
// //         </Grid>
// //       </Grid>

// //       {/* ---------- Edit Dialog ---------- */}
// //       <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="sm">
// //         <DialogTitle sx={{ color: "#6F42C1", fontWeight: 600 }}>Edit profile</DialogTitle>
// //         <DialogContent dividers>
// //           <Grid container spacing={2} sx={{ mt: 1 }}>
// //             {[
// //               { label: "Name", name: "name", value: profile.name },
// //               { label: "Phone", name: "phone", value: profile.phone },
// //               { label: "Location", name: "location", value: profile.location },
// //             ].map((f) => (
// //               <Grid item xs={12} key={f.name}>
// //                 <TextField
// //                   fullWidth
// //                   label={f.label}
// //                   name={f.name}
// //                   value={f.value}
// //                   onChange={handleField}
// //                   sx={{
// //                     '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
// //                       borderColor: '#6F42C1',
// //                     },
// //                     '& .MuiInputLabel-root.Mui-focused': {
// //                       color: '#6F42C1',
// //                     }
// //                   }}
// //                 />
// //               </Grid>
// //             ))}
// //             <Grid item xs={12}>
// //               <Typography variant="subtitle2" sx={{ mb: 1, color: "#6F42C1" }}>
// //                 Avatar
// //               </Typography>
// //               <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                 <label htmlFor="avatar-upload">
// //                   <input
// //                     id="avatar-upload"
// //                     hidden
// //                     accept="image/*"
// //                     type="file"
// //                     onChange={handleImage}
// //                   />
// //                   <IconButton 
// //                     color="primary" 
// //                     component="span"
// //                     sx={{ 
// //                       background: "linear-gradient(to right, #6F42C1, #D63384)",
// //                       color: "white",
// //                       '&:hover': {
// //                         background: "linear-gradient(to right, #5a33a0, #b02a6f)"
// //                       }
// //                     }}
// //                   >
// //                     <PhotoCamera />
// //                   </IconButton>
// //                 </label>
// //                 {profile.image && (
// //                   <Avatar 
// //                     src={profile.image} 
// //                     sx={{ 
// //                       width: 64, 
// //                       height: 64, 
// //                       ml: 2,
// //                       border: '2px solid #F3E8FF' 
// //                     }} 
// //                   />
// //                 )}
// //               </Box>
// //             </Grid>
// //           </Grid>
// //         </DialogContent>
// //         <DialogActions sx={{ px: 3, py: 2 }}>
// //           <Button 
// //             onClick={() => setEditOpen(false)} 
// //             disabled={saving}
// //             sx={{ color: "#6F42C1" }}
// //           >
// //             Cancel
// //           </Button>
// //           <GradientButton 
// //             onClick={saveProfile} 
// //             disabled={saving}
// //             sx={{ px: 3, borderRadius: 1 }}
// //           >
// //             {saving ? <CircularProgress size={22} sx={{ color: "white" }} /> : "Save"}
// //           </GradientButton>
// //         </DialogActions>
// //       </Dialog>

// //       {/* ---------- Password Dialog ---------- */}
// //       <Dialog open={pwdOpen} onClose={() => setPwdOpen(false)} fullWidth maxWidth="sm">
// //         <DialogTitle sx={{ color: "#6F42C1", fontWeight: 600 }}>Change password</DialogTitle>
// //         <DialogContent dividers>
// //           <Grid container spacing={2} sx={{ mt: 1 }}>
// //             <Grid item xs={12}>
// //               <TextField
// //                 fullWidth
// //                 label="Current password"
// //                 type="password"
// //                 value={pwdForm.current}
// //                 onChange={(e) => setPwdForm({ ...pwdForm, current: e.target.value })}
// //                 sx={{
// //                   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
// //                     borderColor: '#6F42C1',
// //                   },
// //                   '& .MuiInputLabel-root.Mui-focused': {
// //                     color: '#6F42C1',
// //                   }
// //                 }}
// //               />
// //             </Grid>
// //             <Grid item xs={12}>
// //               <TextField
// //                 fullWidth
// //                 label="New password"
// //                 type="password"
// //                 value={pwdForm.newPwd}
// //                 onChange={(e) => setPwdForm({ ...pwdForm, newPwd: e.target.value })}
// //                 sx={{
// //                   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
// //                     borderColor: '#6F42C1',
// //                   },
// //                   '& .MuiInputLabel-root.Mui-focused': {
// //                     color: '#6F42C1',
// //                   }
// //                 }}
// //               />
// //             </Grid>
// //             <Grid item xs={12}>
// //               <TextField
// //                 fullWidth
// //                 label="Confirm new password"
// //                 type="password"
// //                 value={pwdForm.confirm}
// //                 onChange={(e) => setPwdForm({ ...pwdForm, confirm: e.target.value })}
// //                 sx={{
// //                   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
// //                     borderColor: '#6F42C1',
// //                   },
// //                   '& .MuiInputLabel-root.Mui-focused': {
// //                     color: '#6F42C1',
// //                   }
// //                 }}
// //               />
// //             </Grid>
// //           </Grid>
// //         </DialogContent>
// //         <DialogActions sx={{ px: 3, py: 2 }}>
// //           <Button 
// //             onClick={() => setPwdOpen(false)} 
// //             disabled={saving}
// //             sx={{ color: "#6F42C1" }}
// //           >
// //             Cancel
// //           </Button>
// //           <GradientButton 
// //             onClick={savePassword} 
// //             disabled={saving}
// //             sx={{ px: 3, borderRadius: 1 }}
// //           >
// //             {saving ? <CircularProgress size={22} sx={{ color: "white" }} /> : "Change"}
// //           </GradientButton>
// //         </DialogActions>
// //       </Dialog>
// //     </Box>
// //   );
// // }

// // /* ---------- helper component ---------- */
// // function InfoItem({ label, value, icon }) {
// //   return (
// //     <Grid item xs={12} sm={6}>
// //       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
// //         {icon}
// //         <Box>
// //           <Typography 
// //             variant="caption" 
// //             sx={{ 
// //               color: "#6F42C1",
// //               fontWeight: 600,
// //               textTransform: 'uppercase',
// //               letterSpacing: 0.5
// //             }}
// //           >
// //             {label}
// //           </Typography>
// //           <Typography sx={{ fontWeight: 500 }}>
// //             {value || "-"}
// //           </Typography>
// //         </Box>
// //       </Box>
// //     </Grid>
// //   );
// // }



import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from 'react-toastify';
import { setCurrentUser } from "../../redux/slices/AuthSlices"; // Using the same path as in original code

// MUI components
import {
  Box,
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
  Divider,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Card,
  CardContent
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

// Gradient styles for consistency with original design
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

export default function ProfilePage() {
  const currentUser = useSelector((s) => s.user.currentUser);
  const dispatch = useDispatch();
  
  const [activeMenu, setActiveMenu] = useState("profile");
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

  // Fetch user bookings from the endpoint
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

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Helper function to format time
  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Information items for profile display
  const renderProfileInfo = () => (
    <Card
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: "0 8px 24px rgba(149, 157, 165, 0.2)",
        // height: '100vh',
        width: '100%',
        maxWidth: 600,      // optional: constrain card width
        mx: 'auto',         // center on larger screens
      }}
    >
      {/* Avatar + Name */}
      <Box
        sx={{
          width: '100%',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 4
        }}
      >
        <Avatar
          src={profile?.image ? `http://localhost:4000${profile.image}` : "/avatar-placeholder.svg"}
          sx={{
            width: 150,
            height: 150,
            mb: 2,
            border: "4px solid #F3E8FF",
            boxShadow: "0 4px 12px rgba(111, 66, 193, 0.2)"
          }}
        />
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#6F42C1",
            textAlign: "center"
          }}
        >
          {currentUser?.name}
        </Typography>
        <Chip
          label={currentUser?.role || "User"}
          sx={{
            mt: 1,
            bgcolor: "#6F42C1",
            color: "white",
            fontWeight: 600
          }}
        />
      </Box>
  
      <Divider sx={{ mb: 3 }} />
  
      {/* Personal Information */}
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          bgcolor: "rgba(255, 255, 255, 0.7)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
          // remove height: '60%'
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            color: "#6F42C1",
            fontWeight: 600
          }}
        >
          Personal Information
        </Typography>
  
        <Grid
          container
          spacing={3}
          alignItems="stretch"  // make all children equal height
        >
          {[ 
            {
              icon: <Person sx={{ color: "#6F42C1", mr: 1 }} />,
              label: "Full Name",
              value: currentUser?.name || "-"
            },
            {
              icon: <Email sx={{ color: "#6F42C1", mr: 1 }} />,
              label: "Email Address",
              value: currentUser?.email || "-"
            },
            {
              icon: <Phone sx={{ color: "#6F42C1", mr: 1 }} />,
              label: "Phone Number",
              value: currentUser?.phone || "-"
            },
            {
              icon: <LocationOn sx={{ color: "#6F42C1", mr: 1 }} />,
              label: "Location",
              value: currentUser?.location || "-"
            }
          ].map((info, idx) => (
            <Grid item xs={12} sm={6} key={idx}>
              <Box
                sx={{
                  height: "100%",            // stretch to match siblings
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderRadius: 2,
                  bgcolor: "white",
                  boxSizing: "border-box"
                }}
              >
                {info.icon}
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#6F42C1", fontWeight: 600 }}
                  >
                    {info.label}
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    {info.value}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
  );
  // const renderProfileInfo = () => (
  //   <Card elevation={3} sx={{ 
  //     p: 3, 
  //     borderRadius: 3,
  //     boxShadow: "0 8px 24px rgba(149, 157, 165, 0.2)",
  //     height: "100vh"
  //   }}>
  //     <Box sx={{ 
  //       display: "flex", 
  //       flexDirection: "column", 
  //       alignItems: "center",
  //       mb: 4 
  //     }}>
  //       <Avatar
  //         src={`http://localhost:4000${profile?.image}` || "/avatar-placeholder.svg"}
  //         sx={{ 
  //           width: 150, 
  //           height: 150, 
  //           mb: 2,
  //           border: '4px solid #F3E8FF',
  //           boxShadow: '0 4px 12px rgba(111, 66, 193, 0.2)'
  //         }}
  //       />
  //       <Typography 
  //         variant="h5" 
  //         sx={{ 
  //           fontWeight: 700, 
  //           color: "#6F42C1",
  //           textAlign: "center" 
  //         }}
  //       >
  //         {currentUser?.name}
  //       </Typography>
  //       <Chip 
  //         label={currentUser?.role || "User"} 
  //         sx={{ 
  //           mt: 1,
  //           bgcolor: "#6F42C1",
  //           color: "white",
  //           fontWeight: 600
  //         }} 
  //       />
  //     </Box>

  //     <Divider sx={{ mb: 3 }} />
      
  //     <Box sx={{ 
  //       height:"60%",
  //       p: 3,
  //       borderRadius: 2,
  //       bgcolor: 'rgba(255, 255, 255, 0.7)',
  //       boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  //     }}>
  //       <Typography 
  //         variant="h6" 
  //         sx={{ 
  //           mb: 3, 
  //           color: "#6F42C1",
  //           fontWeight: 600
  //         }}
  //       >
  //         Personal Information
  //       </Typography>
        
  //       <Grid container spacing={3} >
  //         <InfoItem 
  //           icon={<Person sx={{ color: "#6F42C1" }} />}
  //           label="Full Name" 
  //           value={currentUser?.name || "-"} 
  //         />  
         

  //         <InfoItem 
  //           icon={<Email sx={{ color: "#6F42C1" }} />}
  //           label="Email Address" 
  //           value={currentUser?.email || "-"} 
  //         />

  //         <InfoItem 
  //           icon={<Phone sx={{ color: "#6F42C1" }} />}
  //           label="Phone Number" 
  //           value={currentUser?.phone || "-"} 
  //         />
  //         <InfoItem 
  //           icon={<LocationOn sx={{ color: "#6F42C1" }} />}
  //           label="Location" 
  //           value={currentUser?.location || "-"} 
  //         />
  //       </Grid>
  //     </Box>
  //   </Card>
  // );

  // Bookings display
  const renderBookings = () => (
    <Card elevation={3} sx={{ 
      p: 3, 
      borderRadius: 3,
      boxShadow: "0 8px 24px rgba(149, 157, 165, 0.2)",
      height: "100%"
    }}>
      <Typography 
        variant="h5" 
        sx={{ 
          fontWeight: 700, 
          color: "#6F42C1",
          mb: 3
        }}
      >
        My Bookings
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress sx={{ color: "#6F42C1" }} />
        </Box>
      ) : bookings.length === 0 ? (
        <Box 
          sx={{ 
            py: 6, 
            textAlign: 'center',
            borderRadius: 2,
            bgcolor: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          <Typography variant="h6" color="text.secondary">
            You don't have any bookings yet
          </Typography>
          <Typography sx={{ mt: 1, color: 'text.secondary' }}>
            When you make reservations, they will appear here
          </Typography>
        </Box>
      ) : (
        <List sx={{ width: '100%' }}>
          {bookings.map((booking, index) => (
            <Paper
              key={booking.id || index}
              elevation={1}
              sx={{
                mb: 2,
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(111, 66, 193, 0.15)'
                }
              }}
            >
              <ListItem 
                sx={{ 
                  py: 2,
                  borderLeft: '4px solid #6F42C1',
                  bgcolor: 'rgba(255, 255, 255, 0.9)'
                }}
              >
                <ListItemIcon>
                  <Avatar sx={{ bgcolor: '#6F42C1' }}>
                    <CalendarMonth />
                  </Avatar>
                </ListItemIcon>
                
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333' }}>
                  <span style={{color: '#6F42C1'}}>Title:</span>     {booking.campaignTitle || 'Service Booking'}
                    </Typography>
                  }
               
                  secondary={
                    <Box sx={{ mt: 1 }}>  
                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333' }}>
                    <span style={{color: '#6F42C1'}}>Influncer_Name:</span>  {booking.InfluencerRegistration.User.name || 'Service Booking'}
                    </Typography>
                    </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <CalendarMonth sx={{ fontSize: 16, mr: 1, color: '#6F42C1' }} />
                        <Typography variant="body2" color="text.secondary">
                          {booking?.requestedDate ? formatDate(booking.requestedDate) : 'Date not specified'}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        {/* <AccessTime sx={{ fontSize: 16, mr: 1, color: '#6F42C1' }} /> */}
                        <Typography variant="body2" color="text.secondary">
                        <span style={{color: '#6F42C1'}}>Price:</span>    {booking.proposedPrice || 'Time not specified'}JD
                        </Typography>
                      </Box>
                      
                      {booking.location && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationOn sx={{ fontSize: 16, mr: 1, color: '#6F42C1' }} />
                          <Typography variant="body2" color="text.secondary">
                            {booking.location}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  }
                />
                
                <ListItemSecondaryAction>
                  <Chip 
                    label={booking.status || 'Confirmed'} 
                    sx={{ 
                      fontWeight: 600,
                      bgcolor: booking.status === 'Completed' ? '#4caf50' : 
                             booking.status === 'Cancelled' ? '#f44336' : '#6F42C1',
                      color: 'white'
                    }} 
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </Paper>
          ))}
        </List>
      )}
    </Card>
  );

  // Edit profile section
  const renderEditProfile = () => (
    <Card elevation={3} sx={{ 
      p: 3, 
      borderRadius: 3,
      boxShadow: "0 8px 24px rgba(149, 157, 165, 0.2)",
      height: "100%"
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
      
      <Grid container spacing={3} display="flex" flexDirection={'column'}  >
        <Grid item xs={12} display="flex"  justifyContent="center" mb={3}>
          <Box textAlign="center">
            <Avatar
              src={profile?.image || `http://localhost:4000${currentUser?.image}` || "/avatar-placeholder.svg"}
              sx={{ 
                width: 120, 
                height: 120, 
                mb: 2,
                border: '4px solid #F3E8FF',
                boxShadow: '0 4px 12px rgba(111, 66, 193, 0.2)',
                alignSelf: 'flex-start',
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
          </Box>
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

  if (!currentUser) return <Typography align="center" sx={{ mt: 10 }}>Loading…</Typography>;

  return (
    <Box sx={{ display:'flex' }}>
{/* Sidebar */}
<Paper elevation={4} sx={{  position: 'relative',  left:0, height:'100vh', width:{ xs:'60px', md:'240px' }, bgcolor:'white', zIndex:1200 }}>
  <Box sx={{ p:2, display:{ xs:'none', md:'block' }, background:'linear-gradient(135deg,#6F42C1,#D63384)', color:'white', textAlign:'center' }}>
    <Typography variant="h5">User Profile</Typography>
  </Box>
  <List sx={{ p:1, display:'flex', flexDirection:'column', alignItems:'center', height:'100vh' }}>
    {[
      { key:'profile', icon:<Person />, label:'Profile Info' },
      { key:'bookings', icon:<EventNote />, label:'My Bookings' },
      { key:'edit', icon:<Edit />, label:'Edit Profile' }
    ].map(item => (
      <Box
        key={item.key}
        component="div"
        onClick={() => setActiveMenu(item.key)}
        sx={{
          width:'90%',
          mb:2,
          p:1.5,
          borderRadius:2,
          display:'flex',
          alignItems:'center',
          justifyContent:{ xs:'center', md:'flex-start' },
          cursor:'pointer',
          bgcolor: activeMenu===item.key ? 'rgba(111,66,193,0.1)' : 'transparent',
          '&:hover': { bgcolor:'rgba(111,66,193,0.05)' }
        }}
      >
        <ListItemIcon sx={{ minWidth:0, color: activeMenu===item.key ? '#6F42C1' : 'inherit' }}>
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={item.label}
          primaryTypographyProps={{ fontWeight: activeMenu===item.key ? 700 : 400 }}
          sx={{ ml:2, display:{ xs:'none', md:'block' } }}
        />
      </Box>
    ))}
  </List>
</Paper>

{/* Main Content */}
<Box component="main" sx={{ flexGrow:1, p:4, background:'linear-gradient(to bottom right,#EBF5FF,#F3E8FF)', minHeight:'100vh' }}>
  <Grid container>
    <Grid item xs={12} sx={{ width: '100%' }}>
      {activeMenu==='profile' && renderProfileInfo()}
      {activeMenu==='bookings' && renderBookings()}
      {activeMenu==='edit' && renderEditProfile() /* replace with edit section */}
    </Grid>
  </Grid>
</Box>
</Box>
//     <Box sx={{ 
//       background: "linear-gradient(to bottom right, #EBF5FF, #F3E8FF)", 
//       minHeight: "100vh",
//       pt: 4,
//       pb: 8
//     }}>
//       <Grid container spacing={3} sx={{ px: { xs: 2, md: 4 } }}>
//         {/* Sidebar */}
//         <Grid item xs={12} md={3} lg={2.5}>
//           <Paper 
//             elevation={4} 
//             sx={{
//               borderRadius: 3,
//               overflow: 'hidden',
//               background: 'white',
//               height: '100%'
//             }}
//           >
//             <Box sx={{ 
//               p: 3, 
//               background: 'linear-gradient(135deg, #6F42C1, #D63384)',
//               color: 'white',
//               textAlign: 'center'
//             }}>
//               <Typography variant="h5" fontWeight={700}>
//                 لوحة المستخدم
//               </Typography>
//             </Box>
            
//             <List component="nav" sx={{ p: 2 }}>
//               <ListItem 
//                 button 
//                 onClick={() => setActiveMenu("profile")}
//                 selected={activeMenu === "profile"}
//                 sx={{ 
//                   borderRadius: 2,
//                   mb: 1,
//                   '&.Mui-selected': {
//                     bgcolor: 'rgba(111, 66, 193, 0.1)',
//                     color: '#6F42C1',
//                     '&:hover': {
//                       bgcolor: 'rgba(111, 66, 193, 0.15)',
//                     }
//                   },
//                   '&:hover': {
//                     bgcolor: 'rgba(111, 66, 193, 0.05)',
//                   }
//                 }}
//               >
//                 <ListItemIcon>
//                   <Person sx={{ color: activeMenu === "profile" ? "#6F42C1" : "inherit" }} />
//                 </ListItemIcon>
//                 <ListItemText 
//                   primary="معلومات الشخصية" 
//                   primaryTypographyProps={{ 
//                     fontWeight: activeMenu === "profile" ? 700 : 400,
//                     textAlign: 'right'
//                   }}
//                 />
//               </ListItem>
              
//               <ListItem 
//                 button 
//                 onClick={() => setActiveMenu("bookings")}
//                 selected={activeMenu === "bookings"}
//                 sx={{ 
//                   borderRadius: 2,
//                   mb: 1,
//                   '&.Mui-selected': {
//                     bgcolor: 'rgba(111, 66, 193, 0.1)',
//                     color: '#6F42C1',
//                     '&:hover': {
//                       bgcolor: 'rgba(111, 66, 193, 0.15)',
//                     }
//                   },
//                   '&:hover': {
//                     bgcolor: 'rgba(111, 66, 193, 0.05)',
//                   }
//                 }}
//               >
//                 <ListItemIcon>
//                   <EventNote sx={{ color: activeMenu === "bookings" ? "#6F42C1" : "inherit" }} />
//                 </ListItemIcon>
//                 <ListItemText 
//                   primary="حجوزاتي" 
//                   primaryTypographyProps={{ 
//                     fontWeight: activeMenu === "bookings" ? 700 : 400,
//                     textAlign: 'right'
//                   }}
//                 />
//               </ListItem>
              
//               <ListItem 
//                 button 
//                 onClick={() => setActiveMenu("edit")}
//                 selected={activeMenu === "edit"}
//                 sx={{ 
//                   borderRadius: 2,
//                   '&.Mui-selected': {
//                     bgcolor: 'rgba(111, 66, 193, 0.1)',
//                     color: '#6F42C1',
//                     '&:hover': {
//                       bgcolor: 'rgba(111, 66, 193, 0.15)',
//                     }
//                   },
//                   '&:hover': {
//                     bgcolor: 'rgba(111, 66, 193, 0.05)',
//                   }
//                 }}
//               >
//                 <ListItemIcon>
//                   <Edit sx={{ color: activeMenu === "edit" ? "#6F42C1" : "inherit" }} />
//                 </ListItemIcon>
//                 <ListItemText 
//                   primary="تعديل البيانات" 
//                   primaryTypographyProps={{ 
//                     fontWeight: activeMenu === "edit" ? 700 : 400,
//                     textAlign: 'right'
//                   }}
//                 />
//               </ListItem>
//             </List>
//           </Paper>
//         </Grid>
        
//         {/* Main Content */}
//         <Grid item xs={12} md={9} lg={9.5}>
//           <Box sx={{ height: '100%' }}>
//             {activeMenu === "profile" && renderProfileInfo()}
//             {activeMenu === "bookings" && renderBookings()}
//             {activeMenu === "edit" && renderEditProfile()}
//           </Box>
//         </Grid>
//       </Grid>

//       {/* Password Change Dialog */}
//       <Dialog open={pwdOpen} onClose={() => setPwdOpen(false)} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ color: "#6F42C1", fontWeight: 600 }}>تغيير كلمة المرور</DialogTitle>
//         <DialogContent dividers>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="كلمة المرور الحالية"
//                 type="password"
//                 value={pwdForm.current}
//                 onChange={(e) => setPwdForm({ ...pwdForm, current: e.target.value })}
//                 sx={{
//                   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                     borderColor: '#6F42C1',
//                   },
//                   '& .MuiInputLabel-root.Mui-focused': {
//                     color: '#6F42C1',
//                   }
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="كلمة المرور الجديدة"
//                 type="password"
//                 value={pwdForm.newPwd}
//                 onChange={(e) => setPwdForm({ ...pwdForm, newPwd: e.target.value })}
//                 sx={{
//                   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                     borderColor: '#6F42C1',
//                   },
//                   '& .MuiInputLabel-root.Mui-focused': {
//                     color: '#6F42C1',
//                   }
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="تأكيد كلمة المرور الجديدة"
//                 type="password"
//                 value={pwdForm.confirm}
//                 onChange={(e) => setPwdForm({ ...pwdForm, confirm: e.target.value })}
//                 sx={{
//                   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                     borderColor: '#6F42C1',
//                   },
//                   '& .MuiInputLabel-root.Mui-focused': {
//                     color: '#6F42C1',
//                   }
//                 }}
//               />
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions sx={{ px: 3, py: 2 }}>
//           <Button 
//             onClick={() => setPwdOpen(false)} 
//             disabled={saving}
//             sx={{ color: "#6F42C1" }}
//           >
//             إلغاء
//           </Button>
//           <GradientButton 
//             onClick={savePassword} 
//             disabled={saving}
//             sx={{ px: 3, borderRadius: 1 }}
//           >
//             {saving ? <CircularProgress size={22} sx={{ color: "white" }} /> : "تغيير"}
//           </GradientButton>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

);
}

// Helper component for profile info display
function InfoItem({ icon, label, value }) {
  return (
    
    <Grid item xs={12} sm={6}>
    <Box
        sx={{
          width: '100%',        // يملأ عرض الخلية
          height: '100%',       // يملأ ارتفاع الخلية
          display: 'flex',
          flexDirection: 'column',  
          justifyContent: 'space-between', // يوزع الثلاثة عناصر بالتساوي عمودياً
          alignItems: 'flex-start',
          p: 2,
          // gap: 2, 
          border: '1px solid rgba(0,0,0,0.12)',
          borderRadius: 2,
          boxSizing: 'border-box',
          bgcolor: 'white',
        }}
      >
       {icon}
        <Typography
          variant="caption"
          sx={{ color: '#6F42C1', fontWeight: 600  }}
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
        {/* {icon}
        <Box>
          <Typography 
            variant="caption" 
            sx={{ 
              color: "#6F42C1",
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 0.5
            }}
          >
            {label}
          </Typography>
          <Typography sx={{ fontWeight: 500 }}>
            {value || "-"}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
} */}

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
// import { toast } from 'react-toastify';
// import { setCurrentUser } from "../../redux/slices/AuthSlices";

// // MUI components
// import {
//   Box,
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
//   Divider,
//   Chip,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Paper,
//   Card,
//   CardContent
// } from "@mui/material";

// import {
//   PhotoCamera,
//   EventNote,
//   CalendarMonth,
//   AccessTime,
//   LocationOn,
//   Person,
//   Email,
//   Phone,
//   Edit,
//   VpnKey
// } from "@mui/icons-material";

// // Gradient buttons
// const GradientButton = ({ children, ...props }) => (
//   <Button
//     {...props}
//     sx={{
//       background: "linear-gradient(to right, #6F42C1, #D63384)",
//       color: "white",
//       "&:hover": {
//         background: "linear-gradient(to right, #5a33a0, #b02a6f)",
//       },
//       ...props.sx
//     }}
//   >
//     {children}
//   </Button>
// );

// const OutlinedGradientButton = ({ children, ...props }) => (
//   <Button
//     variant="outlined"
//     {...props}
//     sx={{
//       color: "#6F42C1",
//       borderColor: "#6F42C1",
//       "&:hover": {
//         borderColor: "#D63384",
//         backgroundColor: "rgba(111, 66, 193, 0.04)",
//       },
//       ...props.sx
//     }}
//   >
//     {children}
//   </Button>
// );

// export default function ProfilePage() {
//   const currentUser = useSelector((s) => s.user.currentUser);
//   const dispatch = useDispatch();

//   const [activeMenu, setActiveMenu] = useState("profile");
//   const [editOpen, setEditOpen] = useState(false);
//   const [pwdOpen, setPwdOpen] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(false);

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
//       fetchUserBookings();
//     }
//   }, [currentUser]);

//   const fetchUserBookings = async () => {
//     if (!currentUser?.id) return;
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `http://localhost:4000/api/users/bookings/${currentUser.id}`,
//         { withCredentials: true }
//       );
//       setBookings(response.data.data || []);
//     } catch (err) {
//       toast.error("Failed to load your bookings");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

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

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString('en-US', options);
//   };

//   function InfoItem({ icon, label, value }) {
//     return (
//       <Grid item xs={12}>
//         <Box sx={{
//           display: 'flex',
//           alignItems: 'left',
//           gap: 2,
//           mb: 2,
//           p: 1.5,
//           borderRadius: 2,
//           bgcolor: 'rgba(243, 232, 255, 0.5)',
//           transition: 'all 0.2s',
//           '&:hover': {
//             bgcolor: 'rgba(243, 232, 255, 0.8)',
//             transform: 'translateY(-2px)',
//             boxShadow: '0 4px 10px rgba(111, 66, 193, 0.1)'
//           }
//         }}>
//           {icon}
//           <Box>
//             <Typography variant="caption" sx={{ color: "#6F42C1", fontWeight: 600, letterSpacing: 0.5 }}>
//               {label}
//             </Typography>
//             <Typography sx={{ fontWeight: 500 }}>
//               {value || "-"}
//             </Typography>
//           </Box>
//         </Box>
//       </Grid>
//     );
//   }

//   const renderProfileInfo = () => (
//     <Card elevation={3} sx={{ p: 3, borderRadius: 3, boxShadow: "0 8px 24px rgba(149, 157, 165, 0.2)", height: "100%" }}>
//       <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
//         <Avatar
//           src={profile?.image ? `http://localhost:4000${profile.image}` : "/avatar-placeholder.svg"}
//           sx={{ width: 150, height: 150, mb: 2, border: '4px solid #F3E8FF', boxShadow: '0 4px 12px rgba(111, 66, 193, 0.2)' }}
//         />
//         <Typography variant="h5" sx={{ fontWeight: 700, color: "#6F42C1" }}>
//           {currentUser?.name}
//         </Typography>
//         <Chip label={currentUser?.role || "User"} sx={{ mt: 1, bgcolor: "#6F42C1", color: "white", fontWeight: 600 }} />
//       </Box>
//       <Divider sx={{ mb: 3 }} />
//       <Box sx={{ p: 3, borderRadius: 2, bgcolor: 'rgba(255, 255, 255, 0.7)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
//         <Typography variant="h6" sx={{ mb: 3, color: "#6F42C1", fontWeight: 600 }}>
//           Personal Information
//         </Typography>
//         <Grid container spacing={3}>
//           <InfoItem icon={<Person sx={{ color: "#6F42C1" }} />} label="Full Name" value={currentUser?.name} />
//           <InfoItem icon={<Email sx={{ color: "#6F42C1" }} />} label="Email Address" value={currentUser?.email} />
//           <InfoItem icon={<Phone sx={{ color: "#6F42C1" }} />} label="Phone Number" value={currentUser?.phone} />
//           <InfoItem icon={<LocationOn sx={{ color: "#6F42C1" }} />} label="Location" value={currentUser?.location} />
//         </Grid>
//       </Box>
//     </Card>
//   );

//   const renderBookings = () => (
//     <Card elevation={3} sx={{ p: 3, borderRadius: 3, boxShadow: "0 8px 24px rgba(149, 157, 165, 0.2)", height: "100%" }}>
//       <Typography variant="h5" sx={{ fontWeight: 700, color: "#6F42C1", mb: 3 }}>
//         My Bookings
//       </Typography>
//       <Divider sx={{ mb: 3 }} />
//       {loading ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
//           <CircularProgress sx={{ color: "#6F42C1" }} />
//         </Box>
//       ) : bookings.length === 0 ? (
//         <Box sx={{ py: 6, textAlign: 'center', borderRadius: 2, bgcolor: 'rgba(255, 255, 255, 0.7)' }}>
//           <Typography variant="h6" color="text.secondary">
//             You don't have any bookings yet
//           </Typography>
//           <Typography sx={{ mt: 1, color: 'text.secondary' }}>
//             When you register campaigns, they will appear here
//           </Typography>
//         </Box>
//       ) : (
//         <List sx={{ width: '100%' }}>
//           {bookings.map((booking, idx) => (
//             <Paper key={idx} elevation={1} sx={{ mb: 2, borderRadius: 2, overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 6px 20px rgba(111, 66, 193, 0.15)' } }}>
//               <ListItem sx={{ py: 2, borderLeft: '4px solid #6F42C1', bgcolor: 'rgba(255, 255, 255, 0.9)' }}>
//                 <ListItemIcon>
//                   <Avatar sx={{ bgcolor: '#6F42C1' }}><CalendarMonth /></Avatar>
//                 </ListItemIcon>
//                 <ListItemText
//                   primary={<Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333' }}>{booking.campaignTitle || 'Untitled Campaign'}</Typography>}
//                   secondary={
//                     <Box sx={{ mt: 1 }}>
//                       <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
//                         <Person sx={{ fontSize: 16, mr: 1, color: '#6F42C1' }} />
//                         <Typography variant="body2" color="text.secondary">
//                           Influencer: {booking.InfluencerRegistration?.User?.name || 'N/A'}
//                         </Typography>
//                       </Box>
//                       <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
//                         <Chip label={booking.status || 'Pending'} sx={{ fontWeight: 600, bgcolor: '#6F42C1', color: 'white' }} />
//                       </Box>
//                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <EventNote sx={{ fontSize: 16, mr: 1, color: '#6F42C1' }} />
//                         <Typography variant="body2" color="text.secondary">
//                           Published: {booking.createdAt ? formatDate(booking.createdAt) : 'N/A'}
//                         </Typography>
//                       </Box>
//                     </Box>
//                   }
//                 />
//               </ListItem>
//             </Paper>
//           ))}
//         </List>
//       )}
//     </Card>
//   );

//   const renderEditProfile = () => (
//     <Card elevation={3} sx={{ p: 3, borderRadius: 3, boxShadow: "0 8px 24px rgba(149, 157, 165, 0.2)", height: "100%" }}>
//       <Typography variant="h5" sx={{ fontWeight: 700, color: "#6F42C1", mb: 3 }}>Edit Profile</Typography>
//       <Divider sx={{ mb: 3 }} />
//       <Grid container spacing={3}>
//         <Grid item xs={12} display="flex" justifyContent="center" mb={3}>
//           <Box textAlign="center">
//             <Avatar
//               src={profile?.image || (currentUser?.image ? `http://localhost:4000${currentUser.image}` : "/avatar-placeholder.svg")}
//               sx={{ width: 120, height: 120, mb: 2, border: '4px solid #F3E8FF', boxShadow: '0 4px 12px rgba(111, 66, 193, 0.2)' }}
//             />
//             <label htmlFor="icon-button-file">
//               <input
//                 accept="image/*"
//                 id="icon-button-file"
//                 type="file"
//                 style={{ display: 'none' }}
//                 onChange={handleImage}
//               />
//               <IconButton color="primary" aria-label="upload picture" component="span" sx={{ background: "linear-gradient(to right, #6F42C1, #D63384)", color: "white", '&:hover': { background: "linear-gradient(to right, #5a33a0, #b02a6f)" } }}>
//                 <PhotoCamera />
//               </IconButton>
//             </label>
//           </Box>
//         </Grid>
//         <Grid item xs={12}>
//           <TextField fullWidth label="Full Name" name="name" value={profile.name} onChange={handleField} sx={{ mb: 3, '& .MuiOutlinedInput-root.Mui-focussed .MuiOutlinedInput-notchedOutline': { borderColor: '#6F42C1' }, '& .MuiInputLabel-root.Mui-focused': { color: '#6F42C1' } }} />
//           <TextField fullWidth label="Phone Number" name="phone" value={profile.phone} onChange={handleField} sx={{ mb: 3, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#6F42C1' }, '& .MuiInputLabel-root.Mui-focused': { color: '#6F42C1' } }} />
//           <TextField fullWidth label="Location" name="location" value={profile.location} onChange={handleField} sx={{ mb: 3, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#6F42C1' }, '& .MuiInputLabel-root.Mui-focused': { color: '#6F42C1' } }} />
//         </Grid>
//         <Grid item xs={12} display="flex" justifyContent="center" gap={2}>
//           <GradientButton onClick={saveProfile} disabled={saving} sx={{ px: 4, py: 1, borderRadius: 2 }}>{saving ? <CircularProgress size={22} sx={{ color: "white" }} /> : "Save Changes"}</GradientButton>
//           <OutlinedGradientButton onClick={() => setPwdOpen(true)} sx={{ px: 4, py: 1, borderRadius: 2 }}>Change Password</OutlinedGradientButton>
//         </Grid>
//       </Grid>
//     </Card>
//   );

//   if (!currentUser) return <Typography align="center" sx={{ mt: 10 }}>Loading...</Typography>;

//   return (
// //     <Box sx={{ display: 'flex' }}>
// //       {/* Sidebar */}
// //       <Paper
// //         elevation={4}
// //         sx={{
// //           position: 'relative',
         
// //           left: 0,
// //           height: '100vh',
// //           width: { xs: '100%', md: '25%', lg: '20.833%' },
// //           display: { xs: 'none', md: 'block' },
// //           borderRadius: 0,
// //           overflow: 'hidden',
// //           background: 'white',
// //           zIndex: (theme) => theme.zIndex.drawer
// //         }}
// //       >
// //         <Box sx={{ p: 3, background: 'linear-gradient(135deg, #6F42C1, #D63384)', color: 'white', textAlign: 'center' }}>
// //           <Typography variant="h5" fontWeight={700}>User Dashboard</Typography>
// //         </Box>
// //         <List component="nav" sx={{ p: 2, height:"100vh" }}>
// //           <ListItem button onClick={() => setActiveMenu("profile")} selected={activeMenu === "profile"} sx={{ borderRadius: 2, mb: 1, '&.Mui-selected': { bgcolor: 'rgba(111, 66, 193, 0.1)', color: '#6F42C1', '&:hover': { bgcolor: 'rgba(111, 66, 193, 0.15)' } }, '&:hover': { bgcolor: 'rgba(111, 66, 193, 0.05)' } }}>
// //             <ListItemIcon><Person sx={{ color: activeMenu === "profile" ? "#6F42C1" : "inherit" }} /></ListItemIcon>
// //             <ListItemText primary="Profile Info" primaryTypographyProps={{ fontWeight: activeMenu === "profile" ? 700 : 400, textAlign: 'left' }} />
// //           </ListItem>
// //           <ListItem button onClick={() => setActiveMenu("bookings")} selected={activeMenu === "bookings"} sx={{ borderRadius: 2, mb: 1, '&.Mui-selected': { bgcolor: 'rgba(111, 66, 193, 0.1)', color: '#6F42C1', '&:hover': { bgcolor: 'rgba(111, 66, 193, 0.15)' } }, '&:hover': { bgcolor: 'rgba(111, 66, 193, 0.05)' } }}>
// //             <ListItemIcon><EventNote sx={{ color: activeMenu === "bookings" ? "#6F42C1" : "inherit" }} /></ListItemIcon>
// //             <ListItemText primary="My Bookings" primaryTypographyProps={{ fontWeight: activeMenu === "bookings" ? 700 : 400, textAlign: 'left' }} />
// //           </ListItem>
// //           <ListItem button onClick={() => setActiveMenu("edit")} selected={activeMenu === "edit"} sx={{ borderRadius: 2, '&.Mui-selected': { bgcolor: 'rgba(111, 66, 193, 0.1)', color: '#6F42C1', '&:hover': { bgcolor: 'rgba(111, 66, 193, 0.15)' } }, '&:hover': { bgcolor: 'rgba(111, 66, 193, 0.05)' } }}>
// //             <ListItemIcon><Edit sx={{ color: activeMenu === "edit" ? "#6F42C1" : "inherit" }} /></ListItemIcon>
// //             <ListItemText primary="Edit Profile" primaryTypographyProps={{ fontWeight: activeMenu === "edit" ? 700 : 400, textAlign: 'left' }} />
// //           </ListItem>
// //         </List>
// //       </Paper>

// //       {/* Main Content */}
// //       <Box component="main" sx={{ flexGrow: 1, pl: { md: '25%', lg: '20.833%' }, pt: 4, pb: 8, background: "linear-gradient(to bottom right, #EBF5FF, #F3E8FF)", minHeight: '100vh' }}>
// //         <Grid container spacing={3} sx={{ px: { xs: 2, md: 4 } }}>
// //           <Grid item xs={12} md={9} lg={9.5}>
// //             {activeMenu === "profile" && renderProfileInfo()}
// //             {activeMenu === "bookings" && renderBookings()}
// //             {activeMenu === "edit" && renderEditProfile()}
// //           </Grid>
// //         </Grid>

// //         <Dialog open={pwdOpen} onClose={() => setPwdOpen(false)} fullWidth maxWidth="sm">
// //           <DialogTitle sx={{ color: "#6F42C1", fontWeight: 600 }}>Change Password</DialogTitle>
// //           <DialogContent dividers>
// //             <Grid container spacing={2} sx={{ mt: 1 }}>
// //               <Grid item xs={12}><TextField fullWidth label="Current Password" type="password" value={pwdForm.current} onChange={(e) => setPwdForm({ ...pwdForm, current: e.target.value })} sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#6F42C1' }, '& .MuiInputLabel-root.Mui-focused': { color: '#6F42C1' } }} /></Grid>
// //               <Grid item xs={12}><TextField fullWidth label="New Password" type="password" value={pwdForm.newPwd} onChange={(e) => setPwdForm({ ...pwdForm, newPwd: e.target.value })} sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#6F42C1' }, '& .MuiInputLabel-root.Mui-focused': { color: '#6F42C1' } }} /></Grid>
// //               <Grid item xs={12}><TextField fullWidth label="Confirm New Password" type="password" value={pwdForm.confirm} onChange={(e) => setPwdForm({ ...pwdForm, confirm: e.target.value })} sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#6F42C1' }, '& .MuiInputLabel-root.Mui-focused': { color: '#6F42C1' } }} /></Grid>
// //             </Grid>
// //           </DialogContent>
// //           <DialogActions sx={{ px: 3, py: 2 }}>
// //             <Button onClick={() => setPwdOpen(false)} disabled={saving} sx={{ color: "#6F42C1" }}>Cancel</Button>
// //             <GradientButton onClick={savePassword} disabled={saving} sx={{ px: 3, borderRadius: 1 }}>{saving ? <CircularProgress size={22} sx={{ color: "white" }} /> : "Change"}</GradientButton>
// //           </DialogActions>
// //         </Dialog>
// //       </Box>
// //     </Box>
// //   );
// // }
// <Box sx={{ display:'flex' }}>
// {/* Sidebar */}
// <Paper elevation={4} sx={{  position: 'relative',  left:0, height:'100vh', width:{ xs:'60px', md:'240px' }, bgcolor:'white', zIndex:1200 }}>
//   <Box sx={{ p:2, display:{ xs:'none', md:'block' }, background:'linear-gradient(135deg,#6F42C1,#D63384)', color:'white', textAlign:'center' }}>
//     <Typography variant="h5">Dashboard</Typography>
//   </Box>
//   <List sx={{ p:1, display:'flex', flexDirection:'column', alignItems:'center', height:'100vh' }}>
//     {[
//       { key:'profile', icon:<Person />, label:'Profile Info' },
//       { key:'bookings', icon:<EventNote />, label:'My Bookings' },
//       { key:'edit', icon:<Edit />, label:'Edit Profile' }
//     ].map(item => (
//       <Box
//         key={item.key}
//         component="div"
//         onClick={() => setActiveMenu(item.key)}
//         sx={{
//           width:'90%',
//           mb:2,
//           p:1.5,
//           borderRadius:2,
//           display:'flex',
//           alignItems:'center',
//           justifyContent:{ xs:'center', md:'flex-start' },
//           cursor:'pointer',
//           bgcolor: activeMenu===item.key ? 'rgba(111,66,193,0.1)' : 'transparent',
//           '&:hover': { bgcolor:'rgba(111,66,193,0.05)' }
//         }}
//       >
//         <ListItemIcon sx={{ minWidth:0, color: activeMenu===item.key ? '#6F42C1' : 'inherit' }}>
//           {item.icon}
//         </ListItemIcon>
//         <ListItemText
//           primary={item.label}
//           primaryTypographyProps={{ fontWeight: activeMenu===item.key ? 700 : 400 }}
//           sx={{ ml:2, display:{ xs:'none', md:'block' } }}
//         />
//       </Box>
//     ))}
//   </List>
// </Paper>

// {/* Main Content */}
// <Box component="main" sx={{ flexGrow:1, ml:{ xs:'60px', md:'240px' }, p:4, background:'linear-gradient(to bottom right,#EBF5FF,#F3E8FF)', minHeight:'100vh' }}>
//   <Grid container>
//     <Grid item xs={12}>
//       {activeMenu==='profile' && renderProfileInfo()}
//       {activeMenu==='bookings' && renderBookings()}
//       {activeMenu==='edit' && renderProfileInfo() /* replace with edit section */}
//     </Grid>
//   </Grid>
// </Box>
// </Box>
// );
// }
