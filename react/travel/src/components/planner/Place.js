import shortid from 'shortid';
import '../../css/planner/Place.css'
import { useIdContext } from '../Context'
import { Button } from 'react-bootstrap';


function Place({id, title, image, addr, coord}) {
    const {setPlaceId, setSelectedCoord, placeList, setPlaceList} = useIdContext();
    let integerCoord = {coordX : parseFloat(coord.coordX), coordY : parseFloat(coord.coordY)};

    const selectedPlace = () => {
        setSelectedCoord(integerCoord);
        setPlaceId(id);
    }   

    const addPlace = () =>{
        // 삭제할때 title을 기준으로 해서 삭제가 제대로 먹히지 않으므로 따로 key주는것 생각?
        // if(placeList.length !== 0 && placeList[placeList.length - 1].title === title){
        //     return
        // }
        // for(let i = 0; i < placeList.length; i++){
        //     if(placeList[i].title === title){
        //         return
        //     }
        // }
        setPlaceList([
            ...placeList,
            {
                id : shortid.generate(),
                title : title,
                coord : integerCoord
            }
        ])
    }
    return(
        <div className='place' onClick={selectedPlace}>
            <div className='place_info' >
                <h4>
                {title}
                </h4>
                {image === '' ? <></>  : <img src={image} alt="이미지 없음"/>}                
                <p>
                    {addr}                     
                </p>
            </div>
            <Button variant='primary btn-sm' className='place_add' onClick={() => {addPlace(); selectedPlace();}}>+</Button>
        </div>
    )
}

export default Place