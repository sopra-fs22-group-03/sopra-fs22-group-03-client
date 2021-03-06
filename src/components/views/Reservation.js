import React from "react";
import BaseContainer from "components/ui/BaseContainer";
import NavbarComp from "components/ui/NavbarComp";
import { FormField } from "components/ui/FormField";
import {useEffect, useState} from "react";
import {api, handleError} from 'helpers/api';
import {Button} from 'components/ui/Button';
import "styles/views/Reservation.scss";
import { Spinner } from "react-bootstrap";

const Booking = props => {

    const [checkinDate, setCheckinDate] = useState(null);
    const [checkinTime, setCheckinTime] = useState(null);
    const [checkoutDate, setCheckoutDate] = useState(null);
    const [checkoutTime, setCheckoutTime] = useState(null);
    const reservationId = props.reservationId;


    const doBooking = async () => {
        try {
            const requestBody = JSON.stringify({
                reservationId,
                checkinDate,
                checkinTime,
                checkoutDate,
                checkoutTime
            });
            const response = await api.put(`/reservations/${reservationId}`, requestBody);

            window.location.reload()

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
                        value = {checkinDate}
                        type = "date"
                        onChange={x => setCheckinDate(x)}>
                        </FormField>
                    </div>
                    <div className = "booking time">
                        <FormField 
                        value = {checkinTime}
                        type = "time"
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
                        value = {checkoutDate}
                        type = "date"
                        onChange={x => setCheckoutDate(x)}>
                        </FormField>
                    </div>
                    <div className = "booking time">
                        <FormField 
                        value = {checkoutTime}
                        type = "time"
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


const ReservationUnit = props => {

    const [parkingData, setParkingData] = useState({});
    const [isTrue, setIsTrue] = useState(false);
    const userId = localStorage.getItem("currentUser");

    useEffect(() => {
        async function fetchData() {
            const response = await api.get(`/carparks/${props.data.carparkId}/${userId}`); 
            
            setParkingData(response.data);
        }
        fetchData()
    }, []);

    const cancelReservation = async () => {
        try {
            const response = await api.delete(`/reservations/${props.data.reservationId}`); 

            window.location.reload()
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
                            {props.data.checkinDate}
                        </div>
                    </div>
                    
                    <div>
                        <div className = "unit checkTime">
                            {props.data.checkinTime}
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
                            {props.data.checkoutDate}
                        </div>
                    </div>
                    <div>
                        <div className = "unit checkTime">
                            {props.data.checkoutTime}
                        </div>
                    </div>
                </div>
            </div>
            
            { parkingData ?
            <div className = "unit firstRowRight">
                <div className= "unit parkingName">
                    {parkingData.name}
                </div>
                <div className="unit adress">
                    {parkingData.street} {parkingData.streetNo}
                </div>
                <div className="unit city">
                    {parkingData.zipCode} {parkingData.city}
                </div>
            </div> : <Spinner/>}


            <div className="unit thirdRow">
                <div className="unit plate">
                    {props.data.licensePlate}
                </div>
                <div className="unit amount">
                    CHF {Math.round(props.data.parkingFee * 100)/100}
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
                isTrue && <Booking reservationId={props.data.reservationId}/>
            }

        </div>

        </>

    );
};

const Reservation = () => {
    const userId = localStorage.getItem("currentUser");
    const [reservationData, setReservationData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await api.get(`/users/${userId}/reservations`);

            setReservationData(response.data);
        }
        fetchData()
    }, []);

    const reses = [];
    for (let r of reservationData) {
        reses.push(<ReservationUnit data={r} key={r.parkingId} user={userId}/>);
    }
    
    // const reses2 = reservationData.map(d => <ReservationUnit data={d}/>); --> andere M??glichkeit
                

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
                {reses}
            </div>
            
            
        </BaseContainer>
        </>
    );
        
}

export default Reservation;
