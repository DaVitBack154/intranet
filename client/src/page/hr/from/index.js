import React, { useEffect, useState } from 'react'
import { Form, Input, Select, DatePicker } from 'antd';
import { useNavigate } from 'react-router'
import Navbar from '../../../components/navbar.compoenets';
import styled from 'styled-components';
import axios from 'axios';
import swal from 'sweetalert2'
import moment from 'moment'

const FormHr_a = styled.div`
    border: 1px solid #e2e0e0;
    width: 1200px;
    margin: 0 auto;
    margin-top: 50px;
    background-color: #FFFF;

    .ant-form{
        display: flex;
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
    .form-item-tamneng{
      width: 33%;
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

export default function FromHr_a() {


  const [form] = Form.useForm()
  const history = useNavigate();

  const onFinish = async (values) => {
    // values.start_date_work = moment(values.start_date_work).format('YYYY-MM-DD')

    try {
      let result = await axios.post(process.env.REACT_APP_SERVER_ENDPOINT + '/api/hr/create-profile', values, { withCredentials: true })

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
              className='form-item-tusername'
              name={'nick_name'}
              label={'Nick-Name'}
            >
              <Input placeholder="ระบุชื่อเล่น" />
            </Form.Item>

            <Form.Item className="form-item-tusername" name={'start_date_work'} label={'Start-Work'}>
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
              name={'note'}
              label={'Note'}
            >
              <Input.TextArea placeholder="หมายเหตุ" />
            </Form.Item>

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
