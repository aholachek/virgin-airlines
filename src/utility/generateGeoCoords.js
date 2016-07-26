
import _ from 'lodash'

export default function generateGeoCoords(lat, long){
  var extent = .1;
return [_.random(lat - extent, lat + extent), _.random(long - extent, long + extent) ]

}
