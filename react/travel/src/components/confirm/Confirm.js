import React from "react";
import { useIdContext } from "../Context";
import { Button } from "react-bootstrap";
import axios from "axios";

function Confirm(){
    const { placeList, setPlaceList } = useIdContext();
    console.log(placeList);

    const saveTravelPlan = async() => {
        if(window.confirm("저장?")){
            let res = await axios.post(
                "/api/plan", placeList[0]
            );
            console.log(res);
        }
    }

    return(
        <div>
            {placeList.map(data => {
                return(<p key={data.id}>{data.title}</p>)
            })}
            <Button variant="primary" size="sm" onClick={saveTravelPlan}>저장</Button>
        </div>
    )
}

export default Confirm;