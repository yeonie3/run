import React from "react";
import Content from "./Content";
import Map from "./Map";
import Search from "./Search";
import Result from "./Result";
import '../../css/planner/Planner.css';
import IdContextProvider from "../Context";
import Header from "../Header";


function Planner(){
    return(
        <div id="planner">
            {/* <IdContextProvider> */}
                <Map />
                <Search />
                <Content />
                <Result />
            {/* </IdContextProvider> */}
        </div>
    )
}

export default Planner