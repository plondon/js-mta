## Install
```
npm install js-mta --save
```

## Usage
```
const mta = new MTA(API_KEY);

// get stops
(async () => {
  const stops = await mta.stops().then();
  console.log(stops)
  // {
  //   '101': {
  //     stop_id: '101',
  //     stop_code: '',
  //     stop_name: 'Van Cortlandt Park-242 St',
  //     stop_desc: '',
  //     stop_lat: '40.889248',
  //     stop_lon: '-73.898583',
  //     zone_id: '',
  //     stop_url: '',
  //     location_type: '1',
  //     parent_station: ''
  //   },
  ...
})();

// get trips
(async () => {
  const trips = await mta.trips().then();
  console.log(trips)
  //  {
  //   'AFA19GEN-1037-Sunday-00_000600_1..S03R': {
  //     route_id: '1',
  //     service_id: 'AFA19GEN-1037-Sunday-00',
  //     trip_id: 'AFA19GEN-1037-Sunday-00_000600_1..S03R',
  //     trip_headsign: 'South Ferry',
  //     direction_id: '1',
  //     block_id: '',
  //     shape_id: '1..S03R'
  //   },
  ...
})();
```

### Helpful Links
* https://transitfeeds.com/p/mta/234
* https://github.com/aamaliaa/mta-gtfs
* https://api.mta.info/#/subwayRealTimeFeeds
