import { useSelector } from "react-redux";

const UserAvartar = () => {
  const user = useSelector((state) => state.auth);

  const nameArray = user.name.split(" ");
  const nameLength = nameArray.length;
  return (
    <div className="relative p-1 rounded-sm h-[30px] w-[30px] text-white flex items-center justify-center bg-orange-300 select-none">
      {nameLength > 1
        ? nameArray[nameLength - 2][0] + nameArray[nameLength - 1][0]
        : nameArray[nameLength - 1][0]}
    </div>
  );
};

export default UserAvartar;
