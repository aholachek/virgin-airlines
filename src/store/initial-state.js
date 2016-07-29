import stubData from './stub-data'
import _ from 'lodash'


export default {

  guestType : undefined,
  tripType : 'Round Trip',
  departingFrom : undefined,
  departingTo : undefined,
  departDate : undefined,
  returnDate : undefined,

  fromFlexibility : 0,
  toFlexibility : 0,
  mustBeDirect  : false,
  refundable : false,
  preferencesChecked : false,

  datesAndPlacesProgress : 0,

  flights : {},

  //user chosen flight
  departingFlight : undefined,
  returningFlight : undefined,

  checkedBagsFrom : 0,
  checkedBagsTo : 0,

  powerTrip : false,
  plansChangePackage : false
}
