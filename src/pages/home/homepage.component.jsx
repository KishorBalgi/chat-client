import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.styles.css";
// Components:
import { Spinner } from "../../components/spinner/spinner.component";
// Redux:
import { checkSavedLogin } from "../../redux/user/user.actions";
import { connect } from "react-redux";

const HomePage = ({ checkSavedLogin }) => {
  let navigate = useNavigate();

  useEffect(async () => {
    if (await checkSavedLogin()) {
      navigate("/app");
    } else {
      navigate("/login");
    }
  });
  return (
    <div
      className="home
        "
    >
      <Spinner msg="Loading" />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  checkSavedLogin: () => dispatch(checkSavedLogin()),
});
export default connect(null, mapDispatchToProps)(HomePage);
