import ClipLoader from "react-spinners/ClipLoader";
function SingInSpinner() {
  return (
    <div className="sweet-loading">
      <ClipLoader color="#36d7b" size={70} speedMultiplier={0.6} />
    </div>
  );
}

export default SingInSpinner;
