import SideBar from "../../components/sidebar.components";
import Navbar from "../../components/navbar.compoenets";
import styled from "styled-components";
import Table from "../../components/table";
import { useEffect, useState } from 'react'
import axios from "axios";
import { NavLink, useLocation } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";

const HrComponent = styled.div`
  width: 100%;
  height: 100%;

  .content{
    height: 100%;

      .group-hr{
      background-color: red;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

`;

const BorderHr = styled.div`
    background-color: blue;
    height: 70vh;
    width: 80%;

  .ant-table{
      height: 500px !important;
      overflow-y: scroll;
    }
`

const ButtonGroup = styled.div`
  display: flex;
  padding:5px;
  button{
    background-color: green;
  }
`

const ButtonComponent = styled.div`

  background-color: green;

  &.button-status-pending{
    background-color: red;
  }
`

export default function Hr() {

  const [hr_emp, setHr_emp] = useState(null)
  const [userprofile, setUserprofile] = useState(null)
  const [columns, setcolumns] = useState(null)




  useEffect(() => {
    const init = async () => {

      try {
        let resp = await axios.get(process.env.REACT_APP_SERVER_ENDPOINT + "/api/user/profile", {
          withCredentials: true,
        });
        if (resp?.data?.status) {
          setUserprofile(resp.data.data);
          const columns = [
            {
              title: 'Fullname-th',
              dataIndex: 'name_th'
            },
            {
              title: 'Fullname-en',
              dataIndex: 'name_en'
            },
            {
              title: 'Nick-name',
              dataIndex: 'nick_name'
            },
            {
              title: 'Position',
              dataIndex: 'nick_name'
            },
            {
              title: 'Department',
              dataIndex: 'nick_name'
            },
            {
              title: 'Create-date',
              dataIndex: 'create_date'
            },

            {
              title: 'Agent',
              dataIndex: 'TUserName'
            },
            {
              title: 'Note',
              dataIndex: 'note'
            },
            {
              title: 'Status',
              dataIndex: 'status_hr',
              render: (_, record) => (
                // <div className="table-button-group">
                //   <button className={'button-detail status-' + record.status} onClick={() => { }}>
                //     <b>{record.status || '-'}</b>
                //   </button>
                // </div>
                <ButtonComponent className={"button-status-" + record.status_hr}>
                  <button>{record.status_hr}</button>
                </ButtonComponent>
              )
            },
            {
              title: 'test session1',
              dataIndex: 'note'
            },
          ]

          if (resp.data.data?.role === 20) {
            columns.push({
              title: 'test session1',
              dataIndex: '',
              width: 40,
              render: (_, record) => (
                <button>TEST</button>
                // <NavLink to={'/form-it/' + record.id + '?type_id=2'}>
                //   <button className={'button-edit'}>
                //     <AiTwotoneEdit />
                //   </button>
                // </NavLink>
              )
            })
          }

          const columnsIt = [
            {
              title: 'Fullname-th',
              dataIndex: 'name_th'
            },
          ]

          if (resp.data.data?.role === 2) {
            setcolumns(columnsIt)

          } else {
            setcolumns(columns)
          }
        }

        let hrResp = await axios.get(process.env.REACT_APP_SERVER_ENDPOINT + '/api/hr/get-profile', { withCredentials: true })
        if (hrResp?.data?.status) {
          setHr_emp(hrResp.data.data)
        }

      } catch (error) {
        if (error.res.status === 401) {
          window.location.href = '/login'
        }
      }
    }
    init()
  }, [])


  return (
    <HrComponent className="repair-system">
      <SideBar />
      <div className="content">
        <Navbar />
        <div className="group-hr">
          <BorderHr className="border-hr">
            <div className="head-hr">
            </div>
            <div className="table-hr">

              <Table columns={columns} dataSource={hr_emp} topLeftButton={<ButtonGroup className="">
                <NavLink to={"/form-hr-a"}>
                  <button className="button-create-building">
                    <IoMdAddCircle className="icon-add" />
                    เพิ่มข้อมูลพนักงาน
                  </button>
                </NavLink>
                <button>
                  Export-excel
                </button>
              </ButtonGroup>}></Table>
            </div>
          </BorderHr>
        </div>
      </div>
    </HrComponent>
  );
}
