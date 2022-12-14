import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import HomePage from './page/home.page'
import RepairSystem from './page/repair-system'
import LoginPage from './page/login.page'
import FormIt from './page/form-it'
import FormItAdmin from './page/form-it-admin'
import FromBuilding from './page/form-building'
import FromBuildingAdmin from './page/form-building-admin'
import ReportProcess from './page/report-process'

import Hr from './page/hr'
import FromHr_SimplaeProfile from './page/hr/from/simeple_profile'
import Fromadduser from './page/hr/from/adduser'
import From_Head from './page/hr/from/form_head'
import Fromapp_it from './page/hr/from/form_app_it'
import Fromapp_ct from './page/hr/from/form_app_ct'
import Fromapp_img from './page/hr/from/form_app_img'
import Fromapp_user_id from './page/hr/from/form_user_id'


import RepairSystemPO from './page/repair-system-po'
import FormPO from './page/form-po'
import RepairSystemFin from './page/repair-system-fin'
import FormFin from './page/form-fin'
import RepairSystemAcc from './page/repair-system-acc'
import FormAcc from './page/form-acc'
import HotLine1 from './page/hotline/hotline'

const App = () => {
  let routes = useRoutes([
    { path: '/', element: <HomePage /> },
    { path: '/repair', element: <RepairSystem /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/form-it', element: <FormIt /> },
    { path: '/form-it/:id', element: <FormItAdmin /> },
    { path: '/form-building', element: <FromBuilding /> },
    { path: '/form-building/:id', element: <FromBuildingAdmin /> },
    { path: '/report-process/:type', element: <ReportProcess /> },
    { path: '/hotline1', element: <HotLine1 /> },


    { path: '/hr', element: <Hr /> },
    { path: '/form-hr-a', element: <FromHr_SimplaeProfile /> },
    { path: '/form-hr-a/:id', element: <FromHr_SimplaeProfile /> },
    { path: '/form-adduser/:id', element: <Fromadduser /> },
    { path: '/form-app-head/:id', element: <From_Head /> },
    { path: '/form-app-it/:id', element: <Fromapp_it /> },
    { path: '/form-app-ct/:id', element: <Fromapp_ct /> },
    { path: '/form-app-img/:id', element: <Fromapp_img /> },
    { path: '/form-hr-user_id/:id', element: <Fromapp_user_id /> },


    { path: '/repair-po', element: <RepairSystemPO /> },
    { path: '/form-po/:id', element: <FormPO /> },

    { path: '/repair-fin', element: <RepairSystemFin /> },
    { path: '/form-fin/:id', element: <FormFin /> },

    { path: '/repair-acc', element: <RepairSystemAcc /> },
    { path: '/form-acc/:id', element: <FormAcc /> }
  ])
  return routes
}

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  )
}

export default AppWrapper
