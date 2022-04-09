/**
 * Carpark model
 */
 class Carpark {
    constructor(data = {}) {
      this.carparkId = null;
      this.name = null;
      this.maxCapacity = null;
      this.numOfEmptySpaces = null;
      this.street = null;
      this.streetNo = null;
      this.zipCode = null;
      this.city = null;
      this.longitude = null;
      this.latitude = null;
      this.open = null;
      this.weekDayOpenFrom = null;
      this.weekDayOpenTo = null;
      this.hourlyTariff = null;
      this.remarks = null;
      Object.assign(this, data);
    }
  }
  export default Carpark;