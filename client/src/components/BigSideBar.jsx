import Wrapper from "../assets/wrappers/BigSideBar";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import { useDashboardContext } from "../pages/DashBoardLayout";



const BigSideBar = () => {
  const { showSidebar } = useDashboardContext();
  return (
    <Wrapper>
       <div className={showSidebar ? "sidebar-container " : "sidebar-container show-sidebar"}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks  isBigSidebar/>
        </div>
       </div>
    </Wrapper>
  )
}
export default BigSideBar