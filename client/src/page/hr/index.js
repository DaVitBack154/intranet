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
  .ant-table-tbody > tr > td
   {
    font-size: 12px;
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
`
const BtnEdit = styled.div`

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
            { title: 'Start_Work', dataIndex: 'start_date_work' },

            {
              title: 'Note',
              dataIndex: 'note'
            },
          ]

          if (resp.data.data.role == 20) {
            let comumnsRole1 = [{
              title: 'Status',
              dataIndex: 'status_hr',
              render: (_, record) => record.status_hr ? (
                <ButtonComponent className={"button-status-" + record.status_hr}>
                  <div>{record.status_hr}</div>
                </ButtonComponent>
              ) : <></>
            },]

            columns = [...columns, ...comumnsRole1]
          }


          if (resp.data.data.role == 2) {
            const columns2 = [
              { title: 'เลขบัตรประชาชน', dataIndex: 'idcard_no' },
              { title: 'วัน/เดือน/ปี', dataIndex: 'bird_day' },
              { title: 'ประกันสังคม', dataIndex: 'social_security' },
              { title: 'ชื่อโรงพยาบาล', dataIndex: 'name_hospital' },
              { title: 'บัญชีธนาคาร', dataIndex: 'acc_no' },
              // { title: 'start_date_work', dataIndex: 'start_date_work' },
              { title: 'สังกัด', dataIndex: 'branch' },
              { title: 'เบอร์โทรศัพท์', dataIndex: 'phone' },
            ]

            if (resp.data.data.role == 2) {
              columns.unshift({
                title: '',
                dataIndex: '',
                width: 20,
                render: (_, record) => (
                  <NavLink to={'/form-hr-full/' + record.id}>
                    <BtnEdit>
                      <div className="btn-edit-hr">
                        <FaEdit />
                      </div>
                    </BtnEdit>
                  </NavLink>
                )
              })
            }
            columns = [...columns, ...columns2]
          }

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
