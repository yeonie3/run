import React, { useEffect, useState } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';

function Home(){
    // API URL
    const url = "http://apis.data.go.kr/B551011/KorService1/areaCode1?";
    const serviceKey = "1ShcABH4c4%2B6hCgzQcDQnxLa%2FG69xL9uKkZ0NSigjZvVyGSANUmRpwdkgPK0QwCRPL77t%2FNRo2DLqMmrZZEDpg%3D%3D";
    const settings = "numOfRows=40&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json";

    // area state
    const [areaCodes, setAreaCodes] = useState(null);
    const [detailedAreaCodes, setDetailedAreaCodes] = useState(null);
    const [selectedArea, setSelectedArea] = useState({});

    // modal show state
    const [show, setShow] = useState(false);


    // modal open&close
    const handleClose = () => {
        setSelectedArea({});
        setShow(false)
    };
    const handleShow = () => setShow(true);
    const saveChange = () => setShow(false);

    // calendar
    const [value, onChange] = useState(new Date());


    // useEffect
    useEffect(() => {
        if(areaCodes === null){
            getAreaCode();
        }
        // getDetailedAreaCode();
    }, [])

    // get area code from api
    const getAreaCode = async () => {
        const res = await axios.get(
            `${url}serviceKey=${serviceKey}&${settings}`
        ) 
        setAreaCodes(res.data.response.body.items.item);
        console.log("api called to get areaCode");
    }

    // get detailed area code from api
    const getDetailedAreaCode = async (code, name) => {
        const res = await axios.get(
            `${url}areaCode=${code}&serviceKey=${serviceKey}&${settings}`
        )
        setSelectedArea({code : code, name : name});
        setDetailedAreaCodes(res.data.response.body.items.item);
        console.log("api called to get detailedAreaCode");
    }
    
    // define area and detailed are list
    let areaList = null;
    let detailedAreaList = null;

    if(areaCodes !== null){
        areaList = areaCodes.map((data, idx) => <Button className='m-1' key={idx} size='sm' variant={data.code === selectedArea.code ? 'primary' : 'outline-primary'} onClick={() => getDetailedAreaCode(data.code, data.name)}>{data.name}</Button>)
    }

    if(detailedAreaCodes !== null){
        detailedAreaList = detailedAreaCodes.map((data, idx) => <Button className='m-1' size='sm' variant={data.code === selectedArea.detailedCode ? 'success' : 'outline-success'} key={idx} onClick={() => setSelectedArea({...selectedArea, detailedCode : data.code, detailedName : data.name})}>{data.name}</Button>)
    }

    // return

    return(
        <Container className='pt-5'>
            {/* <Button>날짜 선택</Button><br></br> */}
            {/* <Calendar onChange={onchange} value={value} /> */}
            <Button variant='primary' onClick={handleShow}>
                여행지 선택
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>여행지를 선택해주세요</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {areaList}
                    <hr></hr>
                    {detailedAreaList}
                </Modal.Body>
                <Modal.Footer>
                    <span>
                    {selectedArea.name}&nbsp;
                    {selectedArea.detailedName}
                    </span>
                    <Button variant='primary' onClick={saveChange}>
                        저장
                    </Button>
                    <Button variant='secondary' onClick={handleClose}>
                        취소
                    </Button>
                </Modal.Footer>
            </Modal>
            <h4>
                {selectedArea.name}&nbsp;
                {selectedArea.detailedName}
            </h4>
            <Link to={`/planner?areaCode=${selectedArea.code === undefined ? '' : selectedArea.code}&sigunguCode=${selectedArea.detailedCode === undefined ? '' : selectedArea.detailedCode}`}>            
                <Button variant='primary'>일정 만들기</Button>
            </Link>

        </Container>
    )
}

export default Home;