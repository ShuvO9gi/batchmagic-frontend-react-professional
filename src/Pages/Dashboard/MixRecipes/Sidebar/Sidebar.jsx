import React from 'react';
import './Sidebar.css';

export const Sidebar = () => {
  // const [isOpen, setIsOpen] = useState(false);

  //   const toggleSidebar = () => {
  //     setIsOpen(!isOpen);
  //   };

  return (
    <div className={`sidebar `}>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Services</li>
        <li>Contact</li>
      </ul>
    </div>
  );
};

export default Sidebar;
