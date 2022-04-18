import React from "react";
import BaseContainer from "components/ui/BaseContainer";
import NavbarComp from "components/ui/NavbarComp";
import { FormField } from "components/ui/FormField";
import {useEffect, useState} from "react";
import {api, handleError} from 'helpers/api';
import {Button} from 'components/ui/Button';
import "styles/views/Reservation.scss";

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
            const response = await api.put("/reservations", requestBody);

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
                            UPDATE
                        </Button>
                    </div>
                    
                </div>

            </div>
        </div>
        
    );
}


const SingleUnit = props => {

    const [parkingData, setParkingData] = useState(null);
    const [isTrue, setIsTrue] = useState(false);
    const parkingId = 100001;


    useEffect(() => {
        async function fetchData() {
            const response = await api.get(`/carparks/100000`); //change to ${props.data.parkingId}
            
            setParkingData(response.data);
        }
        fetchData()
    });

    const cancelReservation = async () => {
        try {
            const requestBody = JSON.stringify({
                //{props.data.reservationId}
            });
            const response = await api.delete(`/reservations/${props.data.reservationId}`, requestBody); 
        } catch (error){
            alert(
                `Fatal error: Something went wrong during Cancelation: \n${handleError(error)}`
              );
        }
        
    }
        return(
        <>
        <div className = "unit container">
            <div className= "unit firstRowLeft">
                <div className = "unit rowOne">
                    <div>
                        <div className = "unit check">
                            Check-in
                        </div>
                    </div>
                    
                    <div>
                        <div className="unit checkDate">
                            1/1/2022
                        </div>
                    </div>
                    
                    <div>
                        <div className = "unit checkTime">
                            14:00
                        </div>
                    </div>
                </div>

                <div className = "unit rowTwo">                    
                    <div>
                        <div className = "unit check">
                            Check-out
                        </div>
                    </div>
                    <div>
                        <div className ="unit checkDate">
                            2/1/2022
                        </div>
                    </div>
                    <div>
                        <div className = "unit checkTime">
                            18.00
                        </div>
                    </div>
                </div>
            </div>
            
        
            <div className = "unit firstRowRight">
                <div className= "unit parkingName">
                    {parkingData.name}
                </div>
                <div className="unit adress">
                    {parkingData.streetNo} {parkingData.street}
                </div>
                <div className="unit city">
                    {parkingData.zipCode} {parkingData.city}
                </div>
            </div>


            <div className="unit thirdRow">
                <div className="unit plate">
                    ZH 109919
                </div>
                <div className="unit amount">
                    CHF 8.00
                </div>
                <div className = "unit buttons">
                    <Button
                    onClick={() => setIsTrue(!isTrue)}>
                        Edit Reservation
                    </Button>
                    <Button
                    onClick={() => cancelReservation()}>
                        Cancel Reservation
                    </Button>
                </div>
            </div>
            {
                isTrue && <Booking parkingId={parkingId}/>
            }

        </div>

        </>

    );
};

const Reservation = () => {
    localStorage.setItem("userId", 1); // delete when finished
    const userId = localStorage.getItem("userId");
    const [reservationData, setReservationData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            //const response = await api.get(`/users/${userId}/reservations`);
            const response = [
                {
                    "parkingId": 100002,
                    "checkinDate": "10/10/1997",
                    "checkinTime": "19.30",
                    "checkoutDate": "19/2/2999",
                    "checkoutTime": "19.30"
                },
                {
                    "parkingId": 100003,
                    "checkinDate": "10/10/1997",
                    "checkinTime": "19.30",
                    "checkoutDate": "19/2/2999",
                    "checkoutTime": "19.30"
                }
            ]
            setReservationData(response.data);
        }
        fetchData()
    });

    return(
        <>
        <NavbarComp />
        <BaseContainer>
            <div className = "reservation titleRow"> 
                <div className = "reservation mainTitle">
                    Reservations
                </div>
            </div>
            
            <div>
                <SingleUnit data={reservationData} />
            </div>
            
            
        </BaseContainer>
        </>
    );
        
}

export default Reservation;
