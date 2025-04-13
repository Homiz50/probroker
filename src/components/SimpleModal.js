// const SimpleModal = ({ isOpen, onClose, title, children }) => {
//   const handleClose = () => {
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="simple-modal-backdrop" style={backdropStyle}>
//       <div className="simple-modal-content" style={contentStyle}>
//         <h4>{title}</h4>
//         {children}
//         <button className="text-center" onClick={handleClose}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// // Example styles, you should replace them with your own class or style
// const backdropStyle = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100%",
//   height: "100%",
//   backgroundColor: "rgba(0, 0, 0, 0.5)",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// };

// const contentStyle = {
//   backgroundColor: "#fff",
//   padding: "10px",
//   borderRadius: "5px",
// };

// const successStyle = {
//   backgroundColor: "#fff",
//   padding: "10px",
//   borderRadius: "5px",
// };

// export default SimpleModal;

const SimpleModal = ({ isOpen, onClose, title, children }) => {
  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  const modalStyle =
    title === "Property Contacted Successfully" ? successStyle : contentStyle;

  return (
    <div className="simple-modal-backdrop" style={backdropStyle}>
      <div className="simple-modal-content" style={modalStyle}>
        <h4 className="text-center">{title}</h4>
        {children}
        <button className="text-center" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

// Example styles, you should replace them with your own class or style
const backdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "115%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const contentStyle = {
  //   backgroundColor: "#fff",
  //   padding: "10px",
  //   borderRadius: "5px",
};

const successStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
};

export default SimpleModal;
