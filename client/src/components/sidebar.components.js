
import { Layout, Menu } from 'antd';
import { useEffect, useState } from "react";
import axios from 'axios'
import styled from 'styled-components';
import { ImUserTie } from 'react-icons/im'
import { GoTools } from 'react-icons/go'
import { FaHome } from 'react-icons/fa'
import { MdAddCircle } from 'react-icons/md'
import { BsFillPeopleFill } from 'react-icons/bs'
import { FaWallet } from 'react-icons/fa'
import { FaShoppingCart } from 'react-icons/fa'
import { HiDocumentText } from 'react-icons/hi'
import { BsPersonCheckFill } from 'react-icons/bs'


import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux'
import { setAccount } from '../store/AccountReducer'

const { Sider } = Layout;

const SideBarComponent = styled(Sider)`
    height: 100vh;
    position: fixed;
    
    /* overflow: scroll; */

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

    .ant-menu-submenu-title{
        padding-left: 15px!important;
    }
    .ant-menu-item {
        padding-left: 15px!important;
    }
    /* .kqkqLn .ant-menu-submenu-title{
        padding-left: 15px!important;
    } */
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
    // const [data, setData] = useState(null);
    const [menus, setMenus] = useState([])


    useEffect(() => {
        const init = async () => {

            let menusItem = [
                {
                    key: '',
                    icon: <FaHome className='icon-sli' />,
                    label: 'E-portal',
                },

                {
                    key: 'IT',
                    icon: <GoTools className='icon-sli' />,
                    label: 'IT',
                    children: [
                        { key: 'repair', icon: <MdAddCircle className='icon-sli' />, label: <NavLink to='/repair'>Help-Desk</NavLink> },
                        { key: 'form', icon: <MdAddCircle className='icon-sli' />, label: <NavLink to='/from_doc_it'>Form-IT</NavLink> },
                        {
                            key: 'hotline',
                            icon: <MdAddCircle className='icon-sli' />,
                            label: 'Hotline',
                            children: [
                                {
                                    label: <NavLink to='/hotline1'>Hotline-1</NavLink>,
                                    key: 'hotline1',
                                    icon: <MdAddCircle className='icon-sli' />,
                                },
                                {
                                    label: <NavLink to='/hotline'>Hotline-2</NavLink>,
                                    key: 'hotline-2',
                                    icon: <MdAddCircle className='icon-sli' />,
                                },
                            ],
                        }
                    ]
                },

                {
                    key: 'hr_m',
                    icon: <BsFillPeopleFill className='icon-sli' />,
                    label: 'People',
                    children: [
                        { key: 'hr', icon: <MdAddCircle className='icon-sli' />, label: <NavLink to='/hr'>พนักงานเริ่มงานใหม่</NavLink> },
                        { key: 'hr_from', icon: <MdAddCircle className='icon-sli' />, label: <NavLink to='/from_doc_hr'>Form-People</NavLink> },
                        { key: 'hr_infor', icon: <MdAddCircle className='icon-sli' />, label: <NavLink to='/from_doc_hr'>งานด้านข้อมูล</NavLink> },
                        { key: 'hr_50', icon: <MdAddCircle className='icon-sli' />, label: <NavLink to='/from_doc_hr'>ทวิ.50</NavLink> },
                        { key: 'hr_slip', icon: <MdAddCircle className='icon-sli' />, label: <NavLink to='/from_doc_hr'>Payrollslip</NavLink> },
                    ]

                },

                {
                    key: 'acc_fin',
                    icon: <FaWallet className='icon-sli' />,
                    label: 'Account & Finance',
                    children: [
                        { key: 'acc', icon: <MdAddCircle className='icon-sli' />, label: <NavLink to='/acc'>แบบฟอร์ม-เบิกเงิน</NavLink> },
                    ]

                },

                {
                    key: 'po',
                    icon: <FaShoppingCart className='icon-sli' />,
                    label: 'Procurement',
                    children: [
                        { key: 'po_ning', icon: <MdAddCircle className='icon-sli' />, label: <NavLink to='/from_po'>แบบฟอร์ม-PR,PO</NavLink> },
                    ]

                },

                {
                    key: 'policy',
                    icon: <HiDocumentText className='icon-sli' />,
                    label: 'Policy & Regulation',
                    children: [
                        {
                            key: 'policy1',
                            icon: <MdAddCircle className='icon-sli' />,
                            // label: <NavLink to='/hotline'>Hotline</NavLink>,
                            label: 'Policy',
                            children: [
                                // {
                                //     label: <NavLink to='/policy-doc'>Policy-Document</NavLink>,
                                //     key: 'policy-doc',
                                //     icon: <MdAddCircle className='icon-sli' />,
                                // },
                                {
                                    label: <NavLink to='/regulation-doc'>ขั้นตอนการดำเนินงาน</NavLink>,
                                    key: 'regulation-doc',
                                    icon: <MdAddCircle className='icon-sli' />,
                                },
                            ],
                        },
                        {
                            key: 'regulation',
                            icon: <MdAddCircle className='icon-sli' />,
                            // label: <NavLink to='/hotline'>Hotline</NavLink>,
                            label: 'Regulation',
                            children: [
                                // {
                                //     label: <NavLink to='/hotline1'>Regulation-Document</NavLink>,
                                //     key: 'regulation-doc',
                                //     icon: <MdAddCircle className='icon-sli' />,
                                // },
                                {
                                    label: <NavLink to='/hotline'>บอร์ด-ประกาศ</NavLink>,
                                    key: 'regulation-noti',
                                    icon: <MdAddCircle className='icon-sli' />,
                                },
                            ],
                        },
                        // { key: '##2', icon: <MdAddCircle className='icon-sli' />, label: <NavLink to='/'>Regulation</NavLink> },
                    ]

                },

                {
                    key: 'directory',
                    icon: <BsPersonCheckFill className='icon-sli' />,
                    label: 'Directory',
                    children: [
                        { key: 'directory-doc', icon: <MdAddCircle className='icon-sli' />, label: <NavLink to='/direc'>ข้อมูลพนักงาน</NavLink> },
                    ]

                },




            ]

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

                        if (resp.data.data.role === 5 || resp.data.data.role === 4 || resp.data.data.role === 6) {
                            menusItem = []
                        }

                    }
                } catch (error) {
                    if (error.response.status === 401) {
                        if (error.response.status === 401) {
                            window.location.href = "/login"
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

        if (pathname === '/hr')
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
                        <img src="/logo-chase.png" className="logo-w" width={140} height={25} alt="logo"></img>
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
