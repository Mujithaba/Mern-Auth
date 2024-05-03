import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addingDetails, addingYear } from '../slices/movieSlice'

const Movie = () => {

  const {movie , year} = useSelector((state)=> state.Movies)
  const dispatch = useDispatch()

  const handleMovie =()=>{
    dispatch(addingDetails)
  }
  const handleYear = (e)=>{
    dispatch(addingYear)
  }


  return (
    <div>
    <input type='text' onChange={handleMovie}/>
<input type='text' onChange={handleYear} />      
    </div>
  )
}

export default Movie
