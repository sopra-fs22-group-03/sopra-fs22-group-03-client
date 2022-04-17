import React from "react";
import BaseContainer from "components/ui/BaseContainer";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {api, handleError} from 'helpers/api';
import {useEffect, useState} from 'react';
import "styles/views/Profile.scss";
import {useHistory} from 'react-router-dom';
import NavbarComp from "components/ui/NavbarComp";
import "styles/views/DetailPageCarPark.scss";
import {Button} from 'components/ui/Button';
import { FormField } from "components/ui/FormField";

const Booking = props => {

    const [checkinDate, setCheckinDate] = useState(null);
    const [checkinTime, setCheckinTime] = useState(null);
    const [checkoutDate, setCheckoutDate] = useState(null);
    const [checkoutTime, setCheckoutTime] = useState(null);
    const parkingId = props.parkingId;
    const userId = 1; // change this here to the actual user id


    const doBooking = async () => {
        try {
            const requestBody = JSON.stringify({
                userId,
                parkingId,
                checkinDate,
                checkinTime,
                checkoutDate,
                checkoutTime
            });
            const response = await api.post("/reservations", requestBody);

        } catch (error) {
            alert(
              `Something went wrong during reservation: \n${handleError(error)}`
            );
        }

    }

    return(
        <div className="booking container">
            <div className = "booking checkinAll">
                <div className = "booking checkinContainer">
                    <div className = "booking check">
                        Check-in
                    </div>
                    <div className = "booking date">
                        <FormField 
                        innerLabel = "date at beginning"
                        value = {checkinDate}
                        onChange={x => setCheckinDate(x)}>
                        </FormField>
                    </div>
                    <div className = "booking time">
                        <FormField 
                        innerLabel = "time at beginning"
                        value = {checkinTime}
                        onChange={x => setCheckinTime(x)}>
                        </FormField>
                    </div>
                </div>
                <div className="booking checkoutContainer">
                    <div className = "booking check">
                        Check-out
                    </div>
                    <div className = "booking date">
                        <FormField 
                        innerLabel = "date at end"
                        value = {checkoutDate}
                        onChange={x => setCheckoutDate(x)}>
                        </FormField>
                    </div>
                    <div className = "booking time">
                        <FormField 
                        innerLabel = "time at end"
                        value = {checkoutTime}
                        onChange={x => setCheckoutTime(x)}>

                        </FormField>
                    </div>
                </div>
                <div className = "booking buttonContainer">
                    <div className ="booking button">
                        <Button 
                        disabled={!checkinDate || !checkinTime || !checkoutDate || !checkoutTime}
                        width="100%"
                        onClick={() => doBooking()}
                        >
                            BOOK
                        </Button>
                    </div>
                    
                </div>

            </div>
        </div>
    );
}


const DetailPageCarPark = () => {
    const history = useHistory();
    const [isTrue, setIsTrue] = useState(false);
    const {parkingId} = useParams();
    const[ParkingData, setParkingData] = useState([]);
    const userId = 1; //change this once clear

    useEffect(() => {
        async function fetchData() {
            const response = await api.get(`/carparks/${parkingId}`);
            setParkingData(response.data);
        }
        fetchData()
    });

    const doCheckin = async () => {
        try {

            const requestBody = JSON.stringify({
                userId
            });
            const response = await api.post(`/carparks/${parkingId}/checkin`, requestBody);

        } catch (error) {

            try{
                const requestBody = JSON.stringify({
                    userId
                });
                const response = await api.post(`/carparks/${parkingId}/checkout`, requestBody);
            
            } catch (error) {
                alert(
                    `Fatal error, checkin doesn't work at the moment: \n${handleError(error)}`
                  );
            }
        }
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
                <Button 
                onClick={() => doCheckin()}
                className = "carpark check-in"> 
                    Check-in
                </Button>

                <Button 
                onClick={() => setIsTrue(!isTrue)}
                className = "carpark reservation">
                    Reservation
                </Button>
            </div>

            {
                isTrue && <Booking parkingId={parkingId}/>
            }


            {/*------------------- head --------------------- */}
        </BaseContainer>
        </>
        

    );
}

export default DetailPageCarPark;