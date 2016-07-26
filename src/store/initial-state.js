import stubData from './stub-data'
import _ from 'lodash'


export default {

  guestType : undefined,
  tripType : 'Round Trip',
  departingFrom : undefined,
  returningTo : undefined,
  departDate : undefined,
  arriveDate : undefined,

  fromFlexibility : 0,
  toFlexibility : 0,
  mustBeDirect  : false,
  timeOfDay : ['morning', 'day', 'evening'],
  class : [],


  checkedBagsFrom : 0,
  checkedBagsTo : 0
}
