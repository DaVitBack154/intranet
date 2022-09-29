import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Table from '../../components/table'
import { AiTwotoneEdit } from 'react-icons/ai'
import styled from 'styled-components'
import axios from 'axios'
import { Excel } from 'antd-table-saveas-excel'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { TbReportSearch } from 'react-icons/tb'
import { useSelector, useDispatch } from 'react-redux'
import { setColumnit, setColumnbuilding } from '../../store/ListAccountReducer'

const ButtonGroup_it = styled.div`
  display: flex;

  .button-export-excel,
  .button-report-process {
    background-color: #015352;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    padding: 7px;
    margin-bottom: 10px;
    margin-right: 15px;
    cursor: pointer;

    .icon-add {
      font-size: 20px;
      margin-right: 5px;
      display: flex;
      align-items: center;
    }
  }
`

export default function TableData(props) {
  const dispatch = useDispatch()
  const datait = useSelector((state) => state.Listaccount.datait)
  const columnsIt = useSelector((state) => state.Listaccount.columnit)

  const data_building = useSelector((state) => state.Listaccount.databuilding)
  const columnsBuilding = useSelector((state) => state.Listaccount.columbuilding)


  useEffect(() => {
    const init = async () => {

      let columnIt = [
        {
          fixed: 'left',
          title: '',
          dataIndex: '',
          width: 75,
          render: (_, record) => (
            <NavLink to={'/form-acc/' + record.id + '?type_id=' + record.type_id}>
              <button className={'button-edit'}>
                <AiTwotoneEdit />
              </button>
            </NavLink>
          )
        },
        {
          title: 'เลขที่แจ้งซ่อม',
          dataIndex: 'ticket_no',
          sorter: (a, b) => {
            a = a.ticket_no || ''
            b = b.ticket_no || ''
            return a.localeCompare(b)
          }
        },
        {
          title: 'วันที่แจ้งซ่อม',
          dataIndex: 'create_date'
        },
        {
          title: 'ผู้แจ้งซ่อม',
          width: 140,
          dataIndex: 'TUserName'
        },
        {
          title: 'เบอร์ต่อ',
          dataIndex: 'ExtNo'
        },
        {
          title: 'ปัญหาที่เกิดขึ้น',
          dataIndex: 'description'
        },
        {
          title: 'ผู้ตรวจรับงาน',
          dataIndex: 'admin_name'
        },
        {
          title: 'Ref/No.1',
          dataIndex: 'img_repair',
          render: (_, record) =>
            record.img_repair && (
              <a href={process.env.REACT_APP_SERVER_ENDPOINT + '/public/image/repair/' + record.img_repair} target="__blank">
                รูป
              </a>
            )
        },
        {
          title: 'หมายเหตุ',
          dataIndex: 'remark'
        },
        {
          title: 'ผู้อนุมัติ',
          dataIndex: 'allow_name'
        },
        {
          title: 'Number',
          dataIndex: 'number'
        },
        {
          title: 'Img',
          dataIndex: 'image',
          render: (_, record) =>
            record.image && (
              <a href={process.env.REACT_APP_SERVER_ENDPOINT + '/public/image/repair/' + record.image} target="__blank">
                รูป
              </a>
            )
        },
        {
          title: 'Invoice-Img',
          dataIndex: 'img_inv',
          render: (_, record) =>
            record.img_inv && (
              <a href={process.env.REACT_APP_SERVER_ENDPOINT + '/public/image/repair/' + record.img_inv} target="__blank">
                รูป
              </a>
            )
        },
        {
          title: 'Approve',
          dataIndex: 'acc_approve',
          render: (_, record) => {
            let status = null
            if (!record?.acc_approve || record?.acc_approve === 0) status = 'not-approve'
            if (record?.acc_approve && record?.acc_approve === 1) status = 'approve'
            if (record?.acc_approve && record?.acc_approve === 2) status = 'reject'

            return (
              <div className="table-button-group">
                <button className={'button-detail status-' + status} onClick={() => { }}>
                  <b>{status}</b>
                </button>
              </div>
            )
          }
        },
        {
          title: 'ผู้อนุมัติ',
          dataIndex: 'acc_name'
        },
        {
          title: 'Pv-Account',
          dataIndex: 'acc_acc'
        },
        {
          title: 'Pv-Date',
          dataIndex: 'acc_date'
        },
        {
          title: 'Pv-Image',
          dataIndex: 'img_acc',
          render: (_, record) =>
            record.img_acc && (
              <a href={process.env.REACT_APP_SERVER_ENDPOINT + '/public/image/repair/' + record.img_acc} target="__blank">
                รูป
              </a>
            )
        }
      ]

      let columnBulding = [
        {
          fixed: 'left',
          title: '',
          dataIndex: '',
          width: 75,
          render: (_, record) => (
            <NavLink to={'/form-acc/' + record.id + '?type_id=' + record.type_id}>
              <button className={'button-edit'}>
                <AiTwotoneEdit />
              </button>
            </NavLink>
          )
        },
        {
          title: 'เลขที่แจ้งซ่อม',
          dataIndex: 'ticket_no',
          sorter: (a, b) => {
            a = a.ticket_no || ''
            b = b.ticket_no || ''
            return a.localeCompare(b)
          }
        },
        {
          title: 'วันที่แจ้งซ่อม',
          dataIndex: 'create_date'
        },
        {
          title: 'ผู้แจ้งซ่อม',
          width: 140,
          dataIndex: 'TUserName'
        },
        {
          title: 'เบอร์ต่อ',
          dataIndex: 'ExtNo'
        },
        {
          title: 'ปัญหาที่เกิดขึ้น',
          dataIndex: 'description'
        },
        {
          title: 'ผู้ตรวจรับงาน',
          dataIndex: 'admin_name'
        },
        {
          title: 'Ref/No.1',
          dataIndex: 'img_repair',
          render: (_, record) =>
            record.img_repair && (
              <a href={process.env.REACT_APP_SERVER_ENDPOINT + '/public/image/repair/' + record.img_repair} target="__blank">
                รูป
              </a>
            )
        },
        {
          title: 'หมายเหตุ',
          dataIndex: 'remark'
        },
        {
          title: 'ผู้อนุมัติ',
          dataIndex: 'allow_name'
        },
        {
          title: 'Number',
          dataIndex: 'number'
        },
        {
          title: 'Img',
          dataIndex: 'image',
          render: (_, record) =>
            record.image && (
              <a href={process.env.REACT_APP_SERVER_ENDPOINT + '/public/image/repair/' + record.image} target="__blank">
                รูป
              </a>
            )
        },
        {
          title: 'Invoice-Img',
          dataIndex: 'img_inv',
          render: (_, record) =>
            record.img_inv && (
              <a href={process.env.REACT_APP_SERVER_ENDPOINT + '/public/image/repair/' + record.img_inv} target="__blank">
                รูป
              </a>
            )
        },
        {
          title: 'Approve',
          dataIndex: 'acc_approve',
          render: (_, record) => {
            let status = null
            if (!record?.acc_approve || record?.acc_approve === 0) status = 'not-approve'
            if (record?.acc_approve && record?.acc_approve === 1) status = 'approve'
            if (record?.acc_approve && record?.acc_approve === 2) status = 'reject'

            return (
              <div div className="table-button-group">
                <button className={'button-detail status-' + status} onClick={() => { }}>
                  <b>{status}</b>
                </button>
              </div>
            )
          }
        },
        {
          title: 'ผู้อนุมัติ',
          dataIndex: 'acc_name'
        },
        {
          title: 'Pv-Account',
          dataIndex: 'acc_acc'
        },
        {
          title: 'Pv-Date',
          dataIndex: 'acc_date'
        },
        {
          title: 'Pv-Image',
          dataIndex: 'img_acc',
          render: (_, record) =>
            record.img_acc && (
              <a href={process.env.REACT_APP_SERVER_ENDPOINT + '/public/image/repair/' + record.img_acc} target="__blank">
                รูป
              </a>
            )
        }
      ]

      if (props.type === 'it') {
        dispatch(setColumnit(columnIt))
      } else if (props.type === 'building') {
        dispatch(setColumnbuilding(columnBulding))
      }
    }

    init()
  }, [datait, data_building])

  const handleClick = async () => {
    try {
      // let repairLogsData = await axios.get(process.env.REACT_APP_SERVER_ENDPOINT + '/api/repair_list/it-logs', { withCredentials: true })

      if (datait) {
        let excelColumn = [
          {
            title: 'เลขที่แจ้งซ่อม',
            dataIndex: 'ticket_no'
          },
          {
            title: 'วันที่แจ้งซ่อม',
            dataIndex: 'create_date'
          },
          {
            title: 'ผู้ติดต่อ',
            dataIndex: 'TUserName'
          },
          {
            title: 'เบอร์ต่อ',
            dataIndex: 'ExtNo'
          },
          {
            title: 'IP-เครื่อง',
            dataIndex: 'ip'
          },
          {
            title: 'สาขาที่แจ้ง',
            dataIndex: 'branch'
          },
          {
            title: 'แจ้งปัญหา',
            dataIndex: 'description'
          },
          {
            title: 'ผู้ตรวจรับงาน',
            dataIndex: 'admin_name'
          },
          {
            title: 'หมวดหมู่ปัญหา',
            dataIndex: 'topic_id'
          },
          {
            title: 'ข้อมูลตอบกลับ',
            dataIndex: 'comment'
          },
          {
            title: 'สถานะ',
            dataIndex: 'status'
          },
          {
            title: 'หมายเหตุ',
            dataIndex: 'remark'
          },
          {
            title: 'ประเภทการซ่อม',
            dataIndex: 'expence_id'
          },
          {
            title: 'วันจบงาน',
            dataIndex: 'close_date'
          }
        ]

        const excel = new Excel()
        excel
          .addSheet('sheet1')
          .addColumns(excelColumn)
          .addDataSource(datait, {})
          .addColumns([{ title: 'จำนวนทั้งหมด ' + datait.length }])
          .saveAs('report-it.xlsx')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Table
        dataSource={props.type === 'it' ? datait : data_building}
        columns={props.type === 'it' ? columnsIt : columnsBuilding}
        topLeftButton={
          <ButtonGroup_it>
            {props?.user?.role === 4 ? (
              <div className="button-export-excel" onClick={handleClick}>
                <RiFileExcel2Fill className="icon-add" />
              </div>
            ) : (
              ''
            )}

            {props?.user?.role === 3 ? (
              <NavLink to={'/report-process/it'}>
                <button className="button-report-process">
                  <TbReportSearch className="icon-add" />
                </button>
              </NavLink>
            ) : (
              ''
            )}
          </ButtonGroup_it>
        }
      />
    </>
  )
}
