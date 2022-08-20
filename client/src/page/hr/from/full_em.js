import React, { useEffect, useState } from 'react'
import { Form, Input, Select, DatePicker } from 'antd';
import { useNavigate, useParams } from 'react-router'
import Navbar from '../../../components/navbar.compoenets';
import styled from 'styled-components';
import axios from 'axios';
import swal from 'sweetalert2'
import moment from 'moment'

const FormHr_Full = styled.div`
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
///รอ ยังไม่ได้ใช้
export default function Full_em() {
    const [form] = Form.useForm()
    const history = useNavigate();
    const { id } = useParams()

    useEffect(() => {
        const init = async () => {
            try {
                let hrData = await axios.get(process.env.REACT_APP_SERVER_ENDPOINT + '/api/hr/get-fullprofile/' + id, { withCredentials: true })
                console.log(hrData)
                if (hrData.data.status) {
                    let data = hrData.data.data
                    data.start_date_work = data.start_date_work ? moment(data.start_date_work) : moment()
                    form.setFieldsValue(data)
                } else {

                }
            } catch (error) {
                if (error.response.status == 401) {
                    window.location.href = '/login'
                }
            }
        }
        init()

    }, [])




    const onFinish = async (values) => {
        values.start_date_work = values.start_date_work ? moment(values.start_date_work).format('YYYY-MM-DD') : null
        console.log(values)
        try {
            let result = await axios.put(process.env.REACT_APP_SERVER_ENDPOINT + '/api/hr/put-fullprofile/' + id, values, { withCredentials: true })

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
            <FormHr_Full>
                <div className='form-header'>เพิ่มข้อมูลพนักงาน-แบบเต็ม</div>
                <div className='form-it-container'>
                    <Form className="it-form-wrapper" form={form} onFinish={onFinish} layout="inline" size="large">

                        <Form.Item
                            className='form-item-tusername'
                            name={'employee_no'}
                            label={'Emp-Number'}
                        >
                            <Input placeholder="รหัสพนักงาน" />
                        </Form.Item>

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

                        <Form.Item
                            className='form-item-tusername'
                            name={'idcard_no'}
                            label={'เลขบัตรประชาชน'}
                        >
                            <Input placeholder="ระบุเลขบัตรประชาชน" />
                        </Form.Item>

                        <Form.Item
                            className='form-item-tusername'
                            name={'bird_day'}
                            label={'วัน/เดือน/ปี'}
                        >
                            <Input placeholder="ระบุวันเดือนปีเกิด" />
                        </Form.Item>

                        <Form.Item
                            name={'social_security'}
                            className={'form-item-tusername'}
                            label={'ประกันสังคม'}
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาเลือกหมวดหมู่ปัญหา'
                                }
                            ]}>
                            <Select placeholder="กรุณาเลือกหมวดประกันสังคม">
                                <Select.Option value={'มี'}>มี</Select.Option>
                                <Select.Option value={'ไม่มี'}>ไม่มี</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            className='form-item-tusername'
                            name={'name_hospital'}
                            label={'ชื่อโรงพยาบาล'}
                        >
                            <Input placeholder="ระบุชื่อโรงพยาบาล" />
                        </Form.Item>

                        <Form.Item
                            className='form-item-tusername'
                            name={'acc_no'}
                            label={'เลขบัญชีธนาคาร'}
                        >
                            <Input placeholder="ระบุชื่อเลขที่บัญชีธนาคาร" />
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
                            name={'branch'}
                            className='form-item-tusername'
                            label={'สังกัด'}
                        >
                            <Input placeholder="ระบุสังกัด" />
                        </Form.Item>

                        <Form.Item
                            name={'phone'}
                            className='form-item-tusername'
                            label={'โทรศัพท์'}
                        >
                            <Input placeholder="ระบุเบอร์โทรศัพท์" />
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
            </FormHr_Full>

        </>


    )
}
