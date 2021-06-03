import { Home } from './pages/Home.jsx';
import { WePlanApp } from './pages/WePlanApp.jsx';
import { Boards } from './pages/Boards.jsx';
import { LoginSignup } from './pages/LoginSignup.jsx'

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
        component: LoginSignup,
    },
    {
        path: '/logout',
        component: LoginSignup,
    },
    {
        path: '/signup',
        component: LoginSignup,
    },
    {
        path: '/',
        component: Home,
    },

]