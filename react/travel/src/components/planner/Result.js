import axios from "axios";
import "../../css/planner/Result.css";
import { useIdContext } from "../Context";
import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

function Result() {
    const [trafficList, setTrafficList] = useState({});
    const [formerPlaceList, setFormerPlacelist] = useState({});
    const url = "https://api.odsay.com/v1/api/searchPubTransPathT";
    const apiKey = "UBD5HQP6Ab9xamTALuQjRlz8OdqYpZzUdtzo270Z9D8";
    const trafficRef = useRef([]);

    const { placeList, setPlaceList } = useIdContext();

    useEffect(() => {
        if (placeList.length >= 2) {
            fetchData();
        }
    }, [placeList]);

    const fetchData = async () => {
        let traffic = [];
        try {
            for (let i = 0; i < placeList.length - 1; i++) {
                let sx = placeList[i].coord.coordX;
                let sy = placeList[i].coord.coordY;
                let ex = placeList[i + 1].coord.coordX;
                let ey = placeList[i + 1].coord.coordY;
                let coordId =
                    sx.toString() +
                    sy.toString() +
                    ex.toString() +
                    ey.toString();

                const currPath = trafficRef.current.filter(
                    (data) => data.id === coordId
                );

                if (currPath.length === 0) {
                    let res = await axios.get(
                        url +
                            `?apiKey=${apiKey}&SX=${sx}&SY=${sy}&EX=${ex}&EY=${ey}`
                    );
                    console.log("api called");
                    if (res.data.result === undefined) {
                        trafficRef.current = [
                            ...trafficRef.current,
                            { id: coordId, time: res.data.error.msg },
                        ];
                        traffic.push(res.data.error.msg);
                    } else {
                        trafficRef.current = [
                            ...trafficRef.current,
                            {
                                id: coordId,
                                time:
                                    res.data.result.path[0].info.totalTime +
                                    "분 소요",
                            },
                        ];
                        traffic.push(
                            res.data.result.path[0].info.totalTime + "분 소요"
                        );
                    }
                } else {
                    traffic.push(currPath[0].time);
                }
            }
            setTrafficList(traffic);
            setFormerPlacelist(placeList);
        } catch (e) {
            console.log(e);
        }
    };

    const changeOrder = (direction, idx) => {
        for (let i = 0; i < placeList.length; i++) {
            if (i === idx) {
                var tmp = placeList[i];
                if (direction === "up" && i !== 0) {
                    placeList[i] = placeList[i - 1];
                    placeList[i - 1] = tmp;
                } else if (direction === "down" && i !== placeList.length - 1) {
                    placeList[i] = placeList[i + 1];
                    placeList[i + 1] = tmp;
                }
            }
        }
        setPlaceList([...placeList]);
    };

    const deletePlace = (title, id) => {
        if (window.confirm(`${title} 일정을 삭제하시겠습니까?`)) {
            console.log(id);
            setPlaceList(placeList.filter((place) => place.id !== id));
        }
    };

    const deletePlaces = () => {
        if (window.confirm("전체 일정을 삭제하시겠습니까?")) {
            setPlaceList([]);
        }
    };

    const savePlaces = () => {
        console.log(placeList);
        if (window.confirm("일정을 저장하시겠습니까?")) {
            window.location.href = "/confirm";
            // 이걸로 넘어가면 context가 살아남지 못한다! 페이지가 바뀌어 버리므로!
        }
    };

    const result = placeList.map((data, idx) => {
        let returnBody = (
            <Row>
                <Col xs={7}>
                    <small>{data.title}</small>
                </Col>
                <Col>
                    <Button
                        size="sm"
                        onClick={() => {
                            changeOrder("up", idx);
                        }}
                    >
                        ▲
                    </Button>
                    <Button
                        size="sm"
                        onClick={() => {
                            changeOrder("down", idx);
                        }}
                    >
                        ▼
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                            deletePlace(data.title, data.id);
                        }}
                    >
                        X
                    </Button>
                </Col>
            </Row>
        );
        if (idx === placeList.length - 1) {
            return <div key={data.id}>{returnBody}</div>;
        } else {
            return (
                <div key={data.id}>
                    {returnBody}
                    <div>
                        <small>{trafficList[idx]}</small>
                    </div>
                </div>
            );
        }
    });
    if (placeList.length >= 1) {
        return (
            <div className="mt-5 pt-3" id="result">
                {result}
                <Button
                    id="deleteAll"
                    size="sm"
                    variant="danger"
                    onClick={deletePlaces}
                >
                    비우기
                </Button>
                {/* <Button
                    id="saveAll"
                    size="sm"
                    variant="primary"
                    onClick={savePlaces}
                >
                    확정
                </Button> */}

                <Link to={"/confirm"}>
                    <Button size="sm" variant="primary">
                        확정
                    </Button>
                </Link>
            </div>
        );
    }
}

export default Result;
