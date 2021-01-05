import React from 'react';

import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {
  extendTheme, ChakraProvider, ColorModeProvider,
  CSSReset,
} from '@chakra-ui/react';

import ProdukProvider from './hooks/Provider';
import EditPage from './page/Edit';
import Home from './page/Home';
import Produk from './page/Produk';
import { theme } from './utils/theme';

axios.defaults.baseURL = 'http://localhost:4000/api/';

const themes = extendTheme(theme);

const Main = () => {
  return (
    <Switch>
      <Route component={Home} path="/" exact />
      <Route component={Produk} path="/produk/:id" exact />
      <Route component={EditPage} path="/produk/:id/edit" exact />
    </Switch>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={themes}>
        <ColorModeProvider options={{ useSystemColorMode: true }}>
          <CSSReset />
          <ProdukProvider>
            <Main />
          </ProdukProvider>
        </ColorModeProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
