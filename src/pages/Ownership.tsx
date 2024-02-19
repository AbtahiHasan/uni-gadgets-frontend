/* eslint-disable @typescript-eslint/no-explicit-any */
import Heading from "@/components/shared/heading";
import { currentUser, setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useChangeUserRoleMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const Ownership = () => {
  const [changeUserRole, { isLoading }] = useChangeUserRoleMutation();
  const user: any = useAppSelector(currentUser);
  const [role, setRole] = useState(user?.role);
  const dispatch = useAppDispatch();
  const updateOwnerShip = (role: string) => {
    setRole(role);
    changeUserRole({ role: role }).then((res: any) => {
      console.log({ res: res.data });
      if (res.data?.success) {
        const user = jwtDecode(res?.data?.data?.accessToken);
        dispatch(setUser({ user: user, token: res?.data?.data?.accessToken }));
        toast.success(res.data?.message);
      }
    });
  };
  return (
    <div>
      <Heading title="Ownership" />
      <div>
        Your Ownership <span className="font-bold">"{user?.role}"</span>
      </div>
      <div className="md:flex gap-5 items-center mt-10">
        <p>Change Your Ownership</p>
        <Select
          disabled={isLoading}
          value={role}
          onValueChange={(value) => updateOwnerShip(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Change your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Ownership;
