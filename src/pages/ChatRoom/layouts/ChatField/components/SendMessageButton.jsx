const SendMessageButton = ({ disabled = true }) => {
  return (
    <button
      id="send-message-button"
      type="submit"
      disabled={disabled}
      className={`p-2 rounded-lg ct-transition ${
        disabled ? "" : "bg-green-500"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="gray"
        className="w-4 h-4 m-1 lg:m-0 ct-transition"
        strokeWidth="2"
      >
        <path
          d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
          fill={`${disabled ? "gray" : "white"}`}
        ></path>
      </svg>
    </button>
  );
};

export default SendMessageButton;
