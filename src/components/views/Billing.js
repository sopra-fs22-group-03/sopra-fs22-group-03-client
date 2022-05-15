import React from "react";
import NavbarComp from "components/ui/NavbarComp";
import BaseContainer from "components/ui/BaseContainer";
import { api, handleError } from "helpers/api";
import { useEffect, useState, setTimeout, clearTimeout } from "react";
import { Button } from "components/ui/Button";
import "styles/views/Billing.scss";

const BillingUnit = (props) => {
  const [billingInfo, setBillingInfo] = useState({});
  const [parkingData, setParkingData] = useState({});
  const billingId = props.data.billingId;
  console.log(billingId);

  useEffect(() => {
    async function fetchData() {
      if (props.data.bookingType == "RESERVATION") {
        const response = await api.get(`/reservations/${props.data.bookingId}`);
        setBillingInfo(response.data);

        const responseOne = await api.get(`/carparks/${billingInfo.carparkId}`);
        setParkingData(responseOne.data);
      } else {
        // const response = await api.get(`/parkingslip/${props.data.bookingId}`)
        // setBillingInfo(response.data);
        // const responseOne = await api.get(`/carparks/${billingInfo.carparkId}`);
        // setParkingData(responseOne.data);
      }
    }
    fetchData();
  }, []);

  const split = async () => {
    try {
      const requestBody = JSON.stringify({
        username: window.prompt("Who do you want to split this bill with?"),
      });
      // POST request to /billings/${billingId}/pay invokes the split bill request
      const response = await api.post(
        `/billings/${billingId}/split`,
        requestBody
      );

      window.location.reload();
    } catch (error) {
      alert(
        `Fatal error: Something went wrong during Split: \n${handleError(
          error
        )}`
      );
    }
  };

  const pay = async () => {
    try {
      const requestBody = JSON.stringify({});
      const response = await api.post(
        `/billings/${billingId}/pay`,
        requestBody
      );

      window.location.reload();
    } catch (error) {
      alert(
        `Fatal error: Something went wrong during Payment: \n${handleError(
          error
        )}`
      );
    }
  };

  return (
    <>
      <div className="billingunit container">
        <div className="billingunit firstRowLeft">
          <div className="billingunit rowOne">
            <div>
              <div className="billingunit check">Check-in</div>
            </div>

            <div>
              <div className="billingunit checkDate">
                {billingInfo.checkinDate}
              </div>
            </div>

            <div>
              <div className="billingunit checkTime">
                {billingInfo.checkinTime}
              </div>
            </div>
          </div>

          <div className="billingunit rowTwo">
            <div>
              <div className="billingunit check">Check-out</div>
            </div>
            <div>
              <div className="billingunit checkDate">
                {billingInfo.checkoutDate}
              </div>
            </div>
            <div>
              <div className="billingunit checkTime">
                {billingInfo.checkoutTime}
              </div>
            </div>
          </div>
        </div>

        <div className="billingunit middleRow">
          <div className="billingunit parkingName">{parkingData.name}</div>
          <div className="billingunit number">{billingInfo.licensePlate}</div>
        </div>

        <div className="billingunit rightRow">
          <div className="billingunit amountTitle">Amount</div>
          <div className="billingunit amountValue">
            CHF {billingInfo.parkingFee}
          </div>
          <div></div>
        </div>

        <div className="billingunit thirdRow">
          <div className="billingunit status">
            <div className="billingunit statusTitle">Payment Status</div>
            {props.data.paymentStatus === "PAID" &&
            <div className="billingunit statusValue" style={{backgroundColor: "lightgreen", color:"green"}}>
              {props.data.paymentStatus}
            </div>
            }
            {props.data.paymentStatus === "SPLIT_REQUESTED" &&
            <div className="billingunit statusValue" style={{backgroundColor: "lightorange", color:"orange"}}>
              {props.data.paymentStatus}
            </div>
            }
            {props.data.paymentStatus === "SPLIT_ACCEPTED" &&
            <div className="billingunit statusValue" style={{backgroundColor: "lightviolet", color:"violet"}}>
              {props.data.paymentStatus}
            </div>
            }
            {props.data.paymentStatus === "OUTSTANDING" &&
            <div className="billingunit statusValue" style={{backgroundColor: "lightred", color:"red"}}>
              {props.data.paymentStatus}
            </div>
            }
            
          </div>
          <div className="billingunit buttons">
            {props.data.paymentStatus !== "PAID" &&
              props.data.paymentStatus !== "SPLIT_REQUESTED" &&
              props.data.paymentStatus !== "SPLIT_ACCEPTED" && (
                <Button onClick={() => split()}>Split</Button>
              )}
            {props.data.paymentStatus !== "PAID" &&
              props.data.paymentStatus !== "SPLIT_REQUESTED" && (
                <Button onClick={() => pay()}>Pay</Button>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

const Billing = () => {
  const userId = localStorage.getItem("currentUser");
  const [billingData, setBillingData] = useState([]);
  console.log(userId);
  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`/users/${userId}/billing`);

      setBillingData(response.data);
    }
    fetchData();
  }, []);

  const reses = [];
  for (let r of billingData) {
    reses.push(<BillingUnit data={r} key={r.billingId} user={userId} />);
  }

  return (
    <>
      <NavbarComp />
      <BaseContainer>
        <div className="billing titleRow">
          <div className="billing mainTitle">Billing</div>
        </div>
        <div>{reses}</div>
      </BaseContainer>
    </>
  );
};

export default Billing;
