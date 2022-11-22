import mapStations from "../map/stations.json";
import mapLines from "../map/trainLines.json";
import mapIntersections from "../map/intersections.json";
import styles from "../MapPreview.module.css";
import React from "react";
import PathFinderService from "./PathFinderService";

function MapService(){
    const stations: Array = mapStations.sort((st1, st2) =>
        (st1.line_id * 1000 + st1.order) - (st2.line_id * 1000 + st2.order)
    );
    const trainLines: Array = mapLines;
    const intersections: Array = mapIntersections.sort((int1, int2) =>
        (int1.id * 100 + int1.station_id) - (int2.id * 100 + int2.station_id)
    );
    const notSelected = '#343445';
    let path = [];
    const pathFinderService = new PathFinderService(stations, intersections); //todo remove it

    this.isPathLoaded = () => path.length >= 2;

    this.getStations = () => stations;

    this.getTrainLines = () => trainLines;

    this.getIntersections = () => intersections;

    this.getUniqueStationNames = () => {
        let names = [];

        stations.forEach(st => {
            if (!names.find(n => n === st.name))
                names.push(st.name);
        })
        names.sort();
        return names;
    };

    this.normaliseStations = (height, width) => {
        const minX = Math.min(...stations.map(station => station.x));
        const maxX = Math.max(...stations.map(station => station.x));
        const minY = Math.min(...stations.map(station => station.y));
        const maxY = Math.max(...stations.map(station => station.y));

        const proportion = 0.8;
        const scaleX = (maxX - minX) / (width * proportion);
        const scaleY = (maxY - minY) / (height * proportion);

        stations.forEach(station => {
            station.x = (station.x - minX) / scaleX + (width * (1 - proportion) / 2);
            station.y = (station.y - minY) / scaleY + (height * (1 - proportion) / 2);
        });
    }

    this.getSVGPoints = () => {
        const points = [];
        const r = 10;
        const strokeWidth = 2;
        const offset = strokeWidth / 2;

        stations.forEach(st => {
            if (intersections.find(intersection => st.id === intersection.station_id))
                return;

            points.push(
                this.isPathLoaded() && !!!path.find(stId => stId == st.id)
                ? <circle cx={st.x} cy={st.y} r={r} style={{
                        fill: notSelected
                    }} key={'pointId_' + st.id} stroke="black" strokeWidth={strokeWidth}/>
                : <circle cx={st.x} cy={st.y} r={r} style={{
                    fill: trainLines.find(line => st.line_id === line.id).name
                }} key={'pointId_' + st.id} stroke="black" strokeWidth={strokeWidth}/>
            );
        });

        const drawIntersection = (intersectionId) =>{
            const intersectedStations = intersections
                .filter(intersection => intersection.id === intersectionId)
                .map(intersection => stations.find(st => st.id === intersection.station_id));

            const x = intersectedStations.reduce((sum, st) => sum + st.x, 0) / intersectedStations.length;
            const y = intersectedStations.reduce((sum, st) => sum + st.y, 0) / intersectedStations.length;

            //todo пересечние больше двух линий
            const strL = `M ${x} ${y-(r-offset)} A 1 1 0 0 0 ${x} ${y+(r-offset)} L ${x} ${y-(r-offset)} Z`;
            const strR = `M ${x} ${y-(r-offset)} L ${x} ${y+(r-offset)} A 1 1 0 0 0 ${x} ${y-(r-offset)} Z`;

            if (this.isPathLoaded() && !!!path.find(stId => stId == intersectedStations[0].id)){
                points.push(<path d={strL}
                                  key={'intersectionId_'+ intersectionId + '.stationId_' + intersectedStations[0].id}
                                  style={{fill: notSelected}}/>
                );
            }else{
                points.push(<path d={strL}
                                  key={'intersectionId_'+ intersectionId + '.stationId_' + intersectedStations[0].id}
                                  style={{fill: trainLines.find(line => intersectedStations[0].line_id === line.id).name}}/>
                );
            }

            if (this.isPathLoaded() && !!!path.find(stId => stId == intersectedStations[1].id)){
                points.push(<path d={strR}
                                  key={'intersectionId_'+ intersectionId + '.stationId_' + intersectedStations[1].id}
                                  style={{fill: notSelected}}/>
                );
            }else{
                points.push(<path d={strR}
                                  key={'intersectionId_'+ intersectionId + '.stationId_' + intersectedStations[1].id}
                                  style={{fill: trainLines.find(line => intersectedStations[1].line_id === line.id).name}}/>
                );
            }
            points.push(<circle cx={x} cy={y} r={r} key={intersectedStations[0].name} fillOpacity="0" stroke="black" strokeWidth={strokeWidth}/>);
        }

        new Set(intersections.map(intersection => intersection.id))
            .forEach(val => drawIntersection(val));

        return points;
    }

    this.getSVGLines = () => {
        const lines = [];
        const linesMap = new Map();
        const pathMap = new Map();
        const trainLinesIds = [];
        const pathTrainLinesIds = [];

        stations.forEach(st => {
            const lineId = st.line_id;

            if (!linesMap.has(lineId)) {
                linesMap.set(lineId, []);
                trainLinesIds.push(lineId);
            }
            linesMap.get(lineId).push(st.x + ',' + st.y);

            if (this.isPathLoaded() && !!path.find(stId => stId==st.id)){
                if (!pathMap.has(lineId)) {
                    pathMap.set(lineId, []);
                    pathTrainLinesIds.push(lineId);
                }
                pathMap.get(lineId).push(st.x + ',' + st.y);
            }
        });

        trainLinesIds.forEach(lineId => {
            const color = pathTrainLinesIds.length>0 ? notSelected : trainLines.find(line => lineId === line.id).color;
            const values = linesMap.get(lineId).join(' ');
            lines.push(<polyline points={values} fill="none" stroke={color} strokeWidth={10} opacity={0.8} key={'lineId_' + lineId} />)
        });

        pathTrainLinesIds.forEach(lineId => {
            const color = trainLines.find(line => lineId === line.id).color;
            const values = pathMap.get(lineId).join(' ');
            lines.push(<polyline points={values} fill="none" stroke={color} strokeWidth={10} opacity={0.8} key={'selectedLineId_' + lineId} />)
        });

        return lines;
    }

    this.getSVGTexts = () => {
        const names = [];
        const texts = [];
        const offsetX = -30;
        const offsetY = -20;

        stations.forEach(st => {
            if (!names.find(n => n === st.name))
                names.push(st.name);
            else
                return;

            texts.push(<tspan x={st.x + offsetX} y={st.y + offsetY}
                              key={'textId_' + st.id}>{st.name}</tspan>);
        })
        return <text className={styles.stations_names}>{texts}</text>;
    }

    this.loadPath = (st1, st2) => {
        path = pathFinderService.findPathIds(st1, st2);
    };

    this.unLoadPath = () => { path = [];};
}

const mapService = new MapService();

export default mapService;