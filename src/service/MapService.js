import styles from "../MapPreview.module.css";
import React from "react";
import PathFinderService from "./PathFinderService";

class MapService{
    notSelected = '#666685';
    stations: Array;
    trainLines: Array;
    intersections: Array;
    path = [];
    _height = null;
    _width = null;
    pathFinderService;

    isPathLoaded(){
        return this.path.length >=2;
    }

    getUniqueStationNames(){
        let names = [];

        this.stations.forEach(st => {
            if (!names.find(n => n === st.name))
                names.push(st.name);
        })
        names.sort();
        return names;
    }

    loadMap(mapStations, mapLines, stationIntersections){
        this.stations = mapStations.sort((st1, st2) =>
            (st1.lineId * 1000 + st1.order) - (st2.lineId * 1000 + st2.order)
        );
        this.trainLines = mapLines;
        this.intersections = stationIntersections.sort((int1, int2) =>
            (int1.id * 100 + int1.stationId) - (int2.id * 100 + int2.stationId)
        );

        this.pathFinderService = new PathFinderService(this.stations, this.intersections);
    }

    normaliseStations(height, width){
        this._height = height;
        this._width = width;

        const minX = Math.min(...this.stations.map(station => station.x));
        const maxX = Math.max(...this.stations.map(station => station.x));
        const minY = Math.min(...this.stations.map(station => station.y));
        const maxY = Math.max(...this.stations.map(station => station.y));

        const proportion = 0.8;
        const scaleX = (maxX - minX) / (width * proportion);
        const scaleY = (maxY - minY) / (height * proportion);

        this.stations.forEach(station => {
            station.x = (station.x - minX) / scaleX + (width * (1 - proportion) / 2);
            station.y = (station.y - minY) / scaleY + (height * (1 - proportion) / 2);
        });
    }

    getSVGPoints(){
        const points = [];
        const r = this._height ? this._height/45 : 10;
        const strokeWidth = r / 5;
        const offset = r / 10;

        this.stations.forEach(st => {
            if (this.intersections.find(intersection => st.id === intersection.stationId))
                return;

            points.push(
                this.isPathLoaded() && !this.path.find(stId => stId === st.id)
                    ? <circle cx={st.x} cy={st.y} r={r} style={{
                        fill: this.notSelected
                    }} key={'pointId_' + st.id} stroke="black" strokeWidth={strokeWidth}/>
                    : <circle cx={st.x} cy={st.y} r={r} style={{
                        fill: this.trainLines.find(line => st.lineId === line.id).name
                    }} key={'pointId_' + st.id} stroke="black" strokeWidth={strokeWidth}/>
            );
        });

        const drawIntersection = (intersectionId) => {
            const intersectedStations = this.intersections
                .filter(intersection => intersection.id === intersectionId)
                .map(intersection => this.stations.find(st => st.id === intersection.stationId));

            const x = intersectedStations.reduce((sum, st) => sum + st.x, 0) / intersectedStations.length;
            const y = intersectedStations.reduce((sum, st) => sum + st.y, 0) / intersectedStations.length;

            //todo пересечние больше двух линий
            const strL = `M ${x} ${y-(r-offset)} A 1 1 0 0 0 ${x} ${y+(r-offset)} L ${x} ${y-(r-offset)} Z`;
            const strR = `M ${x} ${y-(r-offset)} L ${x} ${y+(r-offset)} A 1 1 0 0 0 ${x} ${y-(r-offset)} Z`;

            if (this.isPathLoaded() && !this.path.find(stId => stId === intersectedStations[0].id)){
                points.push(<path d={strL}
                                  key={'intersectionId_'+ intersectionId + '.stationId_' + intersectedStations[0].id}
                                  style={{fill: this.notSelected}}/>
                );
            }else{
                points.push(<path d={strL}
                                  key={'intersectionId_'+ intersectionId + '.stationId_' + intersectedStations[0].id}
                                  style={{fill: this.trainLines.find(line => intersectedStations[0].lineId === line.id).name}}/>
                );
            }

            if (this.isPathLoaded() && !this.path.find(stId => stId === intersectedStations[1].id)){
                points.push(<path d={strR}
                                  key={'intersectionId_'+ intersectionId + '.stationId_' + intersectedStations[1].id}
                                  style={{fill: this.notSelected}}/>
                );
            }else{
                points.push(<path d={strR}
                                  key={'intersectionId_'+ intersectionId + '.stationId_' + intersectedStations[1].id}
                                  style={{fill: this.trainLines.find(line => intersectedStations[1].lineId === line.id).name}}/>
                );
            }
            points.push(<circle cx={x} cy={y} r={r} key={intersectedStations[0].name} fillOpacity="0" stroke="black" strokeWidth={strokeWidth}/>);
        };

        new Set(this.intersections.map(intersection => intersection.id))
            .forEach(val => drawIntersection(val));

        return points;
    }

    getSVGLines(){
        const strokeWidth = this._height ? this._height/45 : 10;
        const lines = [];
        const linesMap = new Map();
        const pathMap = new Map();
        const trainLinesIds = [];
        const pathTrainLinesIds = [];

        this.stations.forEach(st => {
            const lineId = st.lineId;

            if (!linesMap.has(lineId)) {
                linesMap.set(lineId, []);
                trainLinesIds.push(lineId);
            }
            linesMap.get(lineId).push(st.x + ',' + st.y);

            if (this.isPathLoaded() && !!this.path.find(stId => stId === st.id)){
                if (!pathMap.has(lineId)) {
                    pathMap.set(lineId, []);
                    pathTrainLinesIds.push(lineId);
                }
                pathMap.get(lineId).push(st.x + ',' + st.y);
            }
        });

        trainLinesIds.forEach(lineId => {
            const color = pathTrainLinesIds.length > 0 ? this.notSelected : this.trainLines.find(line => lineId === line.id).color;
            const values = linesMap.get(lineId).join(' ');
            lines.push(<polyline points={values} fill="none" stroke={color} strokeWidth={strokeWidth} opacity={0.8} key={'lineId_' + lineId} />)
        });

        pathTrainLinesIds.forEach(lineId => {
            const color = this.trainLines.find(line => lineId === line.id).color;
            const values = pathMap.get(lineId).join(' ');
            lines.push(<polyline points={values} fill="none" stroke={color} strokeWidth={strokeWidth} opacity={0.8} key={'selectedLineId_' + lineId} />)
        });

        return lines;
    }

    getSVGTexts(){
        const fontSize = `${17 * (this._width ? this._width/630 : 1)}px`;
        const names = [];
        const texts = [];
        const offsetX = -50 * (this._width ? this._width/600 : 1);
        const offsetY = -20 * (this._height ? this._height/450 : 1);

        this.stations.forEach(st => {
            if (!names.find(n => n === st.name))
                names.push(st.name);
            else
                return;

            texts.push(<tspan x={st.x + offsetX} y={st.y + offsetY}
                              key={'textId_' + st.id} fontSize={fontSize}>{st.name}</tspan>);
        })
        return <text className={styles.stations_names}>{texts}</text>;
    }

    loadPath(st1, st2){
        this.path = this.pathFinderService.findPathIds(st1, st2);
    }

    unLoadPath(){
        this.path = [];
    }

    getStationNameById(id){
        return this.stations.find(station => station.id == id).name;
    }

    getStationIdByName(name){
        return this.stations.find(station => station.name === name).id;
    }
}

export default new MapService();