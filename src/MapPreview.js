import styles from "./MapPreview.module.css";
import React, {useEffect, useRef, useState} from "react";
import mapService from "./service/MapService";

const MapPreview = () => {
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

export default MapPreview;