import React ,{useState,useEffect} from 'react'
import {  FaStar } from "react-icons/fa";
import API from '../services/api-service';
import { useCookies } from 'react-cookie';


export default function MovieDetails({movie,updateMovie}){

    const [highlighted, setHighlighted] = useState(-1);
    const [error,setError] = useState(null);
    const [token] = useCookies("mr-token");
    
    const rateMovie = async(rate)=> {
        const rateMovie = async()=> {
                const resp = await API.rateMovie(movie.id,{stars:rate},token["mr-token"]);
            if (resp) getNewMovie(resp);    
    
            }
            rateMovie()   
     }


    const getNewMovie = async()=> {
        const fetchMovies = async() =>{
            const resp = await API.getMovies(movie.id,token["mr-token"]);
        if (resp) updateMovie(resp);    

        }
        fetchMovies()   
    }

return (
        <React.Fragment>
            {movie &&
            <div>
            <h1>{ movie.title}</h1>
            <p>{ movie.description}</p>
            <div className='flex'>
            <FaStar className={movie.avg_ratings > 0 && 'text-orange-400'}/> 
                {/* these creates the color of star */}
            <FaStar className={movie.avg_ratings > 1 && 'text-orange-400'}/>
            <FaStar className={movie.avg_ratings > 2 && 'text-orange-400'}/>
            <FaStar className={movie.avg_ratings > 3 && 'text-orange-400'}/>
            <FaStar className={movie.avg_ratings > 4 && 'text-orange-400'}/>
                <p>({movie.no_of_ratings})</p>
            </div>
            <h1 className='border-t-2 border-purple-600 mt-4'>Rate the movie!</h1>
            <div className='flex text-2xl'>
                {[...Array(5)].map((el,index)=> {
                    return <FaStar className={highlighted > index && 'text-purple-600'}
                    onMouseEnter={()=>setHighlighted(index + 1)}
                    onMouseleave={()=>setHighlighted(-1)}
                    onClick={()=>rateMovie(index + 1)}/>
                })}
            </div>
            {error && <p>{error} </p>}
            </div>
            }            
        </React.Fragment>
    );
}
    
    