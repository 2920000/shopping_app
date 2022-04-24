const OverlayModal = ({ children }) => {
  return (
    <div className="fixed flex items-center justify-center top-0 right-0 left-0 bottom-0 z-50 bg-[rgba(0,0,0,0.3)]">
      {children}
    </div>
  );
};
export default OverlayModal;
