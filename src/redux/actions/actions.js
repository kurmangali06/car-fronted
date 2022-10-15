import axios from "axios";

export const getAllCars = () => async dispatch => {
  dispatch({type: 'LOADING', payload: true});

  try{
    const cars = await axios.get('https://car-server-node.vercel.app/api/cars/getall');
    dispatch({type: 'GET_ALL_CARS', payload: cars.data});
    dispatch({type: 'LOADING', payload: false});
  }catch(error) {
    console.log(error);
    dispatch({type: 'LOADING', payload: false});
  }
}