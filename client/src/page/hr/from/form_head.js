import React, { useEffect, useState } from 'react'
import { Form, Input, Select, DatePicker } from 'antd';
import { useNavigate, useParams } from 'react-router'
import Navbar from '../../../components/navbar.compoenets';
import styled from 'styled-components';
import axios from 'axios';
import swal from 'sweetalert2'
import moment from 'moment'
import { Checkbox } from 'antd';

const Form_app_head = styled.div`
    border: 1px solid #e2e0e0;
    width: 1200px;
    margin: 0 auto;
    margin-top: 20px;
    background-color: #FFFF;
    margin-bottom: 10px;

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

    .form-button{
        width: 100%;
        margin: 20px 10px;

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

    .form-it-container{
        .name-head{
            width: 100%;
            padding: 5px;
            background-color: #6169d0;
            color: #fff;
            font-size: 15px;
            font-weight: bold;
        }

        .head-hr,.it-app{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            padding: 10px;
           
            .form-item-tusername ,.form-item-eusername,.form-item-nickname,.status-it
            {
                width: 50%;
            }
            .form-item-nickname{
                width: 32%;
            }
            .form-item-useraction{
                width: 100%;
            }
            
            .status_hr{
                display: none;
            }
        }

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

export default function Form_App_head() {

    const [form] = Form.useForm()
    const history = useNavigate();
    const { id } = useParams()
    const [fileName, setFileName] = useState(null)

    useEffect(() => {
        const init = async () => {
            try {
                let hrSipple = await axios.get(process.env.REACT_APP_SERVER_ENDPOINT + '/api/hr/get-profile/' + id, { withCredentials: true })
                console.log(hrSipple)
                if (hrSipple.data.status) {
                    let data = hrSipple.data.data
                    data.start_date_work = data.start_date_work ? moment(data.start_date_work) : moment()
                    data.sign_date_work = data.sign_date_work ? moment(data.sign_date_work) : moment()
                    data.date_card_start = data.date_card_start ? moment(data.date_card_start).format('YYYY-MM-DD') : ''
                    data.date_card_exp = data.date_card_exp ? moment(data.date_card_exp).format('YYYY-MM-DD') : ''
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
        values.img_simple = fileName
        try {
            let result = await axios.put(process.env.REACT_APP_SERVER_ENDPOINT + '/api/hr/put-app-head/' + id, values, { withCredentials: true })

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
            <Form_app_head>
                {/* <div className='form-header'>เพิ่มข้อมูลพนักงาน</div> */}
                <div className='form-it-container'>
                    <Form className="it-form-wrapper" form={form} onFinish={onFinish} layout="inline" size="large">
                        <div className='name-head'>ฝ่าย Recruit</div>
                        <div className='head-hr'>
                            <Form.Item
                                className='form-item-tusername'
                                name={'name_th'}
                                label={'Full-name(TH)'}
                            >
                                <Input placeholder="ระบุชื่อ-นามสกุล(th)" readOnly />
                            </Form.Item>
                            <Form.Item
                                className='form-item-tusername'
                                name={'name_en'}
                                label={'Full-name(EN)'}
                            >
                                <Input placeholder="ระบุชื่อ-นามสกุล(en)" readOnly />
                            </Form.Item>
                            <Form.Item
                                className='form-item-nickname'
                                name={'nick_name'}
                                label={'Nick-Name'}
                            >
                                <Input placeholder="ระบุชื่อเล่น" readOnly />
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
                                <Input placeholder="ระบุตำแหน่ง" readOnly />
                            </Form.Item>
                            <Form.Item
                                name={'department'}
                                className='form-item-tusername'
                                label={'Department'}
                            >
                                <Input placeholder="ระบุแผนก" readOnly />
                            </Form.Item>

                            <Form.Item
                                className='form-item-description'
                                name={'address'}
                                label={'ที่อยู่ตามบัตรประชาชน'}
                            >
                                <Input.TextArea placeholder="ระบุที่อยู่" readOnly />
                            </Form.Item>

                            <Form.Item
                                name={'idcard_no'}
                                className='form-item-tusername'
                                label={'เลขบัตรประชาชน'}
                            >
                                <Input placeholder="ระบุเลขบัตรประชาชน" readOnly />
                            </Form.Item>

                            <Form.Item
                                name={'phone'}
                                className='form-item-tusername'
                                label={'เบอร์มือถือ'}
                            >
                                <Input placeholder="ระบุเบอร์มือถือ" readOnly />
                            </Form.Item>

                            <Form.Item
                                name={'date_card_start'}
                                className='form-item-tusername'
                                label={'วันออกบัตร'}
                            >
                                <Input placeholder="ระบุวันออกบัตร" readOnly />
                            </Form.Item>

                            <Form.Item
                                name={'date_card_exp'}
                                className='form-item-tusername'
                                label={'วันหมดอายุบัตร'}
                            >
                                <Input placeholder="ระบุวันหมดอายุบัตร" readOnly />
                            </Form.Item>

                            <Form.Item
                                name={'status_hr'}
                                className={'status_hr'}
                                label={'Status'}
                            >
                                <Select placeholder="กรุณาเลือกสถานะ">
                                    <Select.Option value={'Pending'}>Pending</Select.Option>
                                    <Select.Option value={'Reject'}>Reject</Select.Option>
                                    <Select.Option value={'Postponed'}>Postponed</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name={'maihet'}
                                className='form-item-useraction'
                                label={'หมายเหตุ'}
                            >
                                <Input placeholder="หมายเหตุ" readOnly />
                            </Form.Item>

                            <Form.Item
                                name={'user_level'}
                                className={'form-item-useraction'}
                                label={'User-Level'}
                            >
                                <Select placeholder="กรุณาเลือกเลเวล">
                                    <Select.Option value={'C'}>C</Select.Option>
                                    <Select.Option value={'S'}>S</Select.Option>
                                    <Select.Option value={'M'}>M</Select.Option>
                                    <Select.Option value={'A'}>A</Select.Option>
                                    <Select.Option value={'L'}>L</Select.Option>
                                    <Select.Option value={'LA'}>LA</Select.Option>
                                    <Select.Option value={'K'}>K</Select.Option>
                                    <Select.Option value={'E'}>E</Select.Option>
                                    <Select.Option value={'I'}>I</Select.Option>
                                    <Select.Option value={'F'}>F</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item className="select-user" name='action_user' >
                                <CheckboxGroupActionUser options={options} defaultValue={['1']} onChange={onChange} />
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

                        </div>

                        <div className='name-head'>ฝ่าย People-Head</div>
                        <div className='it-app'>
                            <Form.Item
                                name={'status_head'}
                                className={'status-it'}
                                label={'Status'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณาเลือกหมวดหมู่'
                                    }
                                ]}>
                                <Select placeholder="กรุณาเลือกหมวดหมู่">
                                    <Select.Option value={'Approve'}>Approve</Select.Option>
                                    <Select.Option value={'Reject'}>Reject</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name={'sign_head'}
                                className='status-it'
                                label={'name-hr'}
                            >
                                <Input placeholder="ชื่อพนักงานทำสัญญา" />
                            </Form.Item>

                            <Form.Item
                                name={'maihet_head'}
                                className='form-item-useraction'
                                label={'หมายเหตุ-หัวหน้า'}
                            >
                                <Input placeholder="หมายเหตุ-หัวหน้า" />
                            </Form.Item>

                        </div>

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
            </Form_app_head>
        </>
    )
}
