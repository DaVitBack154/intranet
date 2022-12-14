import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Table from '../../components/table'
import { AiTwotoneEdit } from 'react-icons/ai'
import { Input, Modal, Rate, message } from 'antd'
import styled from 'styled-components'
import axios from 'axios'
import swal from 'sweetalert2'
import { Excel } from 'antd-table-saveas-excel'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { TbReportSearch } from 'react-icons/tb'
import Swal from 'sweetalert2'

const RatingModel = styled(Modal)`
  .ant-modal-body {
    display: flex;
    flex-direction: column;
  }

  .button-group {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 20px;

    .point {
      background-color: #015352;
      border-radius: 5px;
      border: none;
      padding: 5px;
      color: #ffff;
    }
  }
  .comment_ratung {
    margin-top: 10px;
  }
`

const RatingPoint = styled.div`
  border: 1px solid red;
  border-radius: 50%;
  text-align: center;
  width: 20px;
  height: 20px;
  background-color: #564cf1;
  border: none;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50px;
`

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
  const [isModelOpen, setIsModelOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(false)
  const [rating, setRating] = useState(null)
  const [comment_ratting, setcomment_ratting] = useState(1)

  useEffect(() => {
    const init = async () => {
      let column = [
        {
          title: '??????????????????????????????????????????',
          dataIndex: 'ticket_no',
          sorter: (a, b) => {
            a = a.ticket_no || ''
            b = b.ticket_no || ''
            return a.localeCompare(b)
          }
        },
        {
          title: '??????????????????????????????????????????',
          dataIndex: 'create_date'
        },
        {
          title: '?????????????????????????????????',
          dataIndex: 'TUserName'
        },
        {
          title: '????????????????????????',
          dataIndex: 'ExtNo'
        },
        {
          title: 'IP-?????????????????????',
          dataIndex: 'ip'
        },
        {
          title: '?????????????????????????????????',
          dataIndex: 'branch'
        },
        {
          title: '???????????????????????????',
          dataIndex: 'description'
        },
        {
          title: '???????????????????????????????????????',
          dataIndex: 'admin_name'
        },
        {
          title: '???????????????????????????????????????',
          dataIndex: 'remark'
        },
        {
          title: '???????????????',
          dataIndex: 'status',
          render: (_, record) => (
            <div className="table-button-group">
              <button className={'button-detail status-' + record.status} onClick={() => { }}>
                <b>{record.status || '-'}</b>
              </button>
            </div>
          )
        }
      ]

      if (props?.user?.role === 2) {
        column.unshift({
          title: '',
          dataIndex: '',
          width: 20,
          render: (_, record) => (
            <NavLink to={'/form-it/' + record.id + '?type_id=2'}>
              <button className={'button-edit'}>
                <AiTwotoneEdit />
              </button>
            </NavLink>
          )
        })
      }

      if (props?.user?.role === 1 || props?.user?.role === 20) {
        column.push({
          title: 'point',
          dataIndex: '',
          width: 20,
          render: (_, record) => (
            <>
              {record.status == 'success' && !record.rating ? (
                <button
                  className={'button-rating'}
                  onClick={() => {
                    setcomment_ratting(null)
                    setIsModelOpen(true)
                    setSelectedRecord(record)
                  }}>
                  ???
                </button>
              ) : (
                ''
              )}
              {record.status == 'success' && record.rating ? <RatingPoint>{record.rating}</RatingPoint> : ''}
            </>
          )
        })
      }
      setColumns(column)
    }

    init()
  }, [props.user, props.data])

  const handleClick = async () => {
    try {
      let repairLogsData = await axios.get(process.env.REACT_APP_SERVER_ENDPOINT + '/api/repair_list/it-logs', { withCredentials: true })


      console.log(repairLogsData.data.data)

      if (repairLogsData?.data?.status) {
        let excelColumn = [
          {
            title: '??????????????????????????????????????????',
            dataIndex: 'ticket_no'
          },
          {
            title: '??????????????????????????????????????????',
            dataIndex: 'create_date'
          },
          {
            title: '???????????????????????????',
            dataIndex: 'TUserName'
          },
          {
            title: '????????????????????????',
            dataIndex: 'ExtNo'
          },
          {
            title: 'IP-?????????????????????',
            dataIndex: 'ip'
          },
          {
            title: '?????????????????????????????????',
            dataIndex: 'branch'
          },
          {
            title: '???????????????????????????',
            dataIndex: 'description'
          },
          {
            title: '???????????????????????????????????????',
            dataIndex: 'admin_name'
          },
          {
            title: '???????????????????????????????????????',
            dataIndex: 'topic_id'
          },
          {
            title: '???????????????????????????????????????',
            dataIndex: 'comment'
          },
          {
            title: '???????????????',
            dataIndex: 'status'
          },
          {
            title: '????????????????????????',
            dataIndex: 'remark'
          },
          {
            title: '???????????????????????????????????????',
            dataIndex: 'expence_id'
          },
          {
            title: '????????????????????????',
            dataIndex: 'close_date'
          }
        ]

        const excel = new Excel()
        excel
          .addSheet('sheet1')
          .addColumns(excelColumn)
          .addDataSource(repairLogsData.data.data, {})
          .addColumns([{ title: '???????????????????????????????????? ' + repairLogsData.data.data.length }])
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
      <RatingModel
        title={'?????????????????????????????????????????????????????????????????? ' + selectedRecord?.ticket_no}
        visible={isModelOpen}
        closeIcon={<>X</>}
        destroyOnClose={true}
        onCancel={() => {
          setIsModelOpen(false)
        }}
        footer={[]}>
        <Rate
          style={{ margin: '0 auto' }}
          onChange={async (number) => {
            setRating(number)
          }}
        />
        <div className={'comment_ratung'}>
          <Input.TextArea
            placeholder={'????????????????????????????????????????????????????????????????????????????????????????????????'}
            onChange={(comment) => {
              setcomment_ratting(comment.target.value)
            }}
          />
        </div>
        <div className={'button-group'}>
          <button
            className="point"
            onClick={async () => {
              if (!rating) return message.warning('???????????????????????????????????????')

              try {
                let updateResult = await axios.put(
                  process.env.REACT_APP_SERVER_ENDPOINT + '/api/repair_list/' + selectedRecord.id + '/update-rating',
                  {
                    rating: rating,
                    comment_rating: comment_ratting
                  },
                  { withCredentials: true }
                )
                if (updateResult?.data?.status) {
                  swal.fire({
                    title: '',
                    text: updateResult?.data?.message,
                    icon: 'success',
                    confirmButtonText: 'X'
                  })

                  props.setData(props.data.map((item) => (item.id === selectedRecord.id ? { ...selectedRecord, rating: rating } : item)))
                } else {
                  swal.fire({
                    title: '',
                    text: updateResult?.data?.message,
                    icon: 'error',
                    confirmButtonText: 'X'
                  })
                }
                setIsModelOpen(false)
              } catch (error) {
                if (error.response.status == 401) {
                  if (error.response.status == 401) {
                    // Swal.fire({
                    //   title: '??????????????????????????????????????????????????????????????????????????????????????????',
                    //   confirmButtonText: 'OK'
                    // }).then((result) => {
                    //   if (result.isConfirmed) {
                    window.location.href = '/login'
                    // }
                    // })
                  }
                }
              }
            }}>
            ????????????????????????
          </button>
        </div>
      </RatingModel>
    </>
  )
}
