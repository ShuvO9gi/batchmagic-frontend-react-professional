import React from 'react';
import './Sidebar.css';
import { sidebarMenu } from './sidebar-components';

export const Sidebar = () => {
  // const [isOpen, setIsOpen] = useState(false);

  //   const toggleSidebar = () => {
  //     setIsOpen(!isOpen);
  //   };

  return (
    <div className={`sidebar `}>
      <ul>
        {sidebarMenu.map((menuItem) => (
          <li key={`${menuItem.link}-${menuItem.title}`}>
            <a href={menuItem.link}>
              <img src={menuItem.icon} alt="" className="sidebar-icon" />
              <span>{menuItem.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
