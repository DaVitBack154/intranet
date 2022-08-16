import styled from "styled-components"
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';
import SideBarComponent from "../components/sidebar.components";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from '../components/table'
import { MdEmail } from 'react-icons/md'



const HomepageComponent = styled.div`
  display: flex;
  background-color: transparent;

  .content {
    width: 100%;
  }
  .sidebar-trigger-button {
    color: #fff;
  }
`;
const Contentportal = styled.div`
  background-color: transparent;

  .content-group-button {
    display: flex;
    width: 100%;
    background-color: #F2F6F6;
    

    .item-button {
      cursor: pointer;
      width: 200px;
      height: 150px;
      border: 1px solid lightgray;
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      border-radius: 30px;
      box-shadow: 10px 5px 5px 0px rgba(0, 0, 0, 0.75);

      .item-button-name {
        color: #000;
      }
      .item-button-icon {
        font-size: 30px;
        color: #000;
      }
    }
  }
     .name-card{
         font-weight: bold;
     }
     .position{
         color: #FD7D00;
     }
     
     .back-group-team{
      background-color: #F2F2F2;
      padding-top: 10px;
     
      /* border: 1px solid #015352; */
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); 
     

      .head-member{
      text-align: center;
      font-size: 32px;
      font-weight: bold;
      color:#015352;
      }

      .button-group{
         display: flex;
         justify-content: space-evenly;
         margin-top:35px;

         .item{
          width: 12%;
          padding: 10px;
          text-align: center;
          font-weight: bold;
          color: #000;
          transition: 0.25s ease;
          cursor: pointer;
         }

        .item:hover,
        .group{
          color: #FFF;
         background-color: #E12454;
        }
      }

      .department-team{
        padding: 15px;
       
        .table-team{
          padding: 10px;
        
        
        }
        .ant-table-thead > tr > th {
          font-weight: bold;
          background-color: #001529;
          color: #ffff;
          white-space: nowrap;
        }
        
      }

     }
     
     hr{
      border: 1px solid red;
      background-color: red;
      height: 2px;
      width: 60px;
      position: relative;
      top: -13px;
     }

     .border-step{
      margin-top: 30px;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
      
        .flex-step{
          display: flex;
          padding: 5px;

            .img-step{
              
              width: 50%;
                .step{
                  width: 100%;
                }
            }
            .detail-step{
              
              width: 50%;
              padding: 20px;
              background-color: #015352;
              color:#FFFF;
              .lag{
                font-size: 25px;
                text-align: center;
              }
            }
        }
     }
     .img-brand{
      width: 100%;
      height: 280px;
      color: '#fff',
     }
`;


const HeadCard = styled.div`
  margin-top: 30px;
  .border-agent{
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    background-color: #FFFF;

    .head-agent{

        .executive{
          font-size: 30px;
          font-weight: bold;
          color: #015352;
          text-align: center;
          padding: 15px 10px;
        }
    }
    

    .body-agent{
      .box1-agent-flex,.box2-agent-flex{
        display: flex;

          .box1, .box2, .box3, .box4{
          width: 50%;
          display: flex;
          height: 300px;
          padding: 10px;
          border: 1px solid #e2e0e0;
          

            .img{
             
              width: 37%;
              display: flex;
              justify-content: center;
              
                .img-card{
                  width:220px;
                  height: 290px;
                  border-radius: 50%;
                  padding: 10px 10px;
  
                }
            }
            .text{
              width: 60%;
              padding: 15px;
             
              .border-text{
                
              }
              
              .name-agen{
                font-weight: bold;
                color: #2C4964;
              }
              .name-agen-k{
                font-weight: bold;
                color: #2C4964;
                font-size: 25px;
              }
              .position-agen{
                color: #FD7D00;
                position: relative;
                top: -15px;
              }
              .card-agent{
                width: 25px;
                background-color: #2C4964;
                border: none;
                position: relative;
                left: -165px;
                top: -40;
              }
              .email{
                display: flex;
                .icon-mail{
                  font-size: 30px;
                }
                .name-mail{
                  font-size: 20px;
                  position: relative;
                  top: 1px;
                  margin-left: 20px;
                }
                
              }

              
            }
          }
      }
      
    }
  }
  
  
`

const Profileim = styled.div`
  border-radius: 50px;
  display: flex;
  justify-content: center;
  width:80px;
  height: 60px;
  margin-left: 10px;

  .img-pro{
    border-radius: 50px;
  }
   
`

export default function HomePage() {

  const [userData, setUserData] = useState([]);
  const [dep_id, setdep_id] = useState(1)

  const columns = [
    {
      title: 'Profile',
      dataIndex: 'image',
      width: 150,
      align: 'center',
      render: (_, record) => (
        <Profileim>
          {/* <div className="img-pro"></div> */}
          <img className="img-pro" alt="example" src={process.env.REACT_APP_SERVER_ENDPOINT + "/public/image/employee/" + record.image} />
        </Profileim>
      )
    },
    {
      title: 'Name-Surname',
      dataIndex: 'TUserName',
    },
    {
      title: 'Nick-Name',
      dataIndex: 'nickname',
      align: 'center',
    },
    {
      title: 'Position',
      dataIndex: 'Position',
    },
    {
      title: 'Telephone',
      dataIndex: 'ExtNo',
      width: 200,
      align: 'center',
    },
  ]

  useEffect(() => {
    const init = async () => {
      let params = {
        type_dep: dep_id,
      }

      let employeeResp = await axios.get(
        process.env.REACT_APP_SERVER_ENDPOINT + "/api/user/employee",
        {
          params: params,
          withCredentials: true,
        }
      );
      if (employeeResp?.data?.status) {
        setUserData(employeeResp.data.data);
      }
    }

    init()
  }, [dep_id])


  return (
    <HomepageComponent className="home-page">
      <SideBarComponent disableUserProfile={true} />
      <div className="content">
        <Contentportal className="content-portal">

          {/* <div className="img-top">
            <img src="/backgroud1.png" className="img-brand"></img>
          </div> */}

          <Carousel autoplay>
            <div>
              <img src="/g1.png" className="img-brand"></img>
            </div>
            <div>
              <img src="/g2.jpg" className="img-brand"></img>
            </div>
            <div>
              <img src="/g3.jpg" className="img-brand"></img>
            </div>
          </Carousel>



          {/* <hr /> */}

          <div className="back-group-team">

            <div className="head-member">
              <div>CONTRACT WITH EMPLOYEE</div>
              <hr />
            </div>

            <div className="button-group">
              <div className={'item ' + (dep_id == 1 ? 'group' : '')} onClick={() => { setdep_id(1) }}><span>IT-Support</span></div>
              <div className={'item ' + (dep_id == 2 ? 'group' : '')} onClick={() => { setdep_id(2) }}><span>Accounting</span></div>
              <div className={'item ' + (dep_id == 3 ? 'group' : '')} onClick={() => { setdep_id(3) }}><span>Procurement</span></div>
              <div className={'item ' + (dep_id == 4 ? 'group' : '')} onClick={() => { setdep_id(4) }}><span>Messenger</span></div>
              <div className={'item ' + (dep_id == 5 ? 'group' : '')} onClick={() => { setdep_id(5) }}><span>Other</span></div>
            </div>
            <br />

            <div className="department-team">
              <Table className="table-team" id={'table-team'} columns={columns} dataSource={userData} />
            </div>

          </div>
          {/* {เพิ่มข้อมูลเข้าไปใหม่} */}
          <div className="border-step" id={'wisaitas'}>
            <div className="flex-step">

              <div className="img-step">
                <img src="https://www.chase.co.th/storage/page/service/FjzdxuFE8XUWKgJtFjagnPEJoyCoJoubznIettnG.jpg" alt="" className="step" />
              </div>

              <div className="detail-step">
                <p className="lag">มาตรฐานการจัดขั้นตอนการปฏิบัติงาน</p>
                <p>&nbsp;</p>
                <p>&nbsp;&nbsp;&nbsp;บริษัท เชฎฐ์ เอเชีย จำกัด (มหาชน) มีมาตรฐานการจัด ขั้นตอนการปฏิบัติงานให้กับพนักงาน อย่างเป็นระบบ เพื่อช่วยให้พนักงานเข้าใจวิธีการทำงานและมีวิสัยทัศน์ไป ในทิศทางเดียวกัน เพื่อก่อให้เกิดประสิทธิภาพสูงสุด ในการทำงาน ตลอดจนการลดข้อผิดพลาดในการ ปฏิบัติหน้าที่ของพนักงานด้วย</p>
                <p>
                  &nbsp;</p>
                <p>&nbsp;&nbsp;&nbsp;บริษัทฯ จะนำข้อมูลใหม่ที่ได้รับจากลูกค้าเข้าสู่ ระบบ และระบบจะพิมพ์หนังสือทวงถามส่งให้กับลูกหนี้ ภายใน 24 ชั่วโมงหลังจากรับข้อมูลมาจากลูกค้าและ บัญชีลูกค้าทุกรายจะถูกส่งให้กับพนักงานทวงถาม ซึ่งทำหน้าที่ติดต่อกับลูกค้า โดยระบบจะจัดการส่งข้อมูล ไปโดยอัตโนมัติตามเงื่อนไขที่ได้กำหนดไว้ก่อนแล้ว สำหรับลูกค้าที่ไม่มีข้อมูล ที่อยู่ปัจจุบันหรือหมายเลข โทรศัพท์ บริษัทฯ จะจัดส่งผู้ชำนาญการไปทำการสืบหา ข้อมูล ที่อยู่ เพื่อให้สามารถติดต่อลูกหนี้ได้</p>
              </div>

            </div>

          </div>
          {/* {เพิ่มข้อมูลเข้าไปใหม่} */}

          <HeadCard >
            <div className="border-agent" id={"executive"}>
              <div className="head-agent">
                <div className="executive">
                  Executive
                </div>
                <hr />
              </div>

              <div className="body-agent">
                <div className="box1-agent-flex">
                  <div className="box1">
                    <div className="img">
                      <img alt="example" src="/4.jpg" className="img-card" />
                    </div>
                    <div className="text">
                      <br /><br />
                      <div className="border-text">
                        <h1 className="name-agen">K. Pracha Chaisuwan</h1>
                        <h2 className="position-agen">Chief Executive Officer</h2>
                        <hr className="card-agent" />
                        <div className="email">
                          <div className="icon-mail"><MdEmail></MdEmail></div>
                          <div className="name-mail">pracha@chase.co.th</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="box2">
                    <div className="img">
                      <img alt="example" src="/3.jpg" className="img-card" />
                    </div>
                    <div className="text">
                      <br /><br />
                      <div className="border-text">
                        <h1 className="name-agen-k">K. Hathairat Kaewsaenmuang</h1>
                        <h2 className="position-agen">Chief Operating Officer</h2>
                        <hr className="card-agent" />
                        <div className="email">
                          <div className="icon-mail"><MdEmail></MdEmail></div>
                          <div className="name-mail">hathairat@chase.co.th</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="box2-agent-flex">
                  <div className="box3">
                    <div className="img">
                      <img alt="example" src="/6.jpg" className="img-card" />
                    </div>
                    <div className="text">
                      <br /><br />
                      <div className="border-text">
                        <h1 className="name-agen">K. Waraluck Chaisuwan</h1>
                        <h2 className="position-agen">Chief Finance Officer</h2>
                        <hr className="card-agent" />
                        <div className="email">
                          <div className="icon-mail"><MdEmail></MdEmail></div>
                          <div className="name-mail">waraluck@chase.co.th</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="box4">
                    <div className="img">
                      <img alt="example" src="/7.jpg" className="img-card" />
                    </div>
                    <div className="text">
                      <br /><br />
                      <div className="border-text">
                        <h1 className="name-agen">K. Suthida Chaisuwan</h1>
                        <h2 className="position-agen">Chief Legal Officer</h2>
                        <hr className="card-agent" />
                        <div className="email">
                          <div className="icon-mail"><MdEmail></MdEmail></div>
                          <div className="name-mail">suthida@chase.co.th</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>


            </div>
          </HeadCard>

        </Contentportal>
      </div>
    </HomepageComponent>
  )
}
