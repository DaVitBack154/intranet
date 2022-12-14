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

export default function TableData(props) {
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
            <NavLink to={'/form-fin/' + record.id + '?type_id=' + record.type_id}>
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
              <a href={process.env.REACT_APP_SERVER_ENDPOINT+'/public/image/repair/' + record.img_repair} target="__blank">
                รูป
              </a>
            )
        },
        {
          title: 'หมายเหตุ',
          dataIndex: 'remark'
        },
        {
          title: 'Approve',
          dataIndex: 'fin_approve',
          render: (_, record) => {
            let status = null
            if (!record?.fin_approve || record?.fin_approve === 0) status = 'not-approve'
            if (record?.fin_approve && record?.fin_approve === 1) status = 'approve'
            if (record?.fin_approve && record?.fin_approve === 2) status = 'reject'

            return (
              <div className="table-button-group">
                <button className={'button-detail status-' + status} onClick={() => {}}>
                  <b>{status}</b>
                </button>
              </div>
            )
          }
        },
        {
          title: 'ผู้ดำนเนินการ',
          dataIndex: 'fin_name'
        },
        {
          title: 'Fin-Number',
          dataIndex: 'fin_number'
        },
        {
          title: 'Fin-Date',
          dataIndex: 'fin_date'
        },
        {
          title: 'ผู้รับเงิน',
          dataIndex: 'fin_recipient'
        },
        {
          title: 'Fin-Img',
          dataIndex: 'img_fin',
          render: (_, record) =>
            record.img_fin && (
              <a href={process.env.REACT_APP_SERVER_ENDPOINT+'/public/image/repair/' + record.img_fin} target="__blank">
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
