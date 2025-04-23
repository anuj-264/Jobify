import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import {Logo} from "../components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
          Streamline your company's hiring process with our internal HR management platform. 
            HR personnel can efficiently create and manage job postings, while administrators 
            maintain oversight of the entire recruitment workflow. Track job statuses from 
            pending to interview to completion, all in one centralized system.
          </p>
          <div className="btn-container">
            <Link to="/register" className="btn register-link">
              Get Started
            </Link>
            <Link to="/login" className="btn login-link">
              Login
            </Link>
          </div>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
