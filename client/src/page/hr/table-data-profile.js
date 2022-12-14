import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { RiFileExcel2Fill, RiFilePdfFill } from "react-icons/ri";
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
import moment from 'moment'
import { DatePicker } from 'antd';

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
  const [selectedMonth, setSelectedMonth] = useState(null)

  /**
 * @param {import('moment').Moment | null} date 
 */
  const handleSelectedMonthChanage = date => {
    console.log('date => ', date)
    if (date) {
      setSelectedMonth(date.get('M'))
    } else setSelectedMonth(null)
  }

  console.log('selectedMonth => ', selectedMonth)

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

      if (account?.profile?.role == 20) { // ??????????????????????????????????????? ??????????????? ?????????????????????????????????????????????????????????????????????
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


      if (account?.profile?.role == 23) { // ?????????????????????????????? ?????????????????? head
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


      if (account?.profile?.role == 2) { // ?????????????????????????????? IT
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

      if (account?.profile?.role == 22) { //????????? ????????????????????? ??????????????????????????????????????????????????? 
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

      if (account?.profile?.role == 24) { //????????? ????????????????????? ?????????????????????????????? ???????????????
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

      if (account?.profile?.role == 20 || account?.profile?.role == 25) { //level ???????????????
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

      if (account?.profile?.role == 24 || account?.profile?.role == 23 || account?.profile?.role == 22 || account?.profile?.role == 2 || account?.profile?.role == 25) { //????????? ????????????????????? ????????????????????????????????????
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
      console.log("hrResp.data.data => ", hrResp.data.data)
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

        let count = 1;
        let excelData = hr_excelData.data.data.filter(data => {
          if (selectedMonth !== null) {
            return moment(data.start_date_work).get("M") === selectedMonth
          } else return true
        });

        console.log('excelData => ', excelData)

        excelData.forEach(data => {
          data.count = count;
          data.sign_date_work = moment(data.sign_date_work).format('YYYY-MM-DD')
          count++;
        })

        let excelColumn = [
          {
            title: '???????????????',
            dataIndex: 'count'
          },

          {
            title: '????????????-?????????????????????(TH)',
            dataIndex: 'name_th'
          },
          {
            title: '????????????-?????????????????????(EN)',
            dataIndex: 'name_en'
          },
          {
            title: '????????????????????????',
            dataIndex: 'nick_name'
          },
          {
            title: '?????????????????????',
            dataIndex: 'position'
          },
          {
            title: '????????????',
            dataIndex: 'department'
          },
          {
            title: '????????????????????????????????????',
            dataIndex: 'sign_date_work'
          },
          {
            title: '??????????????????????????????????????????',
            dataIndex: 'start_date_work'
          },
          {
            title: '?????????????????????',
            dataIndex: 'address'
          },
          {
            title: '??????????????????????????????????????????',
            dataIndex: 'idcard_no'
          },
          {
            title: '???????????????????????????-????????????',
            dataIndex: 'date_card_start'
          },
          {
            title: '??????????????????????????????-????????????',
            dataIndex: 'date_card_exp'
          },
          {
            title: '?????????????????????????????????',
            dataIndex: 'phone'
          },
          {
            title: 'Level-User',
            dataIndex: 'user_level'
          },
          {
            title: 'Status-User',
            dataIndex: 'status_hr'
          },
        ]

        // const data = [
        //   {
        //     title: 'number',
        //     dataIndex: 'number'
        //   }
        // ];
        // for (let i = 0; i < hr_excelData.data.data.length; i++) {
        //   data.unshift({
        //     key: i,
        //     number: `${i}`,
        //   });
        // }
        // excelColumn = [...excelColumn, ...data]

        // console.log(excelColumn)

        const excel = new Excel()
        excel
          .addSheet('sheet1')
          .addColumns(excelColumn)
          .addDataSource(excelData, {})
          .addColumns([{ title: '???????????????????????????????????? ' + excelData.length }])
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
      <DatePicker onChange={handleSelectedMonthChanage} picker="month" />
    </ButtonGroup>} />
  )
}
