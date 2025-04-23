import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError(); // Get the exact error message
  console.log(error); // Log the error for debugging

  if (error?.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="page not found" />
          <h3>Page Not Found</h3>
          <p>We can't seem to find the page you're looking for</p>
          <Link to="/dashboard">back home</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <h3>Something went wrong</h3>
        <p>{error?.message || "An unexpected error occurred."}</p>
      </div>
    </Wrapper>
  );
};

export default Error;