import React from 'react';
import './Sidebar.css';
import { sidebarMenu } from './sidebar-components';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (menuItem) => {
    return menuItem.link === currentPath;
  };

  return (
    <div className={`sidebar `}>
      <ul>
        {sidebarMenu.map((menuItem) => (
          <li
            className={`px-60 py-20 ${isActive(menuItem) ? 'active' : ''}`}
            key={menuItem.link} // Use a more stable and unique key
          >
            <Link to={menuItem.link}>
              <img
                src={isActive(menuItem) ? menuItem.iconSelected : menuItem.icon}
                alt=""
                className="sidebar-icon"
              />
              <span>{menuItem.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
