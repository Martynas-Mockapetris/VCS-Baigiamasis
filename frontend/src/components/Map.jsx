import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

const Map = ({data, getAddress, current_location}) => {
  const [geolocation, setGeoLocation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function checkIfSelected() {
      setIsLoading(true);
      try {
        const recieved_addresses = await data.stores;
        console.log(recieved_addresses)
        const selectedCity = await current_location;
        console.log(selectedCity)
        if (!selectedCity || selectedCity.length === 0) {
            let emptyArray = []
            for(let index of recieved_addresses) {
                emptyArray.push(index.stores_data)
            }
            let fixedArray = emptyArray.flat(Infinity)
            setGeoLocation(fixedArray)
        } else {
          recieved_addresses.forEach((address) => {
            if (selectedCity === address.location_city) {
              setGeoLocation(address.stores_data);
            }
          });
        }
      } catch (error) {
        console.log({ error: error.message });
      }
    }
    checkIfSelected()
    setIsLoading(false)
  }, [current_location]);
  return (
    <>
      {!isLoading ? (
        <MapContainer
          className="w-full h-[400px] mt-6 z-0"
          center={[55.33231603179951, 23.988324513624136]}
          zoom={7}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <>
            {geolocation.map((store) => (
              <Marker key={store._id} position={store.geo_location}>
                <Popup>
                  {store.store_name} <br /> {store.address} <br />
                  <button name='pickupLocation' onClick={getAddress(store.address)}>Select this store</button>
                </Popup>
              </Marker>
            ))}
          </>
        </MapContainer>
      ) : (
        "This ain't working my friend"
      )}
    </>
  );
};
export default Map;
/*
          return setGeoLocation([
            {
              store_name: 'Not selected',
              geo_location: [54.90547326877105, 23.89033133990547],
              address: 'Yet to be defined',
            },
            {
              store_name: 'Not selected',
              geo_location: [55.90547326877105, 24.89033133990547],
              address: 'Yet to be defined',
            }
          ]);
*/