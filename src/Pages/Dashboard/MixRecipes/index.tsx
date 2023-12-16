import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MixRecipeList from './List/mix-recipies-list';
import Sidebar from './Sidebar/Sidebar';

const MixRecipes: React.FC = () => {
  return (
    <div>
      <Sidebar />
      <Routes>
        <Route path="/" element={<MixRecipeList />} />
      </Routes>
    </div>
  );
};

export default MixRecipes;
