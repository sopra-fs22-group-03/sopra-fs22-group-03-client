import BaseContainer from "components/ui/BaseContainer";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {api, handleError} from 'helpers/api';
import {useState} from 'react';
import User from 'models/User';
import "styles/views/Profile.scss";
import {Button} from 'components/ui/Button';
import {Link, useHistory, useLocation} from 'react-router-dom';

const Profile = () => {

    let userIdOfCurrentUser = localStorage.getItem('currentUser');

    let {userId} = useParams();

    const [username, setUsername] = useState(null);
    const [logged_in, setLogged_in] = useState(null);
    const [creationDate, setCreationDate] = useState(null);
    const [birthday, setBirthday] = useState(null);

    const loadProfile = async () => {
        try {
        const response = await api.get(`/users/${userId}`);

        // Get the returned user and update a new object.
        const user = new User(response.data);
        setUsername(user.username);
        setLogged_in(user.logged_in);
        setCreationDate(user.creationDate);
        setBirthday(user.birthday);

        } catch (error) {
        alert(`Something went wrong while loading the profile page: \n${handleError(error)}`);
        }
    };

    loadProfile();
    const location = useLocation();
    const currentPath = location.pathname;
    const history = useHistory();

    return (
        <BaseContainer>

            <div className="back button-container">
                <Button width="20%" onClick={() => history.push('/game')}>
                    Go to user overview
                </Button>
            </div>

            <h1>Profile page of user: {username}</h1>

            <table>
                <tr>
                    <td>Username</td>
                    <td>{username}</td>
                </tr>
                <tr>
                    <td>Online Status</td>
                    <td>
                        {logged_in ? ("Online") : ("Offline")}
                    </td>
                </tr>
                <tr>
                    <td>Creation Date</td>
                    <td>{creationDate}</td>
                </tr>
                <tr>
                    <td>Birthday</td>
                    <td>{birthday}</td>
                </tr>
            </table>

            {userIdOfCurrentUser === userId ? 
                        <div className="edit button-container">
                            <Button width="50%" onClick={() => history.push(`${currentPath}/edit`)}>
                                Edit
                            </Button>
                        </div> :
                <a></a>
            }

        </BaseContainer>
    );
}

export default Profile;