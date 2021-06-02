import { Home } from './pages/Home.jsx';
import { WePlanApp } from './pages/WePlanApp.jsx';
import { Boards } from './pages/Boards.jsx';
import {LoginSignIn} from './pages/LoginSignIn.jsx'

export const routes = [
    {

        path: '/board/:boardId',
        component: WePlanApp,
    },
    {
        path: '/board',
        component: Boards,
    },
    {
        path: '/login',
        component: LoginSignIn,
    },
    {
        path: '/signin',
        component: LoginSignIn,
    },
    {
        path: '/',
        component: Home,
    }

]