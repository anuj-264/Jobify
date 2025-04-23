import { FaTimes } from "react-icons/fa";
import Warpper from "../assets/wrappers/SmallSidebar";
import { useDashboardContext } from "../pages/DashBoardLayout";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

const SmallSideBar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();
  return (
    <Warpper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn " onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Warpper>
  );
};
export default SmallSideBar;
