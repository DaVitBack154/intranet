import SideBar from "../../components/sidebar.components";
import Navbar from "../../components/navbar.compoenets";
import styled from "styled-components";
import TableProfileData from "./table-data-profile";

const HrComponent = styled.div`
  width: 100%;

  .content{
      .group-hr{
      
        .table-hr{
          padding: 30px;
        }
      
    }
  }
`;


export default function Hr() {

  return (
    <HrComponent className="repair-system">
      <SideBar />
      <div className="content">
        <Navbar />
        <div className="group-hr">
          <div className="head-hr">
          </div>
          <div className="table-hr">
            <TableProfileData />
          </div>
        </div>
      </div>
    </HrComponent>
  );
}
