import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/ProfileEditor.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormField = props => {
  return (
    <div className="edit field">
      <label className="edit label">
        {props.label}
      </label>
      <input
        className="edit input"
        placeholder="enter here.."
        value={props.value}
        type = {props.type}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

const ProfileEditor = props => {
  const history = useHistory();
  const [birthday, setBirthday] = useState(null);
  const [username, setUsername] = useState(null);

  let {userId} = useParams();

  const doEdit = async () => {
    try {
      const requestBody = JSON.stringify({username, birthday});
      const response = await api.put(`/users/${userId}`, requestBody);

      // Edit successfully worked --> navigate back to user page
      history.goBack();
    } catch (error) {
      alert(`Something went wrong during the edit: \n${handleError(error)}`);
    }
  };

  return (
    <BaseContainer>
      <div className="edit container">
        <div className="edit form">
          <FormField
            type = "text"
            label="New Username"
            value={username}
            onChange={un => setUsername(un)}
          />
          <FormField
            type = "text"
            label="New Birthday (yyyy-mm-dd)"
            value={birthday}
            onChange={n => setBirthday(n)}
          />
          <div className="edit button-container">
            <Button
              //disabled={!username || !password}
              width="100%"
              onClick={() => doEdit()}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default ProfileEditor;
