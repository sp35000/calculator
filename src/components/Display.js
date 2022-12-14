import "./Display.css";
const Display = ({ value }) => {
  return (
    <div className="display" mode="single" max={70}>
      {value}
    </div>
  );
};
export default Display;
