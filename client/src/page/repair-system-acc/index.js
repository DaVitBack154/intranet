import SideBar from '../../components/sidebar.components'
import Navbar from '../../components/navbar.compoenets'
import styled from 'styled-components'
import { NavLink, useLocation } from 'react-router-dom'
import { Tabs } from 'antd'
import TableData from './table-data'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { IoMdAddCircle } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'
import { setDatait, setDatabuilding } from '../../store/ListAccountReducer'
const { TabPane } = Tabs

const RepairSystemPOComponent = styled.div`
  display: flex;
  width: 100%;

  .content {
    width: 100%;
  }

  .panel-group-card {
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
  }

  .repair-table {
    /* padding: 20px; */
    margin: 30px;
  }

  .button-group {
    display: flex;

    .button-create-it,
    .button-create-building {
      background-color: #015352;
      color: #fff;
      border: none;
      border-radius: 10px;
      font-weight: bold;
      padding: 12px;
      margin-right: 15px;

      .icon-add {
        font-size: 25px;
        margin-right: 5px;
      }
    }
    .button-create-building {
      background-color: #015352;
    }
  }
  .report-group {
    display: flex;
    position: relative;
    left: 780px;
  }
`

export default function RepairSystemPO() {
  // const [user, setUser] = useState(null)
  const datait = useSelector((state) => state.Listaccount.datait)
  const databuilding = useSelector((state) => state.Listaccount.databuilding)
  const user = useSelector((state) => state.account.profile)
  const [currentTab, setCurrentTab] = useState(null)
  let { search } = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    const init = async () => {
      try {

        let itResp = await axios.get(process.env.REACT_APP_SERVER_ENDPOINT + '/api/repair_list_acc/it', { withCredentials: true })
        if (itResp?.data?.status) {
          dispatch(setDatait(itResp.data.data))
        }
        let buildingtResp = await axios.get(process.env.REACT_APP_SERVER_ENDPOINT + '/api/repair_list_acc/building', { withCredentials: true })
        if (buildingtResp?.data?.status) {
          dispatch(setDatabuilding(buildingtResp.data.data))
        }
      } catch (error) {
        if (error.response.status === 401) {
          window.location.href = '/login'
        }
      }
    }

    init()
    const query = new URLSearchParams(search)
    const queryTab = query.get('tab')
    if (!currentTab) {
      setCurrentTab(queryTab === '2' ? '2' : '1')
    }
  }, [currentTab])

  return (
    <RepairSystemPOComponent className="repair-system">
      <SideBar />
      <div className="content">
        <Navbar />
        <br />
        <div className="repair-table">
          {user?.role === 1 ? (
            <div className="button-group">
              <NavLink to={'/form-it'}>
                <button className="button-create-it">
                  <IoMdAddCircle className="icon-add" />
                  ???????????????????????? IT-Support
                </button>
              </NavLink>
              <NavLink to={'/form-building'}>
                <button className="button-create-building">
                  <IoMdAddCircle className="icon-add" />
                  ???????????????????????? ???????????????????????????
                </button>
              </NavLink>
            </div>
          ) : (
            ''
          )}

          <Tabs
            defaultActiveKey={currentTab}
            activeKey={currentTab}
            onChange={(e) => {
              setCurrentTab(e)
            }}>
            <TabPane tab="???????????? IT-Support" key="1">
              <TableData type='it' />
            </TabPane>
            <TabPane tab="???????????? ???????????????" key="2">
              <TableData type='building' />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </RepairSystemPOComponent>
  )
}
