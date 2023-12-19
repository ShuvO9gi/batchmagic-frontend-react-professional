import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MixRecipeList from './List/mix-recipies-list';
import MixRecipesCreate from './Create/Create';
import MixRecipesShow from './Show/Show';
import Sidebar from './Sidebar/Sidebar';
import './mix-recipes.css';

const MixRecipes = () => {
  return (
    <div className="recipe-content">
      <div className="recipe-sidebar">
        <Sidebar />
      </div>
      <div className="recipe-component">
        <Routes>
          <Route path="/" element={<MixRecipeList />} />
          <Route path="/create" element={<MixRecipesCreate />} />
          <Route path="/show/:id" element={<MixRecipesShow />} />
        </Routes>
      </div>
    </div>
  );
};

export default MixRecipes;
