import styles from "./MapPreview.module.css";
import React, {useEffect, useRef, useState} from "react";
import mapService from "./service/MapService";

const Map = (props) => {
    let station1 = props.station1;
    let station2 = props.station2;
    const canvas = useRef(null);
    const [points, setPoints] = useState([]);
    const [lines, setLines] = useState([]);
    const [names, setNames] = useState([]);

    useEffect(() => {
        const h = canvas.current.offsetHeight;
        const w = canvas.current.offsetWidth;

        mapService.normaliseStations(h, w);
        setPoints(mapService.getSVGPoints());
        setLines(mapService.getSVGLines());
        setNames(mapService.getSVGTexts());
    }, []);

    useEffect(()=>{
        console.log(station1, station2)
    }, [station1, station2])

    return (<div className={styles.wrapper}>
        <div className={styles.canvas} id="canvas" ref={canvas}>
            <svg className={styles.svg}>
                {lines}
                {points}
                {names}
            </svg>
        </div>
    </div>);
}

export default Map;