import SideBar from "../../components/sidebar.components";
import Navbar from "../../components/navbar.compoenets";
import styled from "styled-components";
import Table from "../../components/table";
import { useEffect, useState } from 'react'
import axios from "axios";
import { NavLink, useLocation } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { RiFileExcel2Fill } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";




const HrComponent = styled.div`
  width: 100%;

  .content{
      .group-hr{
      
        .table-hr{
          padding: 30px;
        }
      
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  padding:5px;

  .button-create-building, .btn-excel{
      font-size: 25px;
      border: none;
      background-color: #015352;
      color: #FFFF;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      justify-content: center;
    }

    .button-create-building{
      margin-right: 10px;
    }
 
`

const TableComponent = styled(Table)`

  .ant-table-thead > tr > th
    {
      font-size: 13px;
    }

  .ant-table-tbody > tr > td
   {
    font-size: 11px;
    color: gray;
  }
 
`

const ButtonComponent = styled.div`

  &.button-status-Pending{
    background-color: red;
    color: #FFFF;
    display: flex;
    justify-content: center;
    font-weight: bold;
    padding: 3px;
    border-radius: 5px;
  }

  &.button-status-Confirm{
    background-color: green;
    color: #FFFF;
    display: flex;
    justify-content: center;
    font-weight: bold;
    padding: 3px;
    border-radius: 5px;
  }

  &.button-status-Approve{
    background-color: green;
    color: #FFFF;
    display: flex;
    justify-content: center;
    font-weight: bold;
    padding: 3px;
    border-radius: 5px;
  }
`
const Btn_table = styled.div`

      .btn-edit-hr{
        font-size: 20px;
        color: #FFFF;
        background-color: red;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .btn-adduser{
        font-size: 20px;
        color: #FFFF;
        background-color: #015352;
        width: 35px;
        height: 35px;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
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

          let columns = [
            {
              title: 'Fullname-th',
              dataIndex: 'name_th'
            },
            {
              title: 'Fullname-en',
              dataIndex: 'name_en'
            },
            // {
            //   title: 'Nick-name',
            //   dataIndex: 'nick_name'
            // },
            {
              title: 'Position',
              dataIndex: 'position'
            },
            {
              title: 'Department',
              dataIndex: 'department'
            },
            { title: 'Start_Work', dataIndex: 'start_date_work' },


            {
              title: 'Status',
              dataIndex: 'status_hr',
              render: (_, record) => (
                <ButtonComponent className={"button-status-" + record.status_hr}>
                  <div>{record.status_hr}</div>
                </ButtonComponent>
              )
            },

          ]

          if (resp.data.data.role == 20) { // สิทของพนักงาน คนแรก ที่แจ้งพนักงานเริ่มงงาน
            columns.unshift({
              title: '',
              dataIndex: '',
              width: 20,
              render: (_, record) => (
                <NavLink to={'/form-hr-a/' + record.id}>
                  <Btn_table>
                    <div className="btn-adduser">
                      <FaUserEdit />
                    </div>
                  </Btn_table>
                </NavLink>
              )
            })
          }

          if (resp.data.data.role == 2) { // สิทของฝ่าย IT
            const colum_it = [
              { title: 'Sign-It', dataIndex: 'sign_it' },
              {
                title: 'Status-it',
                dataIndex: 'status_it',
                render: (_, record) => (
                  <ButtonComponent className={"button-status-" + record.status_it}>
                    <div>{record.status_it}</div>
                  </ButtonComponent>
                )
              },
            ]
            columns = [...columns, ...colum_it]
            columns.push({
              title: '',
              dataIndex: '',
              width: 20,
              render: (_, record) => (
                <NavLink to={'/form-app-it/' + record.id}>
                  <Btn_table>
                    <div className="btn-edit-hr">
                      <FaEdit />
                    </div>
                  </Btn_table>
                </NavLink>
              )
            })
          }

          if (resp.data.data.role == 22) { //สิท พนักงาน เท่ากับของพี่มิ้น 
            const colum_hr = [
              { title: 'Sign-Hr', dataIndex: 'sign_contract' },
              {
                title: 'Status-Hr',
                dataIndex: 'status_contract',
                render: (_, record) => (
                  <ButtonComponent className={"button-status-" + record.status_contract}>
                    <div>{record.status_contract}</div>
                  </ButtonComponent>
                )
              },
            ]
            columns = [...columns, ...colum_hr]
            columns.push({
              title: '',
              dataIndex: '',
              width: 20,
              render: (_, record) => (
                <NavLink to={'/form-app-ct/' + record.id}>
                  <Btn_table>
                    <div className="btn-edit-hr">
                      <FaEdit />
                    </div>
                  </Btn_table>
                </NavLink>
              )
            })
          }

          if (resp.data.data.role == 20) {
            const column_approve = [

              { title: 'Sign-It', dataIndex: 'sign_it' },
              {
                title: 'Status-it',
                dataIndex: 'status_it',
                render: (_, record) => (
                  <ButtonComponent className={"button-status-" + record.status_it}>
                    <div>{record.status_it}</div>
                  </ButtonComponent>
                )
              },
              { title: 'Sign-Hr', dataIndex: 'sign_contract' },
              {
                title: 'Status-hr',
                dataIndex: 'status_contract',
                render: (_, record) => (
                  <ButtonComponent className={"button-status-" + record.status_contract}>
                    <div>{record.status_contract}</div>
                  </ButtonComponent>
                )
              },
            ]
            columns = [...columns, ...column_approve]

          }

          // if (resp.data.data.role == 2) {
          //   const columns2 = [
          //     { title: 'เลขบัตรประชาชน', dataIndex: 'idcard_no' },
          //     { title: 'วัน/เดือน/ปี', dataIndex: 'bird_day' },
          //     { title: 'ประกันสังคม', dataIndex: 'social_security' },
          //     { title: 'ชื่อโรงพยาบาล', dataIndex: 'name_hospital' },
          //     { title: 'บัญชีธนาคาร', dataIndex: 'acc_no' },
          //     // { title: 'start_date_work', dataIndex: 'start_date_work' },
          //     { title: 'สังกัด', dataIndex: 'branch' },
          //     { title: 'เบอร์โทรศัพท์', dataIndex: 'phone' },
          //   ]
          //   columns = [...columns, ...columns2]
          // }
          console.log(columns)
          setcolumns(columns)
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
          <div className="head-hr">
          </div>
          <div className="table-hr">

            <TableComponent columns={columns} dataSource={hr_emp} topLeftButton={<ButtonGroup className="">
              {userprofile?.role === 20 ? (
                <NavLink to={"/form-hr-a"}>
                  <button className="button-create-building">
                    <IoMdAddCircle className="icon-add" />
                  </button>
                </NavLink>
              ) : ("")}

              <button className="btn-excel">
                <RiFileExcel2Fill />
              </button>
            </ButtonGroup>} />
          </div>
        </div>
      </div>
    </HrComponent>
  );
}
