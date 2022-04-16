import React from "react";
import BaseContainer from "components/ui/BaseContainer";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {api} from 'helpers/api';
import {useEffect, useState} from 'react';
import "styles/views/Profile.scss";
import {useHistory} from 'react-router-dom';
import NavbarComp from "components/ui/NavbarComp";

const DetailPageCarPark = () => {
    const history = useHistory();
    const {parkingId} = useParams();
    const[ParkingData, setParkingData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await api.get(`/carparks/${parkingId}`);
            setParkingData(response.data);
        }
        fetchData()
    });

    return (
        <>
        <NavbarComp />
        <BaseContainer>
            <h1> Hello </h1>
        </BaseContainer>
        </>
        

    );
}

export default DetailPageCarPark;