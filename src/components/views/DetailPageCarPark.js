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
import { FormField } from "components/ui/FormField";

const Booking = () => {
    const [checkinDate, setCheckinDate] = useState(null);
    const [checkinTime, setCheckinTime] = useState(null);
    const [checkoutDate, setCheckoutDate] = useState(null);
    const [checkoutTime, setCheckoutTime] = useState(null);

    const doBooking = async () => {


    }

    return(
        <div className="booking container">
            <div className = "booking checkinAll">
                <div className = "booking checkin">
                    Check-in
                </div>
                <FormField 
                className = "booking beginDate"
                innerLabel = "date at beginning"
                value = {checkinDate}
                onChange={x => setCheckinDate(x)}>

                </FormField>
                <FormField 
                className = "booking beginTime"
                innerLabel = "time at beginning"
                value = {checkinTime}
                onChange={x => setCheckinTime(x)}>

                </FormField>
                <div className = "booking checkout">
                    Check-out
                </div>
                <FormField 
                className = "booking endDate"
                innerLabel = "date at end"
                value = {checkoutDate}
                onChange={x => setCheckoutDate(x)}>

                </FormField>
                <FormField 
                className ="booking endTime"
                innerLabel = "time at end"
                value = {checkoutTime}
                onChange={x => setCheckoutTime(x)}>

                </FormField>
                <Button 
                className = "booking button"
                disabled={!checkinDate || !checkinTime || !checkoutDate || !checkoutTime}
                width="100%"
                onClick={() => doBooking()}
                >
                    BOOK
                </Button>
            </div>
        </div>
    );
}


const DetailPageCarPark = () => {
    const history = useHistory();
    const [isTrue, setIsTrue] = useState(false);
    const {parkingId} = useParams();
    const[ParkingData, setParkingData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await api.get(`/carparks/${parkingId}`);
            setParkingData(response.data);
        }
        fetchData()
    });

    const doCheckin = async () => {


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
                onClick={() => setIsTrue(!isTrue)}
                className = "carpark reservation">
                    Reservation
                </Button>
            </div>

            {
                isTrue && <Booking />
            }


            {/*------------------- head --------------------- */}
        </BaseContainer>
        </>
        

    );
}

export default DetailPageCarPark;