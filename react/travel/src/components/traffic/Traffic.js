import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Container } from "react-bootstrap";

function Traffic() {
    const [pathAll, setPathAll] = useState(null);
    const [pathType, setPathType] = useState(11);

    const odsayPathType = {
        1: "지하철",
        2: "시내버스",
        3: "지하철 + 시내버스",
        11: "기차",
        12: "고속/시외버스",
        13: "항공",
        20: "시외교통 복합",
    };

    const odsayTrainType = {
        1: "KTX",
        2: "새마을",
        3: "무궁화",
        4: "누리호",
        5: "통근",
        6: "ITX",
        7: "ITX-청춘",
        8: "SRT",
    };

    const sx = "128.601445";
    const sy = "35.8714354";
    const ex = "129.2247477";
    const ey = "35.8561719";
    const apiKey = "UBD5HQP6Ab9xamTALuQjRlz8OdqYpZzUdtzo270Z9D8";
    const url = `https://api.odsay.com/v1/api/searchPubTransPathT?SX=${sx}&SY=${sy}&EX=${ex}&EY=${ey}&apiKey=${apiKey}`;

    const getPathData = async () => {
        const res = await axios.get(url);
        setPathAll(res.data.result.path);
        console.log("api called to get path data");
        console.log(res.data.result.path);
    };

    useEffect(() => {
        getPathData();
    }, []);

    let pathTypes = [];
    let pathButtons = <div></div>;
    let selectedPath = <div>검색 결과 없음</div>;
    let pathTimeTable = <div></div>;

    if (pathAll !== null) {
        if (pathAll.filter((data) => data.pathType === pathType).length !== 0) {
            selectedPath = pathAll
                .filter((data) => data.pathType === pathType)
                .map((data, idx) => (
                    <div key={idx}>
                        <span>
                            소요시간 : {data.info.totalTime}분 / 가격 : {" "}
                            {data.info.totalPayment}원 /
                            {data.subPath.map((subPathData, idx) => (
                                <small key={idx}>
                                    {subPathData.startName}-
                                    {subPathData.endName}
                                    {idx !== data.subPath.length - 1 ? "-" : ""}
                                </small>
                            ))}
                        </span>
                        <Button size="sm" variant="outline-secondary">
                            시간표 보기
                        </Button>
                        {pathTimeTable}
                    </div>
                ));
        }
        pathTypes = pathAll.map((data) => data.pathType);
        pathTypes = [...new Set(pathTypes)];
        pathButtons = pathTypes.map((data) => (
            <Button
                key={data}
                variant="outline-primary"
                onClick={() => setPathType(data)}
            >
                {odsayPathType[data]}
            </Button>
        ));
    }

    return (
        <Container>
            교통 선택 화면
            <div>{pathButtons}</div>
            <div>{selectedPath}</div>
        </Container>
    );
}

export default Traffic;
