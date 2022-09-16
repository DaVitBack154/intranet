import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { RiFileExcel2Fill } from "react-icons/ri";
import { IoMdAddCircle } from "react-icons/io";
import Table from "../../components/table";
import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { FaSearchPlus } from "react-icons/fa"
import { setData, setColumn } from '../../store/Hr_Reducer';
import { Excel } from 'antd-table-saveas-excel'

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
      font-size: 12px;
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

  &.button-status-Postponed{
    background-color: #0069D9;
    color: #FFFF;
    display: flex;
    justify-content: center;
    font-weight: bold;
    padding: 3px;
    border-radius: 5px;
  }

  &.button-status-Reject{
    background-color: gray;
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
      margin-right: 10px;

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

      .btn-viewuser{
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

const Btn_edit_view = styled.div`
  display: flex;
  padding-right: 5px;  
`

export default function TableProfileData(props) {

  const account = useSelector((state) => state.account)
  const dispatch = useDispatch()
  const data = useSelector((state) => state.hr_data.data)
  const column = useSelector((state) => state.hr_data.column)

  useEffect(() => {
    const init = async () => {

      let columns = [
        // {
        //   title: 'Fullname-th',
        //   dataIndex: 'name_th'
        // },
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

      if (account?.profile?.role == 20) { // สิทของพนักงาน คนแรก ที่แจ้งพนักงานเริ่มงงาน
        columns.unshift({
          title: '',
          dataIndex: '',
          width: 10,
          render: (_, record) => (
            <Btn_edit_view className='button-edit-view'>
              <NavLink to={'/form-hr-a/' + record.id}>
                <Btn_table>
                  <div className="btn-adduser">
                    <FaUserEdit />
                  </div>
                </Btn_table>
              </NavLink>

              <NavLink to={'/form-hr-user_id/' + record.id}>
                <Btn_table>
                  <div className="btn-viewuser">
                    <FaSearchPlus className='icon-view' />
                  </div>
                </Btn_table>
              </NavLink>

            </Btn_edit_view>
          )
        })
      }


      if (account?.profile?.role == 23) { // สิทของฝ่าย พี่ตู่ head
        const colum_head = [
          { title: 'Sign-Head', dataIndex: 'sign_head' },
          {
            title: 'Status-head',
            dataIndex: 'status_head',
            render: (_, record) => (
              <ButtonComponent className={"button-status-" + record.status_head}>
                <div>{record.status_head}</div>
              </ButtonComponent>
            )
          },
        ]
        columns = [...columns, ...colum_head]
        columns.push({
          title: '',
          dataIndex: '',
          width: 20,
          render: (_, record) => (
            <NavLink to={'/form-app-head/' + record.id}>
              <Btn_table>
                <div className="btn-edit-hr">
                  <FaEdit />
                </div>
              </Btn_table>
            </NavLink>
          )
        })
      }


      if (account?.profile?.role == 2) { // สิทของฝ่าย IT
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

      if (account?.profile?.role == 22) { //สิท พนักงาน เท่ากับของพี่มิ้น 
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

      if (account?.profile?.role == 24) { //สิท พนักงาน เท่ากับของ สนุ๊ก
        const colum_hr_img = [
          { title: 'Sign-Hr-img', dataIndex: 'sign_img' },
          {
            title: 'Status-Hr-img',
            dataIndex: 'status_img',
            render: (_, record) => (
              <ButtonComponent className={"button-status-" + record.status_img}>
                <div>{record.status_img}</div>
              </ButtonComponent>
            )
          },
        ]
        columns = [...columns, ...colum_hr_img]
        columns.push({
          title: '',
          dataIndex: '',
          width: 20,
          render: (_, record) => (
            <NavLink to={'/form-app-img/' + record.id}>
              <Btn_table>
                <div className="btn-edit-hr">
                  <FaEdit />
                </div>
              </Btn_table>
            </NavLink>
          )
        })
      }

      if (account?.profile?.role == 20 || account?.profile?.role == 25) { //level คนแรก
        const column_approve = [
          { title: 'Sign-Head', dataIndex: 'sign_head' },
          {
            title: 'Status-head',
            dataIndex: 'status_head',
            render: (_, record) => (
              <ButtonComponent className={"button-status-" + record.status_head}>
                <div>{record.status_head}</div>
              </ButtonComponent>
            )
          },
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
          { title: 'Sign-Hr-img', dataIndex: 'sign_img' },
          {
            title: 'Status-Hr-img',
            dataIndex: 'status_img',
            render: (_, record) => (
              <ButtonComponent className={"button-status-" + record.status_img}>
                <div>{record.status_img}</div>
              </ButtonComponent>
            )
          },

        ]
        columns = [...columns, ...column_approve]

      }

      if (account?.profile?.role == 24 || account?.profile?.role == 23 || account?.profile?.role == 22) { //สิท พนักงาน ทุกคนที่เห็น
        columns.unshift({
          title: '',
          dataIndex: '',
          width: 10,
          render: (_, record) => (
            <Btn_edit_view className='button-edit-view'>
              <NavLink to={'/form-hr-user_id/' + record.id}>
                <Btn_table>
                  <div className="btn-viewuser">
                    <FaSearchPlus className='icon-view' />
                  </div>
                </Btn_table>
              </NavLink>

            </Btn_edit_view>
          )
        })
      }

      // setcolumns(columns)
      dispatch(setColumn(columns))

      let hrResp = await axios.get(process.env.REACT_APP_SERVER_ENDPOINT + '/api/hr/get-profile', { withCredentials: true })
      if (hrResp?.data?.status) {
        dispatch(setData(hrResp.data.data))
      }

    }
    init()
  }, [account])

  const handleClick = async () => {
    try {
      let hr_excelData = await axios.get(process.env.REACT_APP_SERVER_ENDPOINT + '/api/hr/get-profile', { withCredentials: true })

      if (hr_excelData?.data?.status) {
        let excelColumn = [
          {
            title: 'ชื่อ-นามสกุล(TH)',
            dataIndex: 'name_th'
          },
          {
            title: 'ชื่อ-นามสกุล(EN)',
            dataIndex: 'name_en'
          },
          {
            title: 'ชื่อเล่น',
            dataIndex: 'nick_name'
          },
          {
            title: 'ตำแหน่ง',
            dataIndex: 'position'
          },
          {
            title: 'แผนก',
            dataIndex: 'department'
          },
          {
            title: 'วันเซ็นสัญญา',
            dataIndex: 'sign_date_work'
          },
          {
            title: 'วันที่เริ่มงาน',
            dataIndex: 'start_date_work'
          },
          {
            title: 'ที่อยู่',
            dataIndex: 'address'
          },
          {
            title: 'เลขบัตรประชาชน',
            dataIndex: 'idcard_no'
          },
          {
            title: 'วันที่ออก-บัตร',
            dataIndex: 'date_card_start'
          },
          {
            title: 'วันหมดอายุ-บัตร',
            dataIndex: 'date_card_exp'
          },
          {
            title: 'เบอร์มือถือ',
            dataIndex: 'phone'
          },
          {
            title: 'Level-User',
            dataIndex: 'user_level'
          },
        ]

        const excel = new Excel()
        excel
          .addSheet('sheet1')
          .addColumns(excelColumn)
          .addDataSource(hr_excelData.data.data, {})
          .addColumns([{ title: 'จำนวนทั้งหมด ' + hr_excelData.data.data.length }])
          .saveAs('report-hr.xlsx')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <TableComponent columns={column} dataSource={data} topLeftButton={<ButtonGroup className="">
      {account?.profile?.role == 20 ? (
        <NavLink to={"/form-hr-a"}>
          <button className="button-create-building">
            <IoMdAddCircle className="icon-add" />
          </button>
        </NavLink>
      ) : ("")}

      <button className="btn-excel" onClick={handleClick}>
        <RiFileExcel2Fill />
      </button>
    </ButtonGroup>} />
  )
}
