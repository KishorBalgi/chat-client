import React from "react";
import "./search-bar.styles.css";
import { Spinner } from "../spinner/spinner.component";
// Redux:
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { searchUsers } from "../../redux/chat-list/chat-list.actions";
import {
  selectFindingUsers,
  selectUsersSearchErr,
  selectUsersSearchRes,
} from "../../redux/chat-list/chat-list.selector";

const SearchBar = ({
  findUsers,
  findingUsers,
  userSearchRes,
  userSearchErr,
}) => {
  function handleSearchChange(e) {
    const search = e.target.value;
    findUsers(search);
  }
  return (
    <div className="search-bar" id="user-search-bar">
      <input
        type="text"
        className="search-bar-input"
        id="user-search-input"
        placeholder="Search chat"
        onChange={handleSearchChange}
      />
      <div className="user-serach-res">
        {findingUsers ? <Spinner msg={"searching"} /> : userSearchRes}
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  findingUsers: selectFindingUsers,
  userSearchRes: selectUsersSearchRes,
  userSearchErr: selectUsersSearchErr,
});

const mapDispatchToProps = (dispatch) => ({
  findUsers: (search) => dispatch(searchUsers(search)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
