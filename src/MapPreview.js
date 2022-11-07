import styles from "./MapPreview.module.css";

const MapPreview = () => {
    const stations = [
        {
            id: 1,
            x: 457,
            y: 336,
            name: "Каменная",
            line_id: 1
        },
        {
            id: 2,
            x: 600,
            y: 400,
            name: "Песочная",
            line_id: 1
        },
        {
            id: 3,
            x: 675,
            y: 465,
            name: "Мраморная",
            line_id: 1
        },
        {
            id: 4,
            x: 764,
            y: 545,
            name: "Смородиновая",
            line_id: 1
        },
        {
            id: 5,
            x: 820,
            y: 660,
            name: "Глиняная",
            line_id: 1
        },
        {
            id: 6,
            x: 940,
            y: 740,
            name: "Деревянная",
            line_id: 1
        },
        {
            id: 7,
            x: 955,
            y: 340,
            name: "Отчаянная",
            line_id: 2
        },
        {
            id: 8,
            x: 850,
            y: 330,
            name: "Грустная",
            line_id: 2
        },
        {
            id: 9,
            x: 685,
            y: 350,
            name: "Нейтральная",
            line_id: 2
        },
        {
            id: 10,
            x: 600,
            y: 400,
            name: "Песочная",
            line_id: 2
        },
        {
            id: 11,
            x: 540,
            y: 545,
            name: "Ежевичная",
            line_id: 2
        },
        {
            id: 12,
            x: 510,
            y: 630,
            name: "Пальмовая",
            line_id: 2
        },
        {
            id: 13,
            x: 445,
            y: 780,
            name: "Довольная",
            line_id: 2
        },
        {
            id: 14,
            x: 380,
            y: 580,
            name: "Сосновая",
            line_id: 3
        },
        {
            id: 15,
            x: 510,
            y: 630,
            name: "Пальмовая",
            line_id: 3
        },
        {
            id: 16,
            x: 640,
            y: 690,
            name: "Каштановая",
            line_id: 3
        },
        {
            id: 17,
            x: 775,
            y: 780,
            name: "Березовая",
            line_id: 3
        },
        {
            id: 18,
            x: 390,
            y: 435,
            name: "Малиновая",
            line_id: 4
        },
        {
            id: 19,
            x: 540,
            y: 545,
            name: "Ежевичная",
            line_id: 4
        },
        {
            id: 20,
            x: 764,
            y: 545,
            name: "Смородиновая",
            line_id: 4
        },
        {
            id: 21,
            x: 890,
            y: 540,
            name: "Клубничная",
            line_id: 4
        },
        {
            id: 22,
            x: 1030,
            y: 517,
            name: "Рябиновая",
            line_id: 4
        }
    ];
    const trainLines = [
        {
            id: 1,
            name: "purple",
            color: "#AA0077"
        },
        {
            id: 2,
            name: "blue",
            color: "#0033CC"
        },
        {
            id: 3,
            name: "red",
            color: "#CC0011"
        },
        {
            id: 4,
            name: "yellow",
            color: "#888800"
        }
    ];
    const intersections = [
        {
            id: 1,
            station_id: 2
        },
        {
            id: 1,
            station_id: 10
        },
        {
            id: 2,
            station_id: 12
        },
        {
            id: 2,
            station_id: 15
        },
        {
            id: 3,
            station_id: 4
        },
        {
            id: 3,
            station_id: 20
        },
        {
            id: 4,
            station_id: 11
        },
        {
            id: 4,
            station_id: 19
        }
    ];

    const w = document.querySelector('#canvas');
    console.log(w);

    function drawStation(station) {

    }


    return (<div className={styles.wrapper}>
        <p className={styles.tittle}>Мы работаем по всей области</p>
        <div className={styles.canvas} id="canvas">

        </div>
    </div>);
}

export default MapPreview;