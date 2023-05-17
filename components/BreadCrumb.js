import { IoIosMenu, IoMdClose } from "react-icons/io";
const BreadCrumb = ({ open, onClick }) =>
  open ? (
    <button onClick={onClick}>
      {" "}
      <IoMdClose size={32} />{" "}
    </button>
  ) : (
    <button onClick={onClick}>
      {" "}
      <IoIosMenu size={32} />
    </button>
  );

export default BreadCrumb;
