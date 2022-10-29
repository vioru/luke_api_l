import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Obi from '../obiWan/obiWan';
import axios from "axios";


const LukeApi = (props) => {

    const [Info, setInfo] = useState({});
    const [Error, setError] = useState(false);
    const [PlanetP,setPlanetP] = useState("")
    const { id ,Category } = useParams();

    const SelectStarApi ={
        people:["name","height","eyecolor","homeworld"],
        vehicles :["name","model","vehicle_class","cost_in_credits"],
        starships :["name", "model" ,"starship_class" ,"cost_in_credits"],
        species :["name", "skin_colors" ,"eye_colors" ,"language"],
        planets :["name", "climate" ,"diameter" ,"terrain"],
        films :["title", "episode_id" ,"release_date" ,"director"]
    }


    useEffect(() => {

        axios.get('https://swapi.dev/api/'+Category+'/'+ id)

            .then(result => result.data)
            .then(result => {
                console.log(result);
                if(Category === "people"){
                    axios.get(result.homeworld)
                    .then(res => res.data)
                    .then(res =>{
                        setPlanetP(result.homeworld.slice(22,-1));
                        result.homeworld = res.name
                        console.log(result.homeworld);
                        setInfo(result);
                        
                    })
                    .catch(err =>{
                        console.log(err)
                        setError(true);
                    
                    });
                }
                else{
                    setInfo(result);
                    
                }
                
            } 
            )
            .catch(err =>{
                console.log(err)
                setError(true);
            
            });
    }, [])





    return (

        <div className=' col-12 my-3 text-white'>

            {
                Error === true ?
                <div className='col-12'>
            
                    <Obi/> 
                </div> 
                    
                    : 
                    
                    <>
                    
                        <div className='col-7'>

                                <h2 className='mt-3 text-white ' >Has escogido  {Category} con id # {id}</h2>
                            <div className="card text-center">

                                <div className="card-body mt-3">
                                {SelectStarApi[Category].map((element) =>
                        
                                    <h5 className="card-text text-dark"> <b>{element}:</b> {Info[element]}</h5>
                        
                                )}
                                {Category === 'people'?
                                <a href={`http://localhost:3000/` + PlanetP} className="btn btn-primary">Conoce {Info.homeworld} su planeta de nacimiento</a>
                                : null
                            }
                                </div>
                            </div>
                        </div>
                    </>
                    }
                    

        </div>
    )

}

export default LukeApi;
