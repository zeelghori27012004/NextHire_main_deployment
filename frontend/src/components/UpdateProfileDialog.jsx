import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfile = ({ open, setOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: "",
  });

  const changeHandler = (e) => {
    if (e.target.name === "file") {
      setInput({ ...input, file: e.target.files[0] });
    } else {
      setInput({ ...input, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
  setLoading(true);
  
  // Basic validation
  if (input.file && input.file.size > 5 * 1024 * 1024) {
    toast.error("File size should be less than 5MB");
    setLoading(false);
    return;
  }

  const formData = new FormData();
  formData.append("fullname", input.fullname);
  formData.append("email", input.email);
  formData.append("phoneNumber", input.phoneNumber);
  formData.append("bio", input.bio);
  formData.append("skills", input.skills);
  
  // Only append file if it exists
  if (input.file) {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (!validTypes.includes(input.file.type)) {
      toast.error("Only JPEG, PNG, GIF images or PDF files are allowed");
      setLoading(false);
      return;
    }
    formData.append("file", input.file);
  }

  try {
    const res = await axios.post(
      `${USER_API_END_POINT}/profile/update`,
      formData,
      { 
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    
    if (res.data.success) {
      dispatch(setUser(res.data.user));
      toast.success(res.data.message);
      setOpen(false);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "Profile update failed.");
  } finally {
    setLoading(false);
  }
};
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="fullname"
              placeholder="Enter your name"
              value={input.fullname}
              onChange={changeHandler}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="Enter your email"
              value={input.email}
              onChange={changeHandler}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="number">Phone Number</Label>
            <Input
              id="number"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={input.phoneNumber}
              onChange={changeHandler}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              name="bio"
              placeholder="Tell us about yourself"
              value={input.bio}
              onChange={changeHandler}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="skills">Skills</Label>
            <Input
              id="skills"
              name="skills"
              placeholder="Enter comma-separated skills"
              value={input.skills}
              onChange={changeHandler}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="file">Upload Resume</Label>
            <Input
              id="file"
              type="file"
              name="file"
              accept="image/*,application/pdf"
              onChange={changeHandler}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfile;