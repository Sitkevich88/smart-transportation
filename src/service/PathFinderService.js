function PathFinderService(stations, intersections){
    const graph = {};
    
    const initial = () =>{
        const linesMap = new Map();
        const trainLinesIds = [];

        stations.forEach(st => {
            const lineId = st.lineId;

            if (!linesMap.has(lineId)) {
                linesMap.set(lineId, []);
                trainLinesIds.push(lineId)
            }

            linesMap.get(lineId).push(st.id);
        });

        trainLinesIds.forEach(trLnId => {
            linesMap.get(trLnId).forEach((stId, i, arr) => {
                const prevStId = i!==0 ? arr[i-1] : null;
                graph[stId] = [];

                if (prevStId === null)
                    return;

                graph[stId].push(prevStId);
                graph[prevStId].push(stId);
            });
        });

        const intDictionary = {};
        intersections.forEach((curInt) => {
            const intId = curInt.id;
            const stId = curInt.stationId;

            if (!intDictionary.hasOwnProperty(intId + ""))
                intDictionary[intId + ""] = [];
            intDictionary[intId + ""].push(stId);
        });

        for (let key in intDictionary){
            let stIds = intDictionary[key];
            //todo если пересекается больше 2-х линий, то код надо переделать
            const id1 = stIds[0];
            const id2 = stIds[1];
            graph[id1].push(id2);
            graph[id2].push(id1);
        }
    };

    const bfs = (stationId1, stationId2) => {
        function Destinations(){
            stations.forEach(st => {
                this[st.id] = {previous: null, visited: false};
            });
        }

        function trackJourney(destinations, st1, st2){
            const path = [st2];
            let previous = destinations[st2].previous;
            while (previous != null){
                path.unshift(previous);
                previous = destinations[previous].previous;
            }

            return path;
        }

        const destinations = new Destinations();
        const queue = [];
        destinations[stationId1].visited = true;
        queue.push(stationId1);

        while(queue.length > 0) {
            const currentStationId = queue.shift();

            for (let destination of graph[currentStationId]){
                if(destinations[destination].visited)
                    continue;

                queue.push(destination);
                destinations[destination] = {visited: true, previous: currentStationId};

                if(stationId2 === destination)
                    return trackJourney(destinations, stationId1, stationId2);
            }
        }
        return [];
    };
    
    initial();

    this.findPathIds = (name1, name2) => {
        const stId1 = stations.find(st => st.name === name1).id;
        const stId2 = stations.find(st => st.name === name2).id;
        if (!!!stId1 || !!!stId2)
            return [];

        return bfs(stId1, stId2);
    }
}

export default PathFinderService;