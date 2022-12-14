import styled from "styled-components"
import SideBarComponent from "../components/sidebar.components";
import { BiWorld } from 'react-icons/bi'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';



const HomepageComponent = styled.div`
  display: flex;
  background-color: #FFFF;

  .content {
    width: 100%;
  }
  .sidebar-trigger-button {
    color: #fff;
  }

  //ส่วนรูปภาพหัวด้านบน
  .chase-voc{
      background-color: #015352;
      width: 100%;
      
        .group-voc{
          display: flex;
          .box1-voc{
            width: 40%;
            display: flex;
            justify-content: center;
            align-items: center;

            .group-box1{
              .flex-box1{
                display: flex ;
                position: relative;
                top: -35px;

                  .red-img{
                    width: 45px;
                    max-width: fit-content;
                    position: absolute;
                    left: 115px;
                  }
                  @media only screen and (min-width: 1900px) {
                    .red-img{
                      left: 120px;
                      top: -10px;
                    }
                  }

                .webchase{
                  
                  .btn-chase{
                  width: 170px;
                  height: 45px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border: 1px solid #015352;
                  border-radius: 20px;
                  position: relative;
                  left: 29px;
                  top: 12px;
                  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;


                  
                    .icon-web{
                    color: #fff;
                    font-size: 25px;
                    }

                    .logo-chase-while{
                      position: relative;
                      margin-left: 10px;
                    }
                  }
                } 
              }
              .text-content{
              font-size: 45px;
              font-weight: bold;
              color: #FFFF;
              margin-left: 145px;
              }

              .btn-link-voc{
                .btn-link{
                  position: relative;
                  top: -35px;
                  margin-left: 105px;
                  border-radius: 10px;
                  opacity: 0.8;
                  color: #FFFF;
                  border: 1 px solid gray;
                  width: 500px;
                  height: 180px;
                  background-color: #113d3d;
                  border: none;
            

                  .head-noti{
                    background-color: #001529;
                    text-align: center;
                    border-radius: 5px;
                    font-size: 18px;
                    font-weight: bold;
                    padding: 5px;
                  }
                  .body-noti{
                    margin: 10px 15px;
                  }

                }
              }            
            }
          }

          .box2-voc{
            width: 60%;
            /* background-color: green; */

            .img-box2{
              max-width: 100%;
              padding: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              .img-voc{
                max-width: 65%;
                height: auto;
              }
            }
          }

        }
  }
  //ส่วนรูปภาพหัวด้านบน

  //ส่วนคอนเท้นข่าวสารบริษัท
  .service-company{
    width: 100%;
    background-color: #FDFDFD;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    

    .head-service{
      text-align: center;
      padding: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      .head-act{
        font-weight:bold;
        font-size: 30px;
        padding: 5px;
        color: #015352;
        text-transform: uppercase;
        letter-spacing: 3px;
      }
      .red-head{
        width: 25px;
        position: relative;
        top: -15px;
        left: 10px;
      }
    }
    /* background-color: red; */

    .group-box{
      display: flex;
      justify-content: space-around;
      

      .box1, .box2, .box3{
        width: 30%;
        height: 250px;
      }
      .box1{
        background-image: url("prachoom.jpg");
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 10px;
        color: #fff;
        .act{
          background-color: red;
          border-radius: 15px;
          padding:7px;
          border: none;
          position: relative;
          top: 20px;
          left: 30px;
        }
      }
      .box2{
        background-image: url("qwe.jpg");
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 10px;
        color: #fff;
        .act{
          background-color: red;
          border-radius: 15px;
          padding:7px;
          border: none;
          position: relative;
          top: 20px;
          left: 30px;
        }
      }
      .box3{
        background-image: url("csr.jpg");
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 10px;
        color: #fff;
        .act{
          background-color: red;
          border-radius: 15px;
          padding:7px;
          border: none;
          position: relative;
          top: 20px;
          left: 30px;
        }
      }
    }
  }
  //ส่วนคอนเท้นข่าวสารบริษัท

  //ส่วนข้อมูลข่าวสาร แบบสไลค์
  .information-company{
    width: 100%;
    .group-infor{
      display: flex !important;
      justify-content: center;
      padding: 35px;
      width: 100%;
      background-image: url("banner.jpg");
      /* background-position: center center; */
      background-repeat: no-repeat;
      background-size: 100% 100%;
     
      .box1-img{
        width: 35%;
    
        .img-infor{
          width: 100%;
          max-height: fit-content;
        }
      }

      .box2-body{
        width: 35%;
        background-color: #FFFF;
        padding-top: 30px;
       
        
          .head-body{
            font-size: 24px;
            font-weight: 500;
            font-style: normal;
            padding: 5px 10px;
            text-align: start;
            margin: 0 auto;
            color: #001529;
            /* padding: 3px 10px; */
          }
          .content-body-info{
            font-size: 17px;
            line-height: 24px;
            padding: 0px 10px;
            text-align: start;
          }
          .btn-way{
            width: 100%;
            display: flex;
            justify-content: start;
            padding: 0px 10px;

            .btn-infor{
              background-color: #015352;
              color: #fff;
              padding: 10px;
              border-radius: 20px;
              border: none;
              font-size: 10px;
            }
          }
      }
     
      /* .box1-infor,.box2-infor{
        width: 45%;
        background-color: yellow;
      }
      .box2-infor{
        background-color: red
      } */
    }

    .carousel.carousel-slider .control-arrow{
      padding: 50px;
    }
    .carousel-status{
      display: none;
    }
    .control-dots{
      margin-bottom: 5px;
    }
    .carousel .thumbs-wrapper{
      display: none;
    }
  }
  //ส่วนข้อมูลข่าวสาร แบบสไลค์

  //ส่วนของกิจกรรมพนักงาน
  .activity-employee{
    width: 100%;
    background-color: #FDFDFD;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      .group-head{
        display: flex;
     
        .acthead{    
          margin-top: 20px;           
          font-size: 15px;
          font-weight: bold;
          text-transform: uppercase;
          color: #aaaaaa;
          padding-left: 25px;
          letter-spacing: 2px;
        }

        .line-head{
          width: 70px;
          height: 1px;
          background-color: #FD9D00;
          position: relative;
          top: 30px;
          left: 5px;
          display: inline-block;
        }
      }

      .act-ch{
        width: 100%;
        padding-left: 25px;
        text-transform: uppercase;
   
        .h-act{
          color: #015352;
          font-weight: bold;
          letter-spacing: 3px;
        }
      }

      .group-activity{
        display: flex;
        justify-content: space-around;
        padding: 10px;
        
        .box1-act,.box2-act,.box3-act,.box4-act{
          width: 23%;
          background-color: yellowgreen;

          .text-act{
            background-color: #FDFDFD;
            padding: 7px;
            font-size: 18px;
            text-align: center;
            font-weight: 500;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
          }

        }
        .act-img{
          width: 100%;
          max-width: fit-content;
          height: fit-content;
          height: 200px;
          border-radius: 5px;
        }
      }
    
  }
  //ส่วนของกิจกรรมพนักงาน

  //ส่วนของกิจกรรมเพื่อสังคม
  .activity-social{
    width: 100%;
    background-color: #FDFDFD;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      .group-head{
        display: flex;
     
        .acthead{    
          margin-top: 20px;           
          font-size: 15px;
          font-weight: bold;
          text-transform: uppercase;
          color: #aaaaaa;
          padding-left: 25px;
          letter-spacing: 2px;
        }

        .line-head{
          width: 70px;
          height: 1px;
          background-color: #FD9D00;
          position: relative;
          top: 30px;
          left: 5px;
          display: inline-block;
        }
      }

      .act-ch{
        width: 100%;
        padding-left: 25px;
        text-transform: uppercase;
   
        .h-act{
          color: #015352;
          font-weight: bold;
          letter-spacing: 3px;
        }
      }

      .group-activity{
        display: flex;
        justify-content: space-around;
        padding: 10px;
        
        .box1-act,.box2-act,.box3-act,.box4-act{
          width: 23%;
          background-color: yellowgreen;

          .text-act{
            background-color: #FDFDFD;
            padding: 10px;
            font-size: 13px;
            text-align: center;
            font-weight: 500;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
          }

        }
        .act-img{
          width: 100%;
          max-width: fit-content;
          height: fit-content;
          height: 200px;
          border-radius: 5px;
        }
      }
    
  }
  //ส่วนของกิจกรรมเพื่อสังคม
`;
// const Contentportal = styled.div`
//   background-color: transparent;

//   .content-first{
//     width: 100%;
//     height: 80vh;
//     background-color: black;
//     overflow: hidden;

//     .g1-chase{
//       object-fit: cover;
//       opacity: 0.5;
//     }

//     .content-text{
//       .text{
//         font-weight: bold;
//         color: #FFFF;
//         font-size: 50px;
//         position: absolute;
//         top: 180px;
//         left: 370px;
//         font-family: "Raleway", sans-serif;
//       }

//       @media only screen and (min-width: 1900px) {
//         .text{
//           left: 550px;
//           top: 250px;
//         }
//       }


//       .btn-getstan{

//         .btn-get{
//           position: absolute;
//           top: 300px;
//           left: 550px;
//           border-radius: 50px;
//           background-color: #015352;
//           border: none;
//           color: #F2F2F2;
//           font-size: 20px;
//           display: inline-block;
//           padding: 9px 35px;
//           letter-spacing: 1px;

//           &:hover{
//             background-color: #ffc107;
//             color: #F2F6F6;
//           }
//         }
//       }
//     }

//   }


//   .company-brand{
//     background-color: #F3F5FA;
//     padding: 20px;
//     box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); 

//     .brand-com{
//       display: flex;
//       justify-content: space-evenly;
//       align-items: center;
//       margin-right: 10px;

//       .brand-slie{
//         width: 150px;
//         &:hover{
//             transform: scale(1.3);
//             transition: transform 0.25s;
//         }
//       }
//     }
//   }


//   .content-service{
//     background-color: #FFFF;

//     .head-service{
//       text-align: center;
//       .h-service{
//         font-weight: bold;
//         font-size: 30px;
//         color: #015352;
//         padding: 9px 35px;
//         letter-spacing: 1px;
//       }
//     }

//     .content-body-service{
//         display: flex;
//         justify-content: space-evenly;
//         padding: 10px;

//         .box1, .box2, .box3, .box4{
//           width: 24%;
//           /* background-color: red; */
//           padding: 10px;
//           /* border: 1px solid red; */
//           margin-bottom: 20px;
//         }
//         .icon-service{
//           width: 130px;
//           margin: 0 auto;
//           padding-bottom: 20px;
//         }
//         .service-title{
//           margin-left: 10px;

//           .text-title{
//             font-weight: bold;
//             color: #015352;
//           }
//         }
//         .content-text-service{
//           padding: 10px;
//           color: #015352;
//         }

//     }
//   }

//   .content-group-button {
//     display: flex;
//     width: 100%;
//     background-color: #F2F6F6;


//     .item-button {
//       cursor: pointer;
//       width: 200px;
//       height: 150px;
//       border: 1px solid lightgray;
//       padding: 10px;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       text-align: center;
//       border-radius: 30px;
//       box-shadow: 10px 5px 5px 0px rgba(0, 0, 0, 0.75);

//       .item-button-name {
//         color: #000;
//       }
//       .item-button-icon {
//         font-size: 30px;
//         color: #000;
//       }
//     }
//   }
//      .name-card{
//          font-weight: bold;
//      }
//      .position{
//          color: #FD7D00;
//      }

//      .back-group-team{
//       background-color: #F2F2F2;
//       padding-top: 10px;

//       /* border: 1px solid #015352; */
//       box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); 


//       .head-member{
//       text-align: center;
//       font-size: 32px;
//       font-weight: bold;
//       color:#015352;
//       }

//       .button-group{
//          display: flex;
//          justify-content: space-evenly;
//          margin-top:35px;

//          .item{
//           width: 12%;
//           padding: 10px;
//           text-align: center;
//           font-weight: bold;
//           color: #000;
//           transition: 0.25s ease;
//           cursor: pointer;
//          }

//         .item:hover,
//         .group{
//           color: #FFF;
//          background-color: #E12454;
//         }
//       }

//       .department-team{
//         padding: 15px;

//         .table-team{
//           padding: 10px;


//         }
//         .ant-table-thead > tr > th {
//           font-weight: bold;
//           background-color: #001529;
//           color: #ffff;
//           white-space: nowrap;
//         }

//       }

//      }

//      hr{
//       border: 1px solid red;
//       background-color: red;
//       height: 2px;
//       width: 60px;
//       position: relative;
//       top: -13px;
//      }

//      .border-step{
//       margin-top: 30px;
//       box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);

//         .flex-step{
//           display: flex;
//             .img-wrapper{
//               background-color: #015352;
//             }
//             .img-step{
//               width: 100%;
//               overflow: hidden;
//             }
//             .img-conctainer{
//               width: 100%;
//               .step{
//                 width: 700px;
//                 height: 480px
//               }
//             }
//             .detail-step{      
//               width: 50%;
//               padding: 20px;
//               background-color: #015352;
//               color:#FFFF;
//               font-size: 17px;
//               flex: 1;
//               .lag{
//                 font-size: 20px;
//                 text-align: center;
//                 font-weight: bold;
//               }
//             }
//         }
//      }
//      .img-brand{
//       width: 100%;
//       height: 280px;
//       color: '#fff',
//      }

//      .towwer-bran{
//       width: 100%;
//       background: linear-gradient(rgba(40, 58, 90, 0.9), rgba(40, 58, 90, 0.9)),
//       url("chser.png") fixed center top;
//       background-size: cover;
//       padding: 120px 0;

//       .content-tower{
//         margin-left: 50px;
//         .head{
//           color: #FEDC00;
//           font-size: 20px;
//           font-weight: bold;
//           margin-bottom: 20px;
//         }
//         @media only screen and (min-width: 1900px) {
//           .head{
//             font-size: 35px;
//             font-weight: bold;
//             margin-left: 50px;
//           }
//           .content-body{
//             font-size: 15px;
//             font-weight: bold;
//             margin-left: 50px;
//           }
//         }
//         .content-body{
//           color: #FFFF;
//           font-weight: bold;
//           padding: 3px;
//         }
//       }

//      }

// `;


// const HeadCard = styled.div`
//   margin-bottom: 20px;
//   padding-bottom: 20px;
//   .border-agent{

//     background-color: #F3F5FA;

//     .head-agent{

//         .executive{
//           font-size: 35px;
//           font-weight: bold;
//           color: #015352;
//           text-align: center;
//           padding: 15px 10px;
//         }
//     }


//     .body-agent{
//       .box1-agent-flex,.box2-agent-flex{
//         display: flex;
//         justify-content: center;
//         align-items: center;


//           .box1, .box2, .box3, .box4{
//           width: 43%;
//           display: flex;
//           height: 250px;
//           margin: 10px 10px;
//           box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);  
//           background-color: #FFFF;

//             .img{
//               width: 40%;
//               height: auto;
//               display: flex;
//               justify-content: center;
//               align-items: center;

//                 .img-card{
//                   width:80%;
//                   height: 220px;
//                   border-radius: 50%;

//                   /* &:hover{
//                     transform: scale(1.3);
//                     transition: transform 0.25s;

//                   } */
//                 }
//             }
//             .text{
//               width: 60%;
//               padding: 15px;

//               .name-agen{
//                 font-weight: bold;
//                 color: #2C4964;
//                 font-size: 23px;
//               }

//               .position-agen{
//                 position: relative;
//                 font-size: 17px;
//                 top: -15px;
//               }
//               .card-agent{
//                 width: 40px;
//                 background-color: gray;
//                 border: none;
//                 position: relative;
//                 left: -130px;
//                 top: -40;
//               }

//               @media only screen and (min-width: 1900px) {
//                 .card-agent{
//                   left: -180px;
//                   top: -40;
//                 }
//               }
//               .email{
//                 display: flex;
//                 .icon-mail{
//                   font-size: 20px;
//                   color: #2C4964;
//                 }
//                 .name-mail{
//                   font-size: 16px;
//                   position: relative;
//                   top: -2px;
//                   margin-left: 10px;
//                 }

//               }


//             }
//           }
//       }

//     }
//   }
// `

// const Profileim = styled.div`
//   border-radius: 50px;
//   display: flex;
//   justify-content: center;
//   width:80px;
//   height: 60px;
//   margin-left: 10px;

//   .img-pro{
//     border-radius: 50px;
//   }

// `
// const SliderBar = styled(Carousel)`

// `
// const SliderBar = styled(Carousel)`
//       width: 100%;
//       height: auto;


// `;


export default function HomePage() {

  return (
    <>
      <HomepageComponent>
        <SideBarComponent disableUserProfile={true} />
        <div className="content">

          {/* หัวข้อการทำ VOS แบบ เฟสบุค */}
          <div className="chase-voc">
            <div className="group-voc">
              <div className="box1-voc">
                <div className="group-box1">
                  <div className="flex-box1">
                    <h1 className="text-content">E-PORTAL</h1>
                    <img src="red.png" alt="" className="red-img" />
                    <div className="webchase">
                      <a href={"https://www.chase.co.th/"} target="_blank/">
                        <button className="btn-chase">
                          <BiWorld className="icon-web" />
                          <img src="logo-chase.png" alt="" className="logo-chase-while" width={100} />
                        </button>
                      </a>

                    </div>
                  </div>
                  <div className="btn-link-voc">
                    <div className="btn-link">
                      <div className="head-noti">
                        New & Announcement
                      </div>
                      <div className="body-noti">
                        <p>ทดสอบประกาศ</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box2-voc">
                <div className="img-box2">
                  <img src="/hero-img.png" alt="" className="img-voc up-down-animation" />
                </div>
              </div>
            </div>
          </div>
          {/* หัวข้อการทำ VOS แบบ เฟสบุค */}


          {/* หัวข้อมูลข่าวสาร */}
          <div className="service-company">
            <div className="head-service">
              <img src="red.png" alt="" className="red-head" />
              <h2 className="head-act">New&Activity</h2>
            </div>
            <div className="group-box">
              <div className="box1">
                <button className="act">ข่าวสารบริษัท</button>
              </div>
              <div className="box2">
                <button className="act">กิจกรรมบริษัท</button>
              </div>
              <div className="box3">
                <button className="act">กิจกรรมเพื่อสังคม</button>
              </div>
            </div>
            <br />
          </div>
          {/* หัวข้อมูลข่าวสาร */}


          {/* ส่วนข้อมูลข่าวสารแบบ สไลค์ */}
          <div className="information-company">
            <Carousel showArrows={true}>
              <div className="group-infor">
                <div className="box1-img">
                  <img src="test3.png" alt="" className="img-infor" />
                </div>
                <div className="box2-body">
                  <p className="head-body">
                    RS GROUP จับมือ CHASE แต่ง ปรึกษา ทางการเงิน มุ่งหน้าสู่ตลาดหลักทรัพย์
                    ตามเป้าหมาย
                  </p>
                  <p className="content-body-info">
                    บริษัท อาร์เอส จำกัด (มหาชน) หรือ อาร์เอส กรุ๊ป ร่วมพิธี ลงนามแต่งตั้งบริษัทหลักทรัพย์ กสิกรไทย จำกัด (มหาชน)
                    เป็นที่ปรึกษาทางการเงิน ให้แก่บริษัท เชฎฐ์ เอเชีย จำกัด....
                  </p>
                  <div className="btn-way">
                    <button className="btn-infor">อ่านเพิ่มเติม</button>
                  </div>

                </div>
              </div>
              <div className="group-infor">
                <div className="box1-img">
                  <img src="test3.png" alt="" className="img-infor" />
                </div>
                <div className="box2-body">
                  <p className="head-body">RS GROUP จับมือ CHASE แต่ง ปรึกษา ทางการเงิน มุ่งหน้าสู่ตลาดหลักทรัพย์
                    ตามเป้าหมาย
                  </p>
                  <p className="content-body-info">
                    บริษัท อาร์เอส จำกัด (มหาชน) หรือ อาร์เอส กรุ๊ป ร่วมพิธี ลงนามแต่งตั้งบริษัทหลักทรัพย์ กสิกรไทย จำกัด (มหาชน)
                    เป็นที่ปรึกษาทางการเงิน ให้แก่บริษัท เชฎฐ์ เอเชีย จำกัด....
                  </p>
                  <div className="btn-way">
                    <button className="btn-infor">Read-More</button>
                  </div>

                </div>
              </div>
              <div className="group-infor">
                <div className="box1-img">
                  <img src="test3.png" alt="" className="img-infor" />
                </div>
                <div className="box2-body">
                  <p className="head-body">RS GROUP จับมือ CHASE แต่ง ปรึกษา ทางการเงิน มุ่งหน้าสู่ตลาดหลักทรัพย์
                    ตามเป้าหมาย
                  </p>
                  <p className="content-body-info">
                    บริษัท อาร์เอส จำกัด (มหาชน) หรือ อาร์เอส กรุ๊ป ร่วมพิธี ลงนามแต่งตั้งบริษัทหลักทรัพย์ กสิกรไทย จำกัด (มหาชน)
                    เป็นที่ปรึกษาทางการเงิน ให้แก่บริษัท เชฎฐ์ เอเชีย จำกัด....
                  </p>
                  <div className="btn-way">
                    <button className="btn-infor">Read-More</button>
                  </div>

                </div>
              </div>
            </Carousel>
          </div>
          {/* ส่วนข้อมูลข่าวสารแบบ สไลค์ */}


          {/* ส่วนข้อมูลกิจกรรม บริษัท */}
          <div className="activity-employee">
            <div className="group-head">
              <h5 className="acthead">Activity</h5>
              <div className="line-head"></div>
            </div>

            <div className="act-ch">
              {/* <img src="red.png" alt="" className="red-act" /> */}
              <h1 className="h-act">Activity-Company</h1>
            </div>

            <div className="group-activity">
              <div className="box1-act">
                <img src="act1.png" alt="" className="act-img" />
                <div className="text-act">
                  <h5>Happy-Newyear</h5>
                </div>
              </div>
              <div className="box2-act">
                <img src="act2.jpg" alt="" className="act-img" />
                <div className="text-act">
                  <h5>Eat-Meetting</h5>
                </div>
              </div>
              <div className="box3-act">
                <img src="act3.jpg" alt="" className="act-img" />
                <div className="text-act">
                  <h5>Dinner-Room</h5>
                </div>
              </div>
              <div className="box4-act">
                <img src="act4.jpg" alt="" className="act-img" />
                <div className="text-act">
                  <h5>Chirstmas</h5>
                </div>
              </div>
            </div>
            <br /><br />
          </div>
          {/* ส่วนข้อมูลกิจกรรม บริษัท */}


          {/* ส่วนข้อมูลกิจกรรม บริษัทเพื่อสังคม */}
          <div className="activity-social">
            <div className="group-head">
              <h5 className="acthead">Activity</h5>
              <div className="line-head"></div>
            </div>

            <div className="act-ch">
              {/* <img src="red.png" alt="" className="red-act" /> */}
              <h1 className="h-act">Activity-Social</h1>
            </div>

            <div className="group-activity">
              <div className="box1-act">
                <img src="act1.png" alt="" className="act-img" />
                <div className="text-act">
                  <h5>ร่วมบริจาคสมทบทุนสร้าง ศูนย์การแพทย์ภัทรมหาราชานุสรณ์</h5>
                </div>
              </div>
              <div className="box2-act">
                <img src="act2.jpg" alt="" className="act-img" />
                <div className="text-act">
                  <h5>ร่วมบริจาคสมทบทุนสร้าง ศูนย์การแพทย์ภัทรมหาราชานุสรณ์</h5>
                </div>
              </div>
              <div className="box3-act">
                <img src="act3.jpg" alt="" className="act-img" />
                <div className="text-act">
                  <h5>ร่วมบริจาคสมทบทุนสร้าง ศูนย์การแพทย์ภัทรมหาราชานุสรณ์</h5>
                </div>
              </div>
              <div className="box4-act">
                <img src="act4.jpg" alt="" className="act-img" />
                <div className="text-act">
                  <h5>ร่วมบริจาคสมทบทุนสร้าง ศูนย์การแพทย์ภัทรมหาราชานุสรณ์</h5>
                </div>
              </div>
            </div>
            <br /><br />
          </div>
          {/* ส่วนข้อมูลกิจกรรม บริษัทเพื่อสังคม */}


        </div>
      </HomepageComponent>
    </>
    // <HomepageComponent className="home-page">
    //   <SideBarComponent disableUserProfile={true} />
    //   <div className="content">
    //     <Contentportal className="content-portal">

    //       {/* คอนเท้นหัวบน รูปภาพ */}
    //       <motion.div className={`content-first`}
    //         initial={{ x: '100%' }}
    //         animate={{ x: 0 }}
    //         transition={{ duration: 1 }}>
    //         <img src="/hero-bg.jpg" className="g1-chase"></img>
    //         <div className={`content-text`}>
    //           <motion.h1 className="text"
    //             initial={{ opacity: 0, y: '-40px' }}
    //             animate={{ opacity: isBannerReady ? 1 : 0, y: isBannerReady ? 0 : '-40px' }}
    //             transition={{ duration: 1 }}>WELCOME TO EPORTAL</motion.h1>
    //           {/* <div className="btn-getstan">
    //             <button className="btn-get">Getstandart</button>
    //           </div> */}
    //         </div>
    //       </motion.div>
    //       {/* คอนเท้นหัวบน รูปภาพ */}


    //       {/* รูปภาพบริษัท ในเครือข่าย */}
    //       <div className="company-brand">
    //         <div className="brand-com">
    //           <div><img src="/chase.png" className="brand-slie"></img></div>
    //           <div><img src="/aaaa.png" className="brand-slie"></img></div>
    //           <div><img src="/bbbb.png" className="brand-slie"></img></div>
    //           <div><img src="/cccc.png" className="brand-slie"></img></div>
    //         </div>
    //       </div>
    //       {/* รูปภาพบริษัท ในเครือข่าย */}



    //       {/* หัวข้อ service ทั้งหมด */}
    //       <div className="content-service">
    //         <div className="head-service">
    //           <h1 className="h-service">SERVICE</h1>
    //           <hr />
    //         </div>

    //         <div className="content-body-service">

    //           <div className="box1">
    //             <div className="icon-service">
    //               <img src="/49049.jpg" className="icon-service" alt="" />
    //             </div>
    //             <div className="service-title">
    //               <h2 className="text-title">Delinquent Account Collection</h2>
    //             </div>
    //             <div className="content-text-service">
    //               <p>
    //                 ติดตามทวงถามทางโทรศัพท์
    //                 และลงพื้นที่เพื่อตรวจสอบ&nbsp;(Phone and Field Collections)
    //                 ในทุกภาค ทั่วประเทศ เป็นบริการที่ได้รับ การไว้วางใจยาวนานต่อเนื่องจาก
    //                 ทั้งสถาบันการเงินชั้นนำของไทยและของต่างประเทศ
    //               </p>
    //             </div>
    //           </div>

    //           <div className="box2">
    //             <div className="icon-service">
    //               <img src="/law.png" className="icon-service" alt="" />
    //             </div>
    //             <div className="service-title">
    //               <h2 className="text-title">Legal Services</h2>
    //             </div>
    //             <div className="content-text-service">
    //               <p>
    //                 การให้บริการดำเนินคดีแบบครบวงจร ซึ่งรวมถึงงานด้าน สืบทรัพย์เพื่อบังคับคดี และการขายทอดตลาด
    //               </p>
    //             </div>
    //           </div>

    //           <div className="box3">
    //             <div className="icon-service">
    //               <img src="/letter.png" className="icon-service" alt="" />
    //             </div>
    //             <div className="service-title">
    //               <h2 className="text-title">Letter Services</h2>
    //             </div>
    //             <div className="content-text-service">
    //               <p>
    //                 ให้บริการออกแบบรูปแบบต่าง ๆ ของ จดหมาย หรือ หนังสือบอกกล่าว ดำเนินคดี หรือทวงถามหนี้
    //               </p>
    //             </div>
    //           </div>

    //           <div className="box4">
    //             <div className="icon-service">
    //               <img src="/train.png" className="icon-service" alt="" />
    //             </div>
    //             <div className="service-title">
    //               <h2 className="text-title">Training Programs</h2>
    //             </div>
    //             <div className="content-text-service">
    //               <p>
    //                 จัดอบรมพนักงาน โดยมีหลักสูตร ของเนื้อหาในการอบรมครอบคลุม
    //                 ถึง Collection Techniques,
    //                 และกฎหมายต่างๆ ที่เกี่ยวข้อง
    //                 ด้วยทีมงานผู้อบรมที่มีความเชี่ยว
    //                 ชาญเฉพาะด้าน
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //         {/* ข้อมูล วิสัยทัศ ที่มีพนักงาน */}
    //         <div className="border-step" id={'wisaitas'}>
    //           <div className="flex-step">
    //             <div className="img-wrapper">
    //               <motion.div className={`img-step`}
    //                 initial={{ width: '0%' }}
    //                 whileInView={{ width: '100%' }}
    //                 viewport={{ once: false }}
    //                 transition={{ duration: 1 }}
    //               >
    //                 <div className="img-conctainer">
    //                   <img src="/img-po.jpg" alt="" className="step" />
    //                 </div>
    //               </motion.div>
    //             </div>
    //             <div className="detail-step">
    //               <p className="lag">มาตรฐานการจัดขั้นตอนการปฏิบัติงาน</p>
    //               <p>&nbsp;</p>
    //               <p>&nbsp;&nbsp;&nbsp;บริษัท เชฎฐ์ เอเชีย จำกัด (มหาชน) มีมาตรฐานการจัด ขั้นตอนการปฏิบัติงานให้กับพนักงาน อย่างเป็นระบบ เพื่อช่วยให้พนักงานเข้าใจวิธีการทำงานและมีวิสัยทัศน์ไป ในทิศทางเดียวกัน เพื่อก่อให้เกิดประสิทธิภาพสูงสุด ในการทำงาน ตลอดจนการลดข้อผิดพลาดในการ ปฏิบัติหน้าที่ของพนักงานด้วย</p>
    //               <p>
    //                 &nbsp;</p>
    //               <p>&nbsp;&nbsp;&nbsp;บริษัทฯ จะนำข้อมูลใหม่ที่ได้รับจากลูกค้าเข้าสู่ ระบบ และระบบจะพิมพ์หนังสือทวงถามส่งให้กับลูกหนี้ ภายใน 24 ชั่วโมงหลังจากรับข้อมูลมาจากลูกค้าและ บัญชีลูกค้าทุกรายจะถูกส่งให้กับพนักงานทวงถาม ซึ่งทำหน้าที่ติดต่อกับลูกค้า โดยระบบจะจัดการส่งข้อมูล ไปโดยอัตโนมัติตามเงื่อนไขที่ได้กำหนดไว้ก่อนแล้ว สำหรับลูกค้าที่ไม่มีข้อมูล ที่อยู่ปัจจุบันหรือหมายเลข โทรศัพท์ บริษัทฯ จะจัดส่งผู้ชำนาญการไปทำการสืบหา ข้อมูล ที่อยู่ เพื่อให้สามารถติดต่อลูกหนี้ได้</p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       {/* หัวข้อ service ทั้งหมด */}


    //       {/* รูปภาพตึก */}
    //       <div className="towwer-bran">
    //         <div className="container" data-aos="zoom-in">
    //           <div className="content-tower">
    //             <h3 className="head">ความเป็นมาของบริษัท</h3>
    //             <div className="content-body">
    //               <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;บริษัท เชฎฐ์ เอเชีย จำกัด จดทะเบียนก่อตั้งในปี 1998 (และจดทะเบียนเป็น บริษัท เชฎฐ์ เอเชีย จำกัด (มหาชน) ในปี 2022 ) โดยการรวมตัวของผู้บริหาร ที่พร้อมใจทำงานกันเป็นทีมภาย<br></br>
    //                 ใต้วัตถุประสงค์หลักที่จะให้บริการที่ดีเลิศในด้านการติดตาม เรียกเก็บ และเร่งรัดหนี้สิน ให้กับลูกค้าในกลุ่มธุรกิจ สินเชื่อบัตรเครดิต การสื่อสารโทรคมนาคม สินเชื่อบ้านและที่ดิน สินเชื่อรถยนต์ <br></br>
    //                 การประกันภัย การโรงแรม สินเชื่อเพื่อการบริการ และ สินเชื่อรายย่อยอื่นๆ ตลอดจนการให้บริการเรียกเก็บหนี้ให้กับหน่วยงานของทางราชการ นอกจากนี้บริษัทฯ ยังให้บริการดำเนินคดีแบบครบวงจร <br></br>
    //                 ซึ่งรวมถึงมีหน่วยงานสืบจับตัวบุคคล ตามหมายจับของศาล หรือหมายของกรมตำรวจ และงานด้านสืบทรัพย์เพื่อการบังคับคดีด้วย
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       {/* รูปภาพบริษัท ในเครือข่าย */}


    //       {/* หัวข้อการทำ VOS แบบ เฟสบุค */}
    //       <div className="chase-voc">
    //         <div className="group-voc">
    //           <div className="box1-voc">
    //             <div className="group-box1">
    //               <div className="flex-box1">
    //                 <h1 className="text-content">CHASE VOC</h1>
    //                 <img src="red.png" alt="" className="red-img" />
    //               </div>
    //               <div className="btn-link-voc">
    //                 <button className="btn-link">Comming-Soon</button>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="box2-voc">
    //             <div className="img-box2">
    //               <img src="/hero-img.png" alt="" className="img-voc up-down-animation" />
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       {/* หัวข้อการทำ VOS แบบ เฟสบุค */}

    //       {/* ในส่วนของผู้บริหาร  */}
    //       <HeadCard >
    //         <div className="border-agent" id={"executive"}>
    //           <div className="head-agent">
    //             <div className="executive">
    //               EXECUTIVES
    //             </div>
    //             <hr />
    //           </div>

    //           <div className="body-agent">
    //             <div className="box1-agent-flex">
    //               <div className="box1 ">
    //                 <div className="img">
    //                   <img alt="example" src="/4.jpg" className="img-card" />
    //                 </div>
    //                 <div className="text">
    //                   <br /><br />
    //                   <div className="border-text">
    //                     <h1 className="name-agen">Pracha Chaisuwan</h1>
    //                     <h2 className="position-agen">Chief Executive Officer</h2>
    //                     <hr className="card-agent" />
    //                     <div className="email">
    //                       <div className="icon-mail"><MdEmail></MdEmail></div>
    //                       <div className="name-mail">pracha@chase.co.th</div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>

    //               <div className="box2">
    //                 <div className="img">
    //                   <img alt="example" src="/3.jpg" className="img-card" />
    //                 </div>
    //                 <div className="text">
    //                   <br /><br />
    //                   <div className="border-text">
    //                     <h1 className="name-agen">Hathairat Kaewsaenmuang</h1>
    //                     <h2 className="position-agen">Chief Operating Officer</h2>
    //                     <hr className="card-agent" />
    //                     <div className="email">
    //                       <div className="icon-mail"><MdEmail></MdEmail></div>
    //                       <div className="name-mail">hathairat@chase.co.th</div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>

    //             <div className="box2-agent-flex">
    //               <div className="box3">
    //                 <div className="img">
    //                   <img alt="example" src="/6.jpg" className="img-card" />
    //                 </div>
    //                 <div className="text">
    //                   <br /><br />
    //                   <div className="border-text">
    //                     <h1 className="name-agen">Waraluck Chaisuwan</h1>
    //                     <h2 className="position-agen">Chief Finance Officer</h2>
    //                     <hr className="card-agent" />
    //                     <div className="email">
    //                       <div className="icon-mail"><MdEmail></MdEmail></div>
    //                       <div className="name-mail">waraluck@chase.co.th</div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>

    //               <div className="box4">
    //                 <div className="img">
    //                   <img alt="example" src="/7.jpg" className="img-card" />
    //                 </div>
    //                 <div className="text">
    //                   <br /><br />
    //                   <div className="border-text">
    //                     <h1 className="name-agen">Suthida Chaisuwan</h1>
    //                     <h2 className="position-agen">Chief Legal Officer</h2>
    //                     <hr className="card-agent" />
    //                     <div className="email">
    //                       <div className="icon-mail"><MdEmail></MdEmail></div>
    //                       <div className="name-mail">suthida@chase.co.th</div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>

    //         </div>
    //       </HeadCard>
    //       {/* ในส่วนของผู้บริหาร  */}
    //       <br /><br />


    //       {/* ข้อมูลฝ่ายไอที */}
    //       <div className="back-group-team">
    //         <div className="head-member">
    //           <div>CONTRACT WITH EMPLOYEE</div>
    //           <hr />
    //         </div>

    //         <div className="button-group">
    //           <div className={'item ' + (dep_id == 1 ? 'group' : '')} onClick={() => { setdep_id(1) }}><span>IT-Support</span></div>
    //           <div className={'item ' + (dep_id == 2 ? 'group' : '')} onClick={() => { setdep_id(2) }}><span>Accounting</span></div>
    //           <div className={'item ' + (dep_id == 3 ? 'group' : '')} onClick={() => { setdep_id(3) }}><span>Procurement</span></div>
    //           <div className={'item ' + (dep_id == 4 ? 'group' : '')} onClick={() => { setdep_id(4) }}><span>Messenger</span></div>
    //           <div className={'item ' + (dep_id == 5 ? 'group' : '')} onClick={() => { setdep_id(5) }}><span>Other</span></div>
    //         </div>
    //         <br />

    //         <div className="department-team">
    //           <Table className="table-team" id={'table-team'} columns={columns} dataSource={userData} />
    //         </div>
    //       </div>
    //       {/* ข้อมูลฝ่ายไอที */}


    //     </Contentportal>
    //   </div>
    // </HomepageComponent>
  )
}
