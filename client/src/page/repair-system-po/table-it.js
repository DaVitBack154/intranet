import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Table from '../../components/table'
import { AiTwotoneEdit } from 'react-icons/ai'
import styled from 'styled-components'
import axios from 'axios'
import { Excel } from 'antd-table-saveas-excel'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { TbReportSearch } from 'react-icons/tb'

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

export default function TableIt(props) {
  const [columns, setColumns] = useState(null)

  useEffect(() => {
    const init = async () => {
      let column = [
        {
          fixed: 'left',
          title: '',
          dataIndex: '',
          width: 75,
          render: (_, record) => (
            <NavLink to={'/form-po/' + record.id + '?type_id=' + record.type_id}>
              <button className={'button-edit'}>
                <AiTwotoneEdit />
              </button>
            </NavLink>
          )
        },
        {
          title: 'เลขที่แจ้งซ่อม',
          dataIndex: 'ticket_no',
          width: 120,
          sorter: (a, b) => {
            a = a.ticket_no || ''
            b = b.ticket_no || ''
            return a.localeCompare(b)
          }
        },
        {
          title: 'วันที่แจ้งซ่อม',
          dataIndex: 'create_date',
          width: 130,
        },
        {
          title: 'ผู้แจ้งซ่อม',
          width: '150px',
          dataIndex: 'TUserName'
        },
        {
          title: 'เบอร์ต่อ',
          dataIndex: 'ExtNo',
          width: 70,
        },
        {
          title: 'ปัญหาที่เกิดขึ้น',
          dataIndex: 'description',
          width: 170,
        },
        {
          title: 'ผู้ตรวจรับงาน',
          dataIndex: 'admin_name',
          width: 120,
        },
        {
          title: 'Ref/No.1',
          dataIndex: 'img_repair',
          width: 70,
          render: (_, record) =>
            record.img_repair && (
              <a href={process.env.REACT_APP_SERVER_ENDPOINT + '/public/image/repair/' + record.img_repair} target="__blank">
                รูป
              </a>
            )
        },
        {
          title: 'หมายเหตุ',
          dataIndex: 'remark',
          width: 120,
        },
        {
          title: 'Approve',
          dataIndex: 'po_approve',
          width: 120,
          render: (_, record) => {
            let status = null
            if (!record?.po_approve || record?.po_approve === 0) status = 'not-approve'
            if (record?.po_approve && record?.po_approve === 1) status = 'approve'
            if (record?.po_approve && record?.po_approve === 2) status = 'reject'

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
          title: 'ผู้ดำนเนินการ',
          dataIndex: 'po_name',
          width: 100,
        },
        {
          title: 'PO-Number',
          dataIndex: 'po_number',
          width: 100,
        },
        {
          title: 'PO-Date',
          dataIndex: 'po_date',
          width: 100,
        },
        {
          title: 'PO-Img',
          dataIndex: 'img_po',
          width: 100,
          render: (_, record) =>
            record.img_po && (
              <a href={process.env.REACT_APP_SERVER_ENDPOINT + '/public/image/repair/' + record.img_po} target="__blank">
                รูป
              </a>
            )
        },
        {
          title: 'INVOICE-Img',
          dataIndex: 'img_inv',
          width: 100,
          render: (_, record) =>
            record.img_inv && (
              <a href={process.env.REACT_APP_SERVER_ENDPOINT + '/public/image/repair/' + record.img_inv} target="__blank">
                รูป
              </a>
            )
        }
      ]

      setColumns(column)
    }

    init()
  }, [props.user, props.data])

  const handleClick = async () => {
    try {
      let repairLogsData = await axios.get(process.env.REACT_APP_SERVER_ENDPOINT + '/api/repair_list/it-logs', { withCredentials: true })

      if (repairLogsData?.data?.status) {
        let excelColumn = [
          {
            title: 'เลขที่แจ้งซ่อม',
            dataIndex: 'ticket_no',
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
          .addDataSource(repairLogsData.data.data, {})
          .addColumns([{ title: 'จำนวนทั้งหมด ' + repairLogsData.data.data.length }])
          .saveAs('report-it.xlsx')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Table
        dataSource={props.data}
        columns={columns}
        topLeftButton={
          <ButtonGroup_it>
            {props?.user?.role === 2 || props?.user?.role === 3 ? (
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
