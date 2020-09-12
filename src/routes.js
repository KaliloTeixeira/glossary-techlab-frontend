import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Main from './pages/main';
import Word from './pages/word';
import AddWord from './pages/addWord';


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/word/:id" component={Word} />
            <Route path="/new" component={AddWord} />

        </Switch>
    </BrowserRouter>
);

export default Routes;