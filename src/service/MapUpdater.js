import serverAPI from "./Server";
import mapService from "./MapService";

class MapUpdater{
    async update(){
        return fetch(serverAPI.map, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Accept-Language': 'ru'
            }
        })
            .then(response => {
            return response.json().then(mapResponse => {
                switch (response.status){
                    case 200:
                        mapService.loadMap(
                            mapResponse.stations,
                            mapResponse.trainLines,
                            mapResponse.intersections
                        );
                        break;
                    default:
                        console.log('Could not get map from server');
                }
            });
        })
    }
}

export default new MapUpdater();