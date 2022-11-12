import styles from "./MapPreview.module.css";
import React from "react";
import mapStations from './map/stations.json';
import mapLines from './map/trainLines.json';
import mapIntersections from './map/intersections.json';

const MapPreview = () => {
    const stations: Array = mapStations;
    const trainLines: Array = mapLines;
    const intersections: Array = mapIntersections;
    const canvas = React.createRef();

    normaliseStations(stations, 630, 440); //todo get width and height of canvas
    const points = getSVGPoints(stations, trainLines, intersections);
    const lines = getSVGLines(stations, trainLines);
    const names = getSVGTexts(stations);

    return (<div className={styles.wrapper}>
        <p className={styles.tittle}>Мы работаем по всей области</p>
        <div className={styles.canvas} id="canvas" ref={canvas}>
            <svg className={styles.svg}>
                {lines}
                {points}
                {names}
            </svg>
        </div>
    </div>);
}

function normaliseStations(stations, width, height){
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

function getSVGPoints(stations, trainLines, intersections){
    const points = [];
    const r = 10;
    const strokeWidth = 2;
    const offset = strokeWidth / 2;

    stations.forEach(st => {
        if (intersections.find(intersection => st.id === intersection.station_id))
            return;

        points.push(
            <circle cx={st.x} cy={st.y} r={r} style={{
                fill: trainLines.find(line => st.line_id === line.id).name
            }} key={st.id} stroke="black" strokeWidth={strokeWidth}/>
        );
    });

    function drawIntersection(intersectionId){
        const intersectedStations = intersections
            .filter(intersection => intersection.id === intersectionId)
            .map(intersection => stations.find(st => st.id === intersection.station_id));

        const x = intersectedStations.reduce((sum, st) => sum + st.x, 0) / intersectedStations.length;
        const y = intersectedStations.reduce((sum, st) => sum + st.y, 0) / intersectedStations.length;

        //todo пересечние больше двух линий
        const strL = `M ${x} ${y-(r-offset)} A 1 1 0 0 0 ${x} ${y+(r-offset)} L ${x} ${y-(r-offset)} Z`;
        const strR = `M ${x} ${y-(r-offset)} L ${x} ${y+(r-offset)} A 1 1 0 0 0 ${x} ${y-(r-offset)} Z`;

        points.push(...[
            (<path d={strL} key={intersectedStations[0].id } style={{fill: trainLines.find(line => intersectedStations[0].line_id === line.id).name}}/>),
            (<path d={strR} key={intersectedStations[1].id} style={{fill: trainLines.find(line => intersectedStations[1].line_id === line.id).name}}/>),
            <circle cx={x} cy={y} r={r} key={intersectedStations[0].name} fillOpacity="0" stroke="black" strokeWidth={strokeWidth}/>
        ]);
    }

    new Set(intersections.map(intersection => intersection.id)).forEach(val => drawIntersection(val));

    return points;
}

function getSVGLines(stations, trainLines){
    const linesMap = new Map();
    const lines = [];
    const trainLinesIds = [];

    stations.forEach(st => {
        const lineId = st.line_id;

        if (!linesMap.has(lineId)) {
            linesMap.set(lineId, []);
            trainLinesIds.push(lineId)
        }

        linesMap.get(lineId).push(st.x + ',' + st.y);
    });

    trainLinesIds.forEach(lineId => {
        const color = trainLines.find(line => lineId === line.id).color;
        const values = linesMap.get(lineId).join(' ');
        lines.push(<polyline points={values} fill="none" stroke={color}  strokeWidth={10} key={lineId} />)
    })

    return lines;
}

function getSVGTexts(stations){
    const names = [];
    const texts = [];
    const offsetX = -30;
    const offsetY = -20;

    stations.forEach(st => {
        if (!names.find(n => n === st.name))
            names.push(st.name);
        else
            return;

        texts.push(<tspan x={st.x + offsetX} y={st.y + offsetY} >{st.name}</tspan>);
    })
    return <text className={styles.stations_names}>{texts}</text>;
}

export default MapPreview;