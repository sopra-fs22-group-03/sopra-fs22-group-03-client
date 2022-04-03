import { Button } from 'components/ui/Button';
import React from 'react';
import { useHistory } from 'react-router-dom';

const Start = props => {
    const history = useHistory();
    
    const goToLogin = (login) => {
        history.push('/login');
    };
    
    const goToRegistration = () => {
        history.push('/registration')
    };

    return(
        <div>
            <div>
                Logo goes here
            </div>
            <div>
                <p>
                    Ready to never worry again?
                </p>
            </div>
            <div>
                <Button
                onClick={() => goToLogin()}>
                    Login
                </Button>
                <Button
                onClick={() => goToRegistration()}>
                    Register
                </Button>
            </div>
        </div>
        
    
    );

};


export default Start;