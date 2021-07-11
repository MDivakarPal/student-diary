import React from 'react'
import {Route,Switch} from 'react-router-dom' 
import DashBoard from './DashBoard'
import WeeklyReport from './WeeklyReport'
export default function RouteManager() {
    return (
        <div>
            <Route path='/'>
                <DashBoard/>
            </Route>
            <Switch>
                <Route path='/week'>
                <WeeklyReport/>
                </Route>
            </Switch>
        </div>
    )
}
