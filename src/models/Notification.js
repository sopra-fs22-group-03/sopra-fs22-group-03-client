/**
 * Notification model
 */
 class Notification {
    constructor(data = {}) {
      this.notificationId = null;
      this.requesterId = null;
      this.requestedId = null;
      this.billingId = null;
      this.response = null;
      Object.assign(this, data);
    }
  }
  export default Notification;