import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { AppState } from '../../reducers';

interface DashboardProps {
  logoutUser: Function,
  auth: any
}

const Dashboard = (props: DashboardProps) => {
  const onLogoutClick = (e: any) => {
    e.preventDefault();
    props.logoutUser();
  };
  return (
    <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="row">
        <div className="col s12 center-align">
          <h4>
            Hey there, <b>{props.auth.user.username}</b>
            <p>This is your dashboard. More features to come soon!</p>
          </h4>
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem"
            }}
            onClick={onLogoutClick}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
            Logout
            </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);