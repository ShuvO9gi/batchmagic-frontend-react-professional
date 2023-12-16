import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MixRecipeList from './List/mix-recipies-list';
import Sidebar from './Sidebar/Sidebar';
import './mix-recipes.css';

const MixRecipes: React.FC = () => {
  return (
    <div className="recipe-content">
      <div className="recipe-sidebar">
        <Sidebar />
      </div>
      <div className="recipe-component">
        <Routes>
          <Route path="/" element={<MixRecipeList />} />
        </Routes>
      </div>
    </div>
  );
};

export default MixRecipes;
