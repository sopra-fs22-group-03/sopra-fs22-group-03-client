import React from "react";
import NavbarComp from "components/ui/NavbarComp";
import BaseContainer from "components/ui/BaseContainer";
import { api, handleError } from "helpers/api";
import { useEffect, useState, setTimeout, clearTimeout } from "react";
import { Button } from "components/ui/Button";
import "styles/views/Notifications.scss";

const NotificationUnit = (props) => {
  const [baseInfo, setBaseInfo] = useState([]);
  const [billingInfo, setBillingInfo] = useState([]);
  const [parkingData, setParkingData] = useState([]);
  const notificationId = props.data.notificationId;
  const requesterId = props.data.requesterId;
  const billingId = props.data.billingId;

  useEffect(() => {
    async function fetchBase() {
      try {
        const response = await api.get(`/billings/${billingId}`);
        setBaseInfo(response.data);

        if (response.data.bookingType === "RESERVATION") {
          const responseOne = await api.get(
            `/reservations/${response.data.bookingId}`
          );
          setBillingInfo(responseOne.data);

          // TODO: Backend endpoint that fetches carpark info only
          const responseTwo = await api.get(
            `/carparks/${responseOne.data.carparkId}/${requesterId}`
          );
          setParkingData(responseTwo.data);
        } else {
          const responseOne = await api.get(
            `/parkingslips/${response.data.bookingId}`
          );
          setBillingInfo(responseOne.data);

          // TODO: Backend endpoint that fetches carpark info only
          const responseTwo = await api.get(
            `/carparks/${responseOne.data.carparkId}/${requesterId}`
          );
          setParkingData(responseTwo.data);
        }

        // const response = await api.get(`/parkingslip/${props.data.bookingId}`)
        // setBillingInfo(response.data);

        // const responseOne = await api.get(`/carparks/${billingInfo.carparkId}`);
        // setParkingData(responseOne.data);
      } catch (error) {
        alert(
          `Error: Something went wrong during Notification fetching \n${handleError(
            error
          )}`
        );
      }
    }
    fetchBase();
  }, []);
  console.log(billingId);

  const accept = async () => {
    try {
      const requestBody = JSON.stringify({ requestIsAccepted: "true" });
      const response = await api.post(
        `/notifications/${notificationId}/response`,
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

  const decline = async () => {
    try {
      const requestBody = JSON.stringify({ requestIsAccepted: "false" });
      const response = await api.post(
        `/notifications/${notificationId}/response`,
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
        <h2>
          {props.data.requesterUsername} has just requested a 50/50 split!
        </h2>
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
            CHF {billingInfo.parkingFee / 2}
          </div>
          <div></div>
        </div>

        <div className="billingunit thirdRow">
          <div className="billingunit status">
            <div className="billingunit statusTitle">Split Request Status</div>
            <div className="billingunit statusValue">
              {props.data.splitRequestStatus}
            </div>
          </div>
          <div className="billingunit buttons">
            {props.data.paymentStatus !== "PAID" && (
              <Button onClick={() => accept()}>Accept</Button>
            )}
            {props.data.paymentStatus !== "PAID" && (
              <Button onClick={() => decline()}>Decline</Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const Notifications = () => {
  const userId = localStorage.getItem("currentUser");
  const [notificationData, setNotificationData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`/users/${userId}/notifications`);

      setNotificationData(response.data);
    }
    fetchData();
  }, []);

  const reses = [];
  for (let r of notificationData) {
    reses.push(
      <NotificationUnit data={r} key={r.notificationId} user={userId} />
    );
  }

  return (
    <>
      <NavbarComp />
      <BaseContainer>
        <div className="billing titleRow">
          <div className="billing mainTitle">Notifications</div>
        </div>
        <div>{reses}</div>
      </BaseContainer>
    </>
  );
};

export default Notifications;
