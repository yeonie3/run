import React, { useEffect } from "react"
import "../../css/planner/Map.css"
import { useIdContext } from "../Context"


const { kakao } = window

function Map(){
    const{selectedCoord, placeList} = useIdContext();
    const positions = placeList.map(data => ({title : data.title, latlng : new kakao.maps.LatLng(data.coord.coordY, data.coord.coordX)}))
    const linePath = placeList.map(data => (new kakao.maps.LatLng(data.coord.coordY, data.coord.coordX)))
    
    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(selectedCoord.coordY, selectedCoord.coordX),
            level: 7
        };
        var map = new kakao.maps.Map(container, options);

        var markerPosition  = new kakao.maps.LatLng(selectedCoord.coordY, selectedCoord.coordX); 

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
    
        for (var i = 0; i < positions.length; i ++) {
        
            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(24, 35); 

            // 마커 이미지를 생성합니다    
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

            // 마커를 생성합니다
            new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커를 표시할 위치
                title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image : markerImage // 마커 이미지 
            });
        }

        // 지도에 표시할 선을 생성합니다
        var polyline = new kakao.maps.Polyline({
            path: linePath, // 선을 구성하는 좌표배열 입니다
            strokeWeight: 5, // 선의 두께 입니다
            strokeColor: 'skyblue', // 선의 색깔입니다
            strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid' // 선의 스타일입니다
        });
        
        // 지도에 선을 표시합니다 
        polyline.setMap(map);  

    }, [selectedCoord, positions, linePath])
    
    return(
        <div id="map">
        </div>
    )
}

export default Map