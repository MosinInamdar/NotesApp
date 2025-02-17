// Single Responsibilty Principle: This component only displays user profile info.
// OCP: The component is designed to be extended with additional props without modifying its internal implementation.
// ISP: Focused solely on displaying user details.
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ onLogout, userInfo }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitials(userInfo?.fullName)}
      </div>
      <div>
        <p className="text-sm font-medium">{userInfo?.fullName}</p>
        <button className="text-sm text-slate-700 underline" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
