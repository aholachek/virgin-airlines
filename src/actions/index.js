
import _ from 'lodash'
import moment from 'moment'


export function updateVariable(data){
  return { type: "update_variable", data : data }
}


/*
generateFlights
 */

 function randomFlightGenerator (type, data){
   let departPlace, departDate, arrivePlace, arriveDate;

   if (type === 'departing'){
   departPlace = data.departingFrom;
   departDate = moment(data.departDate);
   arrivePlace = data.departingTo;
   }
   else if (type== 'returning') {
     departPlace = data.departingTo;
     departDate= moment(data.returnDate);
     arrivePlace = data.departingFrom;
   }

   return _.range(_.random(4,9)).map(function(){
     var flightData = {id : _.uniqueId()};

     flightData.leg1 = {};
     flightData.leg1.departTime = departDate.clone().add(_.random(0, 12), 'hours');
     flightData.leg1.departPlace = departPlace;
     flightData.leg1.arriveTime =  flightData.leg1.departTime.clone().add(_.random(2,10), 'hours');
     flightData.leg1.arrivePlace = 'New York/La Guardia, NY (LGA)'

     flightData.leg1.number = _.random(105, 980);

     flightData.layoverTime = _.random(2, 9);

     flightData.leg2 = {};
     flightData.leg2.departTime =  flightData.leg1.arriveTime.clone().add(flightData.layoverTime, 'hours');
     flightData.leg2.departPlace =  flightData.leg1.arrivePlace;
     flightData.leg2.arriveTime =  flightData.leg2.departTime.clone().add(_.random(2,10), 'hours');
     flightData.leg2.arrivePlace = arrivePlace;

     flightData.leg2.number = _.random(105, 980);

     flightData.totalTime = moment.duration(flightData.leg2.arriveTime.diff(flightData.leg1.departTime)).asHours();

     //classes
     flightData.classes = {
       'main class' : _.random(150, 300),
       'main class plus' : _.random(300, 600),
       'first class' : _.random(1000, 3000),
     }

     return flightData;

   }, this);

 }


export function generateFlights(){

  return (dispatch, getState) => {

    const flights = {};
    flights.departing = randomFlightGenerator('departing', getState());
    flights.returning = randomFlightGenerator('returning', getState());

    dispatch(updateVariable({
      flights : flights
    }));

  }
}
