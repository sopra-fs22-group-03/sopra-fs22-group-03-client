/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.userId = null;
    this.username = null;
    this.password = null;
    this.street = null;
    this.streetNo = null;
    this.zipCode = null;
    this.city = null;
    this.phoneNumber = null;
    this.email = null;
    this.creditCardNumber = null;
    this.licensePlate = null;
    this.isManager = null;
    this.token = null;
    this.isLoggedIn = null;
    Object.assign(this, data);
  }
}
export default User;