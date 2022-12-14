import React, { useEffect, useState } from 'react'
import { Form, Input, Select, DatePicker } from 'antd';
import { useNavigate, useParams } from 'react-router'
import Navbar from '../../../components/navbar.compoenets';
import styled from 'styled-components';
import axios from 'axios';
import swal from 'sweetalert2'
import moment from 'moment'
import { Checkbox, Divider } from 'antd';

const Form_app_it = styled.div`
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
            .form-item-useraction{
                width: 100%;
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
        label: '????????????????????? User-Window',
        value: '????????????????????? User-Window',
    },
    {
        label: '????????????????????? User-Collection/????????????????????????????????????????????????',
        value: '????????????????????? User-Collection/????????????????????????????????????????????????',
    },
    {
        label: '????????????????????? Email-Adress',
        value: '????????????????????? Email-Adress',
    },
];

export default function Form_App_it() {

    const [form] = Form.useForm()
    const history = useNavigate();
    const { id } = useParams()

    useEffect(() => {
        const init = async () => {
            try {
                let hrSipple = await axios.get(process.env.REACT_APP_SERVER_ENDPOINT + '/api/hr/get-profile/' + id, { withCredentials: true })
                console.log(hrSipple)
                if (hrSipple.data.status) {
                    let data = hrSipple.data.data
                    data.start_date_work = data.start_date_work ? moment(data.start_date_work) : moment()
                    data.sign_date_work = data.sign_date_work ? moment(data.sign_date_work) : moment()
                    if (data.action_user && data.action_user.length > 0) data.action_user = JSON.parse(data.action_user)
                    form.setFieldsValue(data)
                    console.log(data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        init()
    }, [])


    const onFinish = async (values) => {

        try {
            let result = await axios.put(process.env.REACT_APP_SERVER_ENDPOINT + '/api/hr/put-app-it/' + id, values, { withCredentials: true })

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
            <Form_app_it>
                {/* <div className='form-header'>??????????????????????????????????????????????????????</div> */}
                <div className='form-it-container'>
                    <Form className="it-form-wrapper" form={form} onFinish={onFinish} layout="inline" size="large">
                        <div className='name-head'>???????????? Recruit</div>
                        <div className='head-hr'>
                            <Form.Item
                                className='form-item-tusername'
                                name={'name_th'}
                                label={'Full-name(TH)'}
                            >
                                <Input placeholder="????????????????????????-?????????????????????(th)" />
                            </Form.Item>

                            <Form.Item
                                className='form-item-eusername'
                                name={'name_en'}
                                label={'Full-name(EN)'}
                            >
                                <Input placeholder="????????????????????????-?????????????????????(en)" />
                            </Form.Item>

                            <Form.Item className="form-item-nickname" name={'start_date_work'} label={'?????????????????????????????????'}>
                                <DatePicker />
                            </Form.Item>
                            <Form.Item className="form-item-nickname" name={'sign_date_work'} label={'????????????????????????????????????'}>
                                <DatePicker />
                            </Form.Item>

                            <Form.Item
                                className='form-item-tusername'
                                name={'position'}
                                label={'Position'}
                            >
                                <Input placeholder="?????????????????????????????????" />
                            </Form.Item>
                            <Form.Item
                                name={'department'}
                                className='form-item-tusername'
                                label={'Department'}
                            >
                                <Input placeholder="????????????????????????" />
                            </Form.Item>


                            <Form.Item
                                name={'maihet'}
                                className='form-item-useraction'
                                label={'????????????????????????'}
                            >
                                <Input placeholder="????????????????????????" />
                            </Form.Item>

                            <Form.Item className="select-user" name='action_user' >
                                <CheckboxGroupActionUser options={options} defaultValue={['1']} onChange={onChange} />
                            </Form.Item>

                        </div>

                        <div className='name-head'>???????????? IT-Support</div>
                        <div className='it-app'>
                            <Form.Item
                                name={'status_it'}
                                className={'status-it'}
                                label={'Status'}
                                rules={[
                                    {
                                        required: true,
                                        message: '??????????????????????????????????????????????????????'
                                    }
                                ]}>
                                <Select placeholder="??????????????????????????????????????????????????????">
                                    <Select.Option value={'Approve'}>Approve</Select.Option>
                                    <Select.Option value={'Reject'}>Reject</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name={'sign_it'}
                                className='status-it'
                                label={'name-it'}
                            >
                                <Input placeholder="?????????????????????????????????????????????????????????" />
                            </Form.Item>

                            {/* <Form.Item
                                name={'it_maihet'}
                                className='form-item-useraction'
                                label={'maihet'}
                            >
                                <Input placeholder="????????????????????????" />
                            </Form.Item> */}
                        </div>

                        <Form.Item className='form-button'>
                            <button className="button-submit" type="submit">
                                ??? SAVE
                            </button>
                            <button className="button-back" onClick={() => {
                                history('/hr')
                            }}>
                                ??? HOME
                            </button>
                        </Form.Item>
                    </Form>
                </div>
            </Form_app_it>
        </>
    )
}
