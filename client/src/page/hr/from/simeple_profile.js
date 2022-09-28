import React, { useEffect, useState } from 'react'
import { Form, Input, Select, DatePicker } from 'antd';
import { useNavigate, useParams } from 'react-router'
import Navbar from '../../../components/navbar.compoenets';
import styled from 'styled-components';
import axios from 'axios';
import swal from 'sweetalert2'
import moment from 'moment'
import { Checkbox, Divider } from 'antd';


const FormHr_a = styled.div`
    border: 1px solid #e2e0e0;
    width: 1200px;
    margin: 0 auto;
    margin-top: 20px;
    background-color: #FFFF;

    .image-profile{
      width: 100%;
      margin-top: 10px;
      img{
        object-fit: contain;
      }
    }

    .ant-form{
        display: flex;
    }

    .ant-form-item.select-user{
      flex: inherit;
      width: 100%;
    }

    .ant-form-item{
        margin: 0;
        margin-top: 15px;
        .ant-form-item-label{
            display: flex;
            justify-content: center;
            align-items: center;

            background-color:#015352;
            label{
                &::before{
                    display: none;
                }
                padding: 0px 10px;
                color: #FFF;
            }
        }
    }

    .sel-branch{
        .ant-form-item-control{
            width: 200px;
        }
    }

    .form-button{
        width: 100%;
        margin-top: 20px;

        .ant-form-item-control-input-content{
            display: flex;
            justify-content: start;
        }
    }

    .form-item-description{
        width: 100%;
        textarea{
            height: 100px;
        }
    }

    .form-header{
        color: #FFF;
        text-align: center;
        background-color: #015352;
        font-size: 16px;
        font-weight:bold;
        padding:5px;
    }

    .ticket{
        padding: 8px;
        font-weight: bold;
        margin: 20px 15px 0px;
        width: 185px;
        background-color: #FD7D00;
        color: #FFF;
        border-radius: 10px;
    }

    .form-it-container{
        padding: 15px;
    }
    .form-item-tusername
    {
        width: 50%;
    }
    .form-item-nickname{
        width: 32%;

    }
    .form-item-tamneng{
      width: 33%;
    }
    .form-item-useraction{
      width: 100%;
    }
    .status_hr{
      width: 100%;
    }

    .button-submit{
        background-color: #015352;
        color: #FFF;
        border: none;
        padding: 7px;
        margin-right: 10px;
        border-radius: 5px;
    }
    .button-back{
        background-color: #015352;
        color: #FFF;
        border: none;
        padding: 7px;
        border-radius: 5px;
    }

`
const onChange = (checkedValues) => {
  console.log('checked = ', checkedValues);
};



const CheckboxGroupActionUser = styled(Checkbox.Group)`
  display: flex;
  flex-wrap: wrap;

  label{
    margin-top: 10px;
    width: 32%;
    font-size: 15px;
  }
`

const options = [
  {
    label: 'ขอเพิ่ม User-Window',
    value: 'ขอเพิ่ม User-Window',
  },
  {
    label: 'ขอเพิ่ม User-Collection/บัตรเข้าออกประตู',
    value: 'ขอเพิ่ม User-Collection/บัตรเข้าออกประตู',
  },
  {
    label: 'ขอเพิ่ม Email-Adress',
    value: 'ขอเพิ่ม Email-Adress',
  },
];
//รอทำ อาเรย์ ที่เป็นแบบ หลาย รายการ เพราะต้องเลือกหลาย ช่อง ทาง


export default function FromHr_a() {


  const [form] = Form.useForm()
  const history = useNavigate();
  const { id } = useParams()
  const [fileName, setFileName] = useState(null)
  // const { Option } = Select;

  useEffect(() => {
    const init = async () => {
      try {
        if (!id) return
        let hrSipple = await axios.get(process.env.REACT_APP_SERVER_ENDPOINT + '/api/hr/get-profile/' + id, { withCredentials: true })
        console.log(hrSipple)
        if (hrSipple.data.status) {
          let data = hrSipple.data.data
          data.start_date_work = data.start_date_work ? moment(data.start_date_work) : moment()
          data.sign_date_work = data.sign_date_work ? moment(data.sign_date_work) : moment()
          data.date_card_start = data.date_card_start ? moment(data.date_card_start) : moment()
          data.date_card_exp = data.date_card_exp ? moment(data.date_card_exp) : moment()
          if (data.action_user && data.action_user.length > 0) data.action_user = JSON.parse(data.action_user)
          form.setFieldsValue(data)
          setFileName(data?.img_simple)
          console.log(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    init()
  }, [])

  const onFinish = async (values) => {
    console.log("values => ", values)
    values.img_simple = fileName
    values.start_date_work = moment(values.start_date_work).format('YYYY-MM-DD')
    values.sign_date_work = moment(values.sign_date_work).format('YYYY-MM-DD')
    values.date_card_start = moment(values.date_card_start).format('YYYY-MM-DD')
    values.date_card_exp = moment(values.date_card_exp).format('YYYY-MM-DD')
    if (values.action_user.length > 0) values.action_user = JSON.stringify(values.action_user)

    try {

      let result = null

      if (id) {
        result = await axios.put(process.env.REACT_APP_SERVER_ENDPOINT + '/api/hr/update-profile/' + id, values, { withCredentials: true })
      } else {
        result = await axios.post(process.env.REACT_APP_SERVER_ENDPOINT + '/api/hr/create-profile', values, { withCredentials: true })
      }

      if (result.data.status) {
        swal
          .fire({
            title: "",
            text: result.data.message,
            icon: "success",
            confirmButtonText: "X",
          })
          .then((result) => {
            if (result.isConfirmed) {
              history("/hr");
            }
          });
      } else {
        swal
          .fire({
            title: "",
            text: result.data.message,
            icon: "error",
            confirmButtonText: "X",
          })
          .then((result) => {
            // if (result.isConfirmed) {
            //   history("/hr");
            // }
          });
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Navbar />
      <FormHr_a>
        <div className='form-header'>เพิ่มข้อมูลพนักงาน</div>
        <div className='form-it-container'>
          <Form className="it-form-wrapper" form={form} onFinish={onFinish} layout="inline" size="large">
            <Form.Item
              className='form-item-tusername'
              name={'name_th'}
              label={'Full-name(TH)'}
            >
              <Input placeholder="ระบุชื่อ-นามสกุล(th)" />
            </Form.Item>
            <Form.Item
              className='form-item-tusername'
              name={'name_en'}
              label={'Full-name(EN)'}
            >
              <Input placeholder="ระบุชื่อ-นามสกุล(en)" />
            </Form.Item>
            <Form.Item
              className='form-item-nickname'
              name={'nick_name'}
              label={'Nick-Name'}
            >
              <Input placeholder="ระบุชื่อเล่น" />
            </Form.Item>
            <Form.Item className="form-item-nickname" name={'start_date_work'} label={'วันเริ่มงาน'}>
              <DatePicker />
            </Form.Item>
            <Form.Item className="form-item-nickname" name={'sign_date_work'} label={'วันเซ็นสัญญา'}>
              <DatePicker />
            </Form.Item>
            <Form.Item
              className='form-item-tusername'
              name={'position'}
              label={'Position'}
            >
              <Input placeholder="ระบุตำแหน่ง" />
            </Form.Item>
            <Form.Item
              name={'department'}
              className='form-item-tusername'
              label={'Department'}
            >
              <Input placeholder="ระบุแผนก" />
            </Form.Item>

            <Form.Item
              className='form-item-description'
              name={'address'}
              label={'ที่อยู่ตามบัตรประชาชน'}
            >
              <Input.TextArea placeholder="ระบุที่อยู่" />
            </Form.Item>

            <Form.Item
              name={'idcard_no'}
              className='form-item-tusername'
              label={'เลขบัตรประชาชน'}
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกบัตรประชาชน'
                }
              ]}
            >
              <Input placeholder="ระบุเลขบัตรประชาชน" />
            </Form.Item>

            <Form.Item
              name={'phone'}
              className='form-item-tusername'
              label={'เบอร์มือถือ'}
            >
              <Input placeholder="ระบุเบอร์มือถือ" />
            </Form.Item>

            <Form.Item className="form-item-tusername" name={'date_card_start'} label={'วันออกบัตร'}>
              <DatePicker />
            </Form.Item>

            <Form.Item className="form-item-tusername" name={'date_card_exp'} label={'วันหมดอายุบัตร'}>
              <DatePicker />
            </Form.Item>

            <Form.Item
              name={'status_hr'}
              className={'form-item-tusername'}
              label={'Status'}
              rules={[
                {
                  required: true,
                  message: 'กรุณาเลือกสถานะ'
                }
              ]}>
              <Select placeholder="กรุณาเลือกสถานะ">
                <Select.Option value={'Pending'}>Pending</Select.Option>
                <Select.Option value={'Reject'}>Reject</Select.Option>
                <Select.Option value={'Postponed'}>Postponed</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name={'user_level'}
              className={'form-item-tusername'}
              label={'User-Level'}
              rules={[
                {
                  required: true,
                  message: 'กรุณาเลือกกำหนดเลเวล'
                }
              ]}>
              <Select placeholder="กรุณาเลือกเลเวล">
                <Select.Option value={'Collector'}>Collector</Select.Option>
                <Select.Option value={'Supervisor'}>Supervisor</Select.Option>
                <Select.Option value={'Manager'}>Manager</Select.Option>
                <Select.Option value={'Admin'}>Admin</Select.Option>
                <Select.Option value={'Lawyer'}>Lawyer</Select.Option>
                <Select.Option value={'Lawyer assistant'}>Lawyer assistant</Select.Option>
                <Select.Option value={'Execution'}>Execution</Select.Option>
                <Select.Option value={'Accounting & Finance'}>Accounting & Finance</Select.Option>
                <Select.Option value={'View Only'}>View Only</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name={'maihet'}
              className='form-item-useraction'
              label={'หมายเหตุ'}
            >
              <Input placeholder="หมายเหตุ" />
            </Form.Item>

            <Form.Item className="select-user" name='action_user' rules={[
              {
                required: true,
                message: 'กรุณาเลือกสถานะ'
              }
            ]}>
              <CheckboxGroupActionUser options={options} onChange={onChange} />
            </Form.Item>

            <Form.Item className="form-item-upload" label={'อัพโหลดรูปภาพ'}>
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
            {fileName && (
              <div className="image-profile">
                <img src={process.env.REACT_APP_SERVER_ENDPOINT + '/public/image/repair/' + fileName} width={400} height={400} />
              </div>
            )}

            <Form.Item className='form-button'>
              <button className="button-submit" type="submit">
                ➤ SAVE
              </button>
              <button className="button-back" onClick={() => {
                history('/hr')
              }}>
                ◀ HOME
              </button>
            </Form.Item>
          </Form>
        </div>
      </FormHr_a>

    </>
  )
}
