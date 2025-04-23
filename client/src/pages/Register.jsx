import { Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Form, redirect, useNavigation, Link } from "react-router-dom";
import { FormRow } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => { //request is the request object that is passed to the action function 
  const formData = await request.formData();//to get the form data from the request object and store it in the formData variable
  const data = Object.fromEntries(formData);//convert the formData to an object using Object.fromEntries() method
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Something went wrong");
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();//useNavigation is a hook that returns the current navigation state of the router
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method="POST" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name"  />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
          
        />
        <FormRow type="text" name="location"  />
        <FormRow type="email" name="email"  />
        <FormRow type="password" name="password"  />
        <button type="submit" className="btn btn-block "disabled={isSubmitting}>
        {isSubmitting ? 'submitting...' : 'Register'}
        </button>
        <p>
          Already a member?{" "}
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
