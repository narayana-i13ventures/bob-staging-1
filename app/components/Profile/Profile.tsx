import { Avatar, Divider, IconButton, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from '@mui/icons-material/Close';

const Profile = () => {
  const { data }: any = useSession();
  const [editEmailOpen, setEmailEditOpen] = useState(false);
  return (
    <div className="flex flex-col justify-start items-start w-[70%] pt-5">
      <div className="flex justify-start items-start w-full mb-8">
        <div className="relative rounded-full w-[150px]">
          {data?.user?.image ? (
            <img
              className="w-[120px] h-[120px] rounded-full max-w-full"
              src={data?.user?.image}
              alt={data?.user?.name}
              referrerPolicy="no-referrer"
            />
          ) : (
            <Avatar sx={{ width: "120px", height: "120px" }}>N</Avatar>
          )}
          <div className="absolute bottom-[-15px] right-1 rounded-full w-[50px] h-[50px] z-1 flex justify-center items-center">
            <IconButton color="primary" className="!bg-gray-300">
              <EditIcon className="!text-white !text-[25px]" />
            </IconButton>
          </div>
        </div>
        <div className="w-full pl-10 mt-3">
          <p className="mb-2 font-semibold">Firstname & Lastname</p>
          <TextField
            fullWidth
            className="w-full !mb-4"
            size="small"
            type="text"
            id="profile-firstname"
            variant="outlined"
            value={data?.user?.name}
            disabled={true}
          />
        </div>
      </div>
      <p className="mb-2 font-semibold">Role</p>
      <TextField
        fullWidth
        className="w-full !mb-4"
        size="small"
        type="text"
        id="profile-role"
        variant="outlined"
        value={"Business Strategist"}
        disabled={true}
      />
      <p className="mb-2 font-semibold">Company</p>
      <TextField
        fullWidth
        className="w-full !mb-4"
        size="small"
        type="text"
        id="profile-company"
        variant="outlined"
        value={"i13 Ventures"}
        disabled={true}
      />
      <Divider className="w-full !my-8" />
      <p className="mb-4 font-semibold">Email</p>
      {!editEmailOpen ? (
        <div className="flex justify-between items-center w-full">
          <p>
            Your Email With Bob is <b>{data?.user?.email}</b>
          </p>
          <p onClick={() => setEmailEditOpen(true)} className="text-blue-500 hover:underline underline-offset-2 cursor-pointer font-semibold">
            Change
          </p>
        </div>
      ) : (
        <div className="flex justify-start items-center w-full">
          <TextField
            autoFocus
            fullWidth
            className="w-full max-w-[300px]"
            size="small"
            type="text"
            id="profile-email"
            variant="outlined"
            value={data?.user?.email}
          />
          <IconButton className="!ml-4" onClick={() => setEmailEditOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>
      )}
      <Divider className="w-full !my-8" />
      <div className="flex justify-between items-center w-full">
        <p className="font-semibold">Password</p>
        <p className="font-semibold text-blue-500 hover:underline underline-offset-2">Change</p>
      </div>
      <Divider className="w-full !my-8" />
      <p className="font-semibold text-red-500 underline underline-offset-2 hover:text-red-900">Delete my Profile</p>
      <p className="text-xs mt-3">You will receive an email to confirm your decision. This will not end your subscription or payments and you will continue to be charged. You can cancel your subscription, or switch payment methods to keep the team active.
        This can’t be reversed. All boards you’ve created will be permanently erased. You can save backups or export them.</p>
    </div>
  );
};

export default Profile;
