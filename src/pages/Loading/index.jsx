import LoadingIcons from "react-loading-icons";

const Loading = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <LoadingIcons.Puff stroke="black" fill="gray" className="w-10 h-10" />
    </div>
  );
};

export default Loading;
