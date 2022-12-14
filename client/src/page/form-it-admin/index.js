import React, { useEffect, useState } from 'react'
import { Form, Input, Select, DatePicker } from 'antd'
import { useNavigate, useParams } from 'react-router'
import styled from 'styled-components'
import Navbar from '../../components/navbar.compoenets'
import axios from 'axios'
import moment from 'moment'
import swal from 'sweetalert2'
import { BsPersonPlusFill } from 'react-icons/bs'

const FormItComponent = styled.div`
  width: 1200px;
  margin: 0 auto;
  margin-top: 20px;

  .ant-form {
    display: flex;
  }

  .ant-form-item {
    margin: 0;
    margin-top: 15px;
    .ant-form-item-label {
      background-color: #6c757d;
      label {
        &::before {
          display: none;
        }
        padding: 0px 10px;
        color: #fff;
      }
    }
  }

  .sel-branch {
    .ant-form-item-control {
      width: 200px;
    }
  }

  .form-button {
    width: 100%;
    margin-top: 10px;

    .button-submit {
      background-color: #015352;
      color: #fff;
      border: none;
      padding: 7px;
      margin-right: 10px;
      border-radius: 5px;
    }
    .button-back {
      background-color: #015352;
      color: #fff;
      border: none;
      padding: 7px;
      border-radius: 5px;
    }

    .ant-form-item-control-input-content {
      display: flex;
      justify-content: start;
    }
  }

  .form-header {
    margin-left: 10px;
    font-weight: bold;
    font-size: 17px;
    color: #015352;
  }

  .ticket {
    text-align: center;
    font-weight: bold;
  }

  .form-it-container {
    padding: 10px;
  }
  .form-item-ticket,
  .form-item-date,
  .TUserName,
  .ExtNo,
  .form-item-ip,
  .form-item-dep {
    width: 33%;
  }

  .form-item-description {
    width: 99%;
  }

  .sel-topics {
    width: 38%;
  }
  .sel-status {
    width: 34%;
  }

  .form-item-comment {
    width: 99%;
  }

  .sel-expences {
    width: 29%;
  }

  .image-repair {
    margin-top: 10px;
    width: 100%;
  }

  .head-user {
    width: 100%;
    padding: 5px;
    background-color: #6169d0;
    color: #fff;

    .icon-head {
      font-size: 20px;
      top: 4px;
      position: relative;
      margin-left: 5px;
    }
  }

  .user,
  .admin {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    border: 1px solid #e2e0e0;
    background-color: #fff;
    box-shadow: 0px 0px 13px 0px rgb(82 63 105 / 20%);
    .title {
      width: 100%;
      border: 1px solid black;
    }
  }
  .user {
    margin-bottom: 10px;
  }
`

export default function FormItAdmin() {
  const [expences, setExpences] = useState([])
  const [status, setStatus] = useState([])
  const [topics, setTopics] = useState([])
  const [fileName, setFileName] = useState(null)
  const { id } = useParams()
  const [form] = Form.useForm()
  const history = useNavigate()

  useEffect(() => {
    const init = async () => {
      try {
        let repaireData = await axios.get(process.env.REACT_APP_SERVER_ENDPOINT + '/api/repair_list/it/' + id, { withCredentials: true })
        let datetime = repaireData.data.data[0].close_date
        repaireData.data.data[0].close_date = datetime ? moment(datetime) : moment()
        repaireData.data.data[0].close_time = datetime ? moment(datetime) : moment()
        if (repaireData.data.status) {
          let data = repaireData.data.data[0]
          form.setFieldsValue(data)
          setFileName(data?.img_repair)
          if (data.admin_name == null) {
            let userData = await axios.get(process.env.REACT_APP_SERVER_ENDPOINT + '/api/user/profile', { withCredentials: true })
            if (userData.data.status) {
              let admin_name = userData.data.data.TUserName
              form.setFieldsValue({ admin_name: admin_name })
            }
          }
        }

        let expencesData = await axios.get(process.env.REACT_APP_SERVER_ENDPOINT + '/api/m/expences', { withCredentials: true })
        setExpences(expencesData.data.data)
        let topicData = await axios.get(process.env.REACT_APP_SERVER_ENDPOINT + '/api/m/topic?type_id=1', {
          withCredentials: true
        })
        setTopics(topicData.data.data)
        let statusData = await axios.get(process.env.REACT_APP_SERVER_ENDPOINT + '/api/m/status', {
          withCredentials: true
        })
        setStatus(statusData.data.data)
      } catch (error) {
        if (error.response.status == 401) {
          window.location.href = '/login'
        }
      }
    }
    init()
  }, [])

  const onFinish = async (values) => {
    values.img_repair = fileName
    values.close_date = moment(values.close_date).format('YYYY-MM-DD') + ' ' + moment(values.close_time).format('HH:mm:ss')
    delete values.close_time

    try {
      let response = await axios.put(process.env.REACT_APP_SERVER_ENDPOINT + '/api/repair_list/it/' + id, values, { withCredentials: true })
      if (response.data.status) {
        swal
          .fire({
            title: '',
            text: response.data.message,
            icon: 'success',
            confirmButtonText: 'X'
          })
          .then((result) => {
            if (result.isConfirmed) {
              history('/repair?tab=1')
            }
          })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Navbar />
      <FormItComponent className="form-it">
        {/* <div className="h1 form-header">UPDATE RECORD IT</div> */}
        <div className="form-header">UPDATE-RECORD BY IT</div>
        <div className="form-it-container">
          <Form className="it-form-wrapper" form={form} onFinish={onFinish} layout="inline" size="large">
            <div className="head-user">
              <BsPersonPlusFill className="icon-head" />
              &nbsp;&nbsp;&nbsp;?????????????????????????????????????????? - USER
            </div>
            <div className="user">
              {/* <div className="title">
                User
              </div> */}
              <Form.Item className="form-item-ticket" name={'ticket_no'} label={'Ticket'}>
                <Input readOnly />
              </Form.Item>
              <Form.Item className="form-item-date" name={'create_date'} label={'??????????????????????????????????????????'}>
                <Input readOnly />
              </Form.Item>
              <Form.Item className="TUserName" name={'TUserName'} label={'???????????????????????????'}>
                <Input readOnly />
              </Form.Item>
              <Form.Item className="ExtNo" name={'ExtNo'} label={'?????????????????????????????????'}>
                <Input readOnly />
              </Form.Item>
              <Form.Item className="form-item-ip" name={'ip'} label={'IP ?????????????????????'}>
                <Input readOnly />
              </Form.Item>
              <Form.Item className="form-item-dep" name={'branch'} label={'????????????????????????'}>
                <Input readOnly />
              </Form.Item>
              <Form.Item className="form-item-description" name={'description'} label={'??????????????????????????????????????????????????????'}>
                <Input.TextArea readOnly />
              </Form.Item>
            </div>

            <div className="head-user">
              <BsPersonPlusFill className="icon-head" />
              &nbsp;&nbsp;&nbsp;??????????????????????????????????????? Admin
            </div>
            <div className="admin">
              <Form.Item className="form-item-TUserName" name={'admin_name'} label={'It-Support'}>
                <Input readOnly />
              </Form.Item>
              <Form.Item
                name={'topic_id'}
                className={'sel-topics'}
                label={'???????????????????????????????????????'}
                rules={[
                  {
                    required: true,
                    message: '?????????????????????????????????????????????????????????????????????'
                  }
                ]}>
                <Select className="sel-topics1" placeholder="?????????????????????????????????????????????????????????????????????">
                  {topics.map((topics) => {
                    return (
                      <Select.Option key={topics.id} value={topics.id}>
                        {topics.name}
                      </Select.Option>
                    )
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name={'status_id'}
                className={'sel-status'}
                label={'Status'}
                rules={[
                  {
                    required: true,
                    message: '?????????????????????????????????????????????'
                  }
                ]}>
                <Select className="sel-status1" placeholder="?????????????????????????????????????????????">
                  {status.map((status) => {
                    return (
                      <Select.Option key={status.id} value={status.id}>
                        {status.name}
                      </Select.Option>
                    )
                  })}
                </Select>
              </Form.Item>
              <Form.Item className="form-item-comment" name={'comment'} label={'Comment'}>
                <Input.TextArea />
              </Form.Item>
              <Form.Item className="form-item-remark" name={'remark'} label={'????????????????????????'}>
                <Input />
              </Form.Item>
              <Form.Item
                name={'expence_id'}
                className={'sel-expences'}
                label={'??????????????????'}
                rules={[
                  {
                    required: true,
                    message: '????????????????????????????????????????????????'
                  }
                ]}>
                <Select className="sel-expences1" placeholder="????????????????????????????????????????????????">
                  {expences.map((expences) => {
                    return (
                      <Select.Option key={expences.id} value={expences.id}>
                        {expences.name}
                      </Select.Option>
                    )
                  })}
                </Select>
              </Form.Item>
              <Form.Item className="form-item-close-date" name={'close_date'} label={'?????????????????????????????????'}>
                <DatePicker />
              </Form.Item>
              <Form.Item className="form-item-close-time" name={'close_time'} label={'???????????????????????????'}>
                <DatePicker picker="time" />
              </Form.Item>
              <Form.Item className="form-item-upload" label={'???????????????????????????????????????'}>
                <input
                  type={'file'}
                  onChange={async (e) => {
                    try {
                      let formData = new FormData()
                      formData.append('image', e.target.files[0])

                      let resUpload = await axios.post(process.env.REACT_APP_SERVER_ENDPOINT + '/api/upload/repair', formData, { withCredentials: true })
                      if (resUpload?.data?.status) {
                        setFileName(resUpload?.data?.data?.filename)
                        swal.fire({
                          title: '',
                          text: resUpload?.data?.message,
                          icon: 'success',
                          confirmButtonText: 'X'
                        })
                      } else {
                        swal.fire({
                          title: '',
                          text: resUpload?.data?.message,
                          icon: 'error',
                          confirmButtonText: 'X'
                        })
                      }
                    } catch (error) {
                      if (error.response.status == 401) {
                        window.location.href = '/login'
                      }
                    }
                  }}
                />
              </Form.Item>
            </div>
            {fileName && (
              <div className="image-repair">
                <img src={process.env.REACT_APP_SERVER_ENDPOINT+'/public/image/repair/' + fileName} width={200} height={200} />
              </div>
            )}
            <Form.Item className="form-button">
              <button className="button-submit" type="submit">
                ??? SAVE
              </button>
              <button
                className="button-back"
                onClick={() => {
                  history('/repair?tab=1')
                }}>
                ??? HOME
              </button>
            </Form.Item>
          </Form>
        </div>
      </FormItComponent>
    </>
  )
}
