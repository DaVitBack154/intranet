import React, { useEffect, useState } from 'react'
import { Form, Input, Select, DatePicker } from 'antd';
import { useNavigate, useParams } from 'react-router'
import Navbar from '../../../components/navbar.compoenets';
import styled from 'styled-components';
import axios from 'axios';
import swal from 'sweetalert2'
import moment from 'moment'


const AdduserProfile = styled.div`
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

    .form-header{
        color: #FFF;
        text-align: center;
        background-color: #015352;
        font-size: 16px;
        font-weight:bold;
        padding:5px;
    }

    .body-adduser{
        padding: 20px;
    }      

    .form-item-tusername{
        width: 50%;
    } 
    .form-item-product,.form-item-userid{
        width: 25%;
    }
    .form-item-select{
        width: 100%;
    }  
       
    .form-button{
        width: 100%;
        margin-top: 20px;

        .ant-form-item-control-input-content{
            display: flex;
            justify-content: start;
        }
    }
  
`;

// const onChange = (checkedValues) => {
//     console.log('checked = ', checkedValues);
// };

///รอ ยังไม่ได้ใช้


export default function Adduser() {
    const [form] = Form.useForm()
    const history = useNavigate();
    const { id } = useParams()

    useEffect(() => {
        const init = async () => {
            try {
                let hrAdduser = await axios.get(process.env.REACT_APP_SERVER_ENDPOINT + '/api/hr/get-adduser/' + id, { withCredentials: true })
                console.log(hrAdduser)
                if (hrAdduser.data.status) {
                    let data = hrAdduser.data.data
                    form.setFieldsValue(data)
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
        try {
            let result = await axios.put(process.env.REACT_APP_SERVER_ENDPOINT + '/api/hr/put-adduser/' + id, values, { withCredentials: true })

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
            <AdduserProfile>
                <div className='form-header'>Add User Identification</div>
                <div className="body-adduser">
                    <Form className="it-form-wrapper" form={form} onFinish={onFinish} layout="inline" size="large">
                        <Form.Item
                            className='form-item-tusername'
                            name={'name_th'}
                            label={'Full-name(TH)'}
                        >
                            <Input placeholder="ระบุชื่อ-นามสกุล(th)" />
                        </Form.Item>

                        <Form.Item
                            className='form-item-product'
                            name={'product'}
                            label={'Product/Br'}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            className='form-item-userid'
                            name={'user_id'}
                            label={'UserID'}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            className='form-item-tusername'
                            name={'name_en'}
                            label={'Full-name(EN)'}
                        >
                            <Input placeholder="ระบุชื่อ-นามสกุล(EN)" />
                        </Form.Item>
                        <Form.Item
                            className='form-item-tusername'
                            name={'ext_no'}
                            label={'Ext.No'}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            className='form-item-select'
                            name={'action_user'}
                            label={'รายการ select'}
                        >
                            <Input />
                        </Form.Item>


                        <Form.Item
                            className='form-item-tusername'
                            name={'agent_adduser'}
                            label={'ลงชื่อ-ผู้ขออนุมัติ'}
                        >
                            <Input placeholder="ระบุชื่อ-ผู้ขออนุมัติ" />
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

            </AdduserProfile>
        </>
    )
}
