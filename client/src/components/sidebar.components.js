
import { Layout, Menu, Popover } from 'antd';
import { useEffect, useState } from "react";
import axios from 'axios'
import styled from 'styled-components';
import { ImUserTie } from 'react-icons/im'
import { GoTools } from 'react-icons/go'
import { FaHome } from 'react-icons/fa'
import { MdAddCircle } from 'react-icons/md'
import { BsFillPeopleFill } from 'react-icons/bs'
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux'
import { setAccount } from '../store/AccountReducer'

const { Sider } = Layout;

const SideBarComponent = styled(Sider)`
    height: 100vh;
    position: fixed;

    .sidebar-trigger{
        /* display: none; */
        font-size: 30px;
        color: #000;
        position: absolute;
        cursor: pointer;
        right: -45px;
        margin-top: 7px
    }    

 
    .title{
        visibility: ${props => props.collapsed ? 'hidden' : 'visible'};
        width: 100%;
        height: 50px;
        font-weight: bold;
        text-align: center;
        padding: 10px;
        margin-top: 5px;
        color: #FFFF;
    }

    hr{
        visibility: ${props => props.collapsed ? 'hidden' : 'visible'};
    }
    .icon{
        font-size: 40px;
        margin-top: 15px;
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: center;

        .icon-slider{
            margin-top: 5px;
            background-color:#FFFF;
            width: 60px;
            height: 60px;
            border-radius: 50px;
            padding: 7px;
        } 
    }
    .username{
        visibility: ${props => props.collapsed ? 'hidden' : 'visible'};
        font-size: medium;
        color: #FFFF;
        text-align: center;
        margin: 5px 0 10px;
    }
    .button-signout{
        visibility: ${props => props.collapsed ? 'hidden' : 'visible'};
        display: flex;
        cursor: pointer;
        justify-content: center;
        align-items: center;
        margin-bottom: 40px;
       

        .button-out{
            background-color: red;
            color: #FFF;
            font-weight:bold;
            padding: 6px;
            border-radius: 5px;
        }
    }
  
  
    .icon-sli{
        font-size: 18px;
    }

    .head-slider{
        color: #FFF;
    }
    
    .head-slider{
        /* border: 1px solid red; */
        padding: 10px;
        margin-top: 5px;
        text-align: center;
    }
    .ant-menu-item {
        padding-left: 25px!important;
    }
    /* .ant-menu-title-content{
        margin-top: 15px;
    } */
    
`

export default function SideBar(props) {

    const dispatch = useDispatch()
    const account = useSelector((state) => state.account)

    const [collapsed, setCollapsed] = useState(false);
    const history = useNavigate()
    const { pathname } = useLocation();
    const [data, setData] = useState(null);
    const [menus, setMenus] = useState([])


    useEffect(() => {
        const init = async () => {

            let menusItem = [{
                key: '',
                icon: <FaHome className='icon-sli' />,
                label: 'Home',
                // children: [
                //     { key: '#table-team', icon: <MdAddCircle className='icon-sli' />, label: <NavLink to='/#table-team'>ข้อมูลพนักงาน</NavLink> },
                //     { key: '#wisaitas', icon: <MdAddCircle className='icon-sli' />, label: <NavLink to='/#wisaitas'>วิสัยทัศน์ขององค์กร</NavLink> },
                //     { key: '#executive', icon: <MdAddCircle className='icon-sli' />, label: <NavLink to='/#executive'>แนะนำผู้บริหารองค์กร</NavLink> }
                // ]
            },
            {
                key: 'repair',
                icon: <GoTools className='icon-sli' />,
                label: 'Help-Desk',

            },
            {
                key: 'hr_m',
                icon: <BsFillPeopleFill className='icon-sli' />,
                label: 'Hr-Management',
                children: [
                    { key: 'hr', icon: <MdAddCircle className='icon-sli' />, label: <NavLink to='/hr'>พนักงานเริ่มงานใหม่</NavLink> },
                ]

            },]

            if (!props.disableUserProfile) {
                try {
                    let resp = await axios.get(process.env.REACT_APP_SERVER_ENDPOINT + '/api/user/profile', { withCredentials: true })
                    console.log(resp.data.data)

                    if (resp?.data?.status) {
                        dispatch(setAccount(resp.data.data))

                        if (pathname === '/hr' && !resp.data.data.hr_acc) {
                            Swal.fire('คุณไม่มีสิทธิ์เข้าใช้งาน')
                            history('/')
                        }

                        if (resp.data.data.role == 5 || resp.data.data.role == 4 || resp.data.data.role == 6) {
                            menusItem = []
                        }

                    }
                } catch (error) {
                    if (error.response.status == 401) {
                        if (error.response.status == 401) {
                            // Swal.fire({
                            //     title: 'กรุณาเข้าสู่ระบบก่อนเข้าใข้งาน',
                            //     confirmButtonText: 'OK',
                            // }).then((result) => {
                            //     if (result.isConfirmed) {
                            window.location.href = "/login"
                            //     }
                            // })
                        }
                    }
                }
            }

            setMenus(menusItem)
        }

        init()
    }, [pathname]);

    function renderMenuDefaultValue() {
        let url = window.location.href

        if (pathname == '/hr')
            return ['hr_m', 'hr']
        else if (url.indexOf('#') > 0) {
            let splitUrl = url.split('#')
            return ['home', '#' + splitUrl[1]]
        } else {
            console.log(pathname.replace('/', ''))
            return [pathname.replace('/', '')]
        }


    }

    return (
        <SideBarComponent trigger={null} collapsible collapsed={collapsed}>

            {props.disableUserProfile ?
                <div style={{ height: '220px' }}>
                    <div className='head-slider'>
                        {/* <img src="/logo-chase.png" className="logo-w" width={140} height={25}></img> */}
                    </div>
                </div> : <>
                    <div className="sidebar-trigger" onClick={() => {
                        setCollapsed(!collapsed)
                    }}>
                        {/* <GiHamburgerMenu className="sidebar-trigger-button" /> */}
                    </div>
                    <div className="title">
                        <img src="/logo-chase.png" className="logo-w" width={140} height={25}></img>
                    </div>
                    <hr />
                    <div className="icon" ><ImUserTie className='icon-slider'></ImUserTie></div>
                    <div className="username"><div className='h5 name'>HI' {account?.profile?.EUserName}</div></div>
                    <div className='button-signout' onClick={async () => {
                        let logout = await axios.post(process.env.REACT_APP_SERVER_ENDPOINT + '/api/logout', null, { withCredentials: true })
                        if (logout?.data?.status) {
                            window.location.href = '/login'
                        }
                    }}><div className='button-out'>Sign-out</div></div>
                </>}
            <div className='menu'>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultOpenKeys={renderMenuDefaultValue()}
                    defaultSelectedKeys={renderMenuDefaultValue()}
                    items={menus}
                    onClick={(item) => { history('/' + item.key) }}
                />
            </div>

        </SideBarComponent>
    )
}
