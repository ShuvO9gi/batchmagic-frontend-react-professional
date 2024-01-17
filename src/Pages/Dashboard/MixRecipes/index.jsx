import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MixRecipeList from './List/MixRecipesList';
import MixRecipesCreate from './Create/Create';
import MixRecipesShow from './Show/Show';
import MixRecipesEdit from './Edit/Edit';
import './mix-recipes.css';

const MixRecipes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MixRecipeList />} />
        <Route path="/create" element={<MixRecipesCreate />} />
        <Route path="/show/:id" element={<MixRecipesShow />} />
        <Route path="/edit/:id" element={<MixRecipesEdit />} />
      </Routes>
    </div>
  );
};

export default MixRecipes;
