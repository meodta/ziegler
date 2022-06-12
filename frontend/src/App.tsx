import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import HomeView from 'views/Home';
import RecipeView from 'views/Recipe';
import Navbar from 'components/Navbar';
import { ChakraProvider } from '@chakra-ui/react';
import {NAV_PATHS} from 'helpers/navigation.helper';

function App() {
  const redirectHome = <Navigate to={'/'} />
  return (
    <ChakraProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path={NAV_PATHS.root} element={<HomeView />}/>
          <Route path={NAV_PATHS.home} element={redirectHome} />
          <Route path={NAV_PATHS.recipe.path}>
            <Route path={NAV_PATHS.recipe.routes.id} element={<RecipeView />} />
            <Route path={''} element={redirectHome} />
          </Route>
          <Route path={'*'} element={redirectHome} />
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
