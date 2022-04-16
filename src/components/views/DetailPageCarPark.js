import React from "react";
import BaseContainer from "components/ui/BaseContainer";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {api} from 'helpers/api';
import {useEffect, useState} from 'react';
import "styles/views/Profile.scss";
import {useHistory} from 'react-router-dom';
import NavbarComp from "components/ui/NavbarComp";
import "styles/views/DetailPageCarPark.scss";
import {Button} from 'components/ui/Button';

const ReservationWindow = () => {
    return(
        <div className="reservation container">
            Hello World!
            
        </div>

    );
}; 


const DetailPageCarPark = () => {
    const history = useHistory();
    //const {parkingId} = useParams();
    const[ParkingData, setParkingData] = useState([]);

    // change these two!
    console.log(parkingId)
    let parkingId = 100000;

    useEffect(() => {
        async function fetchData() {
            const response = await api.get(`/carparks/${parkingId}`);
            setParkingData(response.data);
        }
        fetchData()
    });

    const doCheckin = async () => {


    }

    const doReservation = async () => {
        <ReservationWindow />

    }

    return (
        <>
        <NavbarComp />
        <BaseContainer>
            {/*------------------- head --------------------- */}

            <div className="carpark header">
                <div className = "carpark title"> {ParkingData.name} </div>
                <div className = "carpark empty"> {ParkingData.numOfEmptySpaces}/{ParkingData.maxCapacity}</div>
            </div>
            
            <div className="carpark adressAndHours ">

                {/*------------------- adress --------------------- */}
                <div className = "carpark leftElement">
                    <div className = "carpark elementTitle">
                        Adress
                    </div>
                    <div className = "carpark Details">
                        <div className = "carpark street">
                            {ParkingData.street}
                        </div>
                        <div className = "carpark zip">
                            {ParkingData.zipCode}
                        </div>
                        <div className = "carpark city">
                            {ParkingData.city}
                        </div>
                    </div>
                </div>

                {/*------------------- hours --------------------- */}
                <div className = "carpark rightElement">
                    <div className = "carpark elementTitle">
                        Opening Hours
                    </div>
                    <div className = "carpark Details">
                        <div className = "carpark weekTitle">
                            Weekdays
                        </div>
                        <div className = "carpark week">
                            {ParkingData.weekdayOpenFrom} to {ParkingData.weekdayOpenTo}
                        </div>
                        <div className = "carpark weekTitle">
                            Weekend
                        </div>
                        <div className = "carpark week">
                            {ParkingData.weekendOpenFrom} to {ParkingData.weekendOpenTo}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="carpark tariffAndRemarks">

                {/*------------------- tariff --------------------- */}
                <div className="carpark leftElement">
                    <div className = "carpark elementTitle">
                        Tariff
                    </div>
                    <div className = "carpark Details">
                        <div className = "carpark street">
                            CHF {ParkingData.hourlyTariff} per hour
                        </div>
                    </div>              
                </div>

                {/*------------------- remarks --------------------- */}
                <div className="carpark rightElement">
                    <div className = "carpark elementTitle">
                        Remarks
                    </div>
                    <div className = "carpark Details">
                        <div className = "carpark street">
                            {ParkingData.remarks}
                        </div>
                    </div>              
                </div>
                  
            </div>
            <div className="carpark buttons">
                <Button className = "carpark check-in"> 
                    Check-in
                </Button>

                <Button 
                onClick={() => doReservation()}
                className = "carpark reservation">
                    Reservation
                </Button>
            </div>
            {/*------------------- head --------------------- */}
        </BaseContainer>
        </>
        

    );
}

export default DetailPageCarPark;