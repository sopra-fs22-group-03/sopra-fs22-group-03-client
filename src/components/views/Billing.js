import React from "react";
import NavbarComp from "components/ui/NavbarComp";
import BaseContainer from "components/ui/BaseContainer";
import {api, handleError} from 'helpers/api';
import {useEffect, useState} from 'react';
import {Button} from 'components/ui/Button';
import "styles/views/Billing.scss";


const BillingUnit = props => {

    const [billingData, setBillingData] = useState(null);
    const [userData, setUserData] = useState(null);
    const parkingId = 100001;


    useEffect(() => {
        async function fetchData() {
            const responseOne = await api.get(``); //load all the needed data
            const responseTwo = await api.get(``)
            
            setBillingData(responseOne.data);
            setUserData(responseTwo.data);
        }
        fetchData()
    });

    const split = async () => {
        
        
    }
    const pay = async () => {
        try {
            const requestBody = JSON.stringify({
                //{props.data.billingId}
            });
            const response = await api.post(`/billing/${props.data.billingId}`, requestBody); 
        } catch (error){
            alert(
                `Fatal error: Something went wrong during Payment: \n${handleError(error)}`
              );
        }
        
    }

        return(
        <>
        <div className = "billingunit container">
            <div className= "billingunit firstRowLeft">
                <div className = "billingunit rowOne">
                    <div>
                        <div className = "billingunit check">
                            Check-in
                        </div>
                    </div>
                    
                    <div>
                        <div className="billingunit checkDate">
                            1/1/2022
                        </div>
                    </div>
                    
                    <div>
                        <div className = "billingunit checkTime">
                            14:00
                        </div>
                    </div>
                </div>

                <div className = "billingunit rowTwo">                    
                    <div>
                        <div className = "billingunit check">
                            Check-out
                        </div>
                    </div>
                    <div>
                        <div className ="billingunit checkDate">
                            2/1/2022
                        </div>
                    </div>
                    <div>
                        <div className = "billingunit checkTime">
                            18.00
                        </div>
                    </div>
                </div>
            </div>
            
        
            <div className = "billingunit middleRow">
                <div className= "billingunit parkingName">
                    Car park 1
                </div>
                <div className="billingunit number">
                    ZH 108789
                </div>
            </div>

            <div className="billingunit rightRow">
                <div className= "billingunit amountTitle">
                    Amount
                </div>
                <div className="billingunit amountValue">
                    CHF 8.00
                </div>
                <div className="billingunit durationTitle">
                    Duration
                </div>
                <div>
                    <div className="billingunit durationValue">
                        2:00h
                    </div>
                </div>
                
            </div>




            <div className="billingunit thirdRow">
                <div className="billingunit status">
                    <div className="billingunit statusTitle">
                        Payment Status
                    </div>
                    <div className="billingunit statusValue">
                        Outstanding
                    </div>
                </div>
                <div className = "billingunit buttons">
                    <Button
                    onClick={() => split()}>
                        Split
                    </Button>
                    <Button
                    onClick={() => pay()}>
                        Pay
                    </Button>
                </div>
            </div>
        </div>

        </>

    );
};

const Billing = () => {

    localStorage.setItem("userId", 1); //delete when finished
    const userId = localStorage.getItem("userId");
    const [billingData, setBillingData] = useState(null);
    
    useEffect(() => {
        async function fetchData() {
            const response = await api.get(`/billing/${userId}`)

            
            setBillingData(response);
        }
        fetchData()
    }, []);


    //const reses = [];
    //for (let r of billingData) {
    //    reses.push(<BillingUnit data={r} key={r.parkingId} user={userId}/>);
    //}

    //add after div:
    //<div>
    //  {reses}
    //</div>

    return(
        <>
        <NavbarComp />
        <BaseContainer>
            <div className = "billing titleRow"> 
                <div className = "billing mainTitle">
                    Billing
                </div>
            </div>
            
            <BillingUnit ></BillingUnit>
            {/* <BillingUnit id={userId} data={billingData} /> this should be mapped over. the data prop should get exactly one billing from the billingData list*/}
        </BaseContainer>
        
        </>
    );
}

export default Billing;

