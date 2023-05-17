const TopPanel = ({ children }) => {
  return (
    <div className="bg-white  flex justify-between p-4 sticky top-[80px] left-0">
      {children}
    </div>
  );
};

export default TopPanel;
