import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import Layout from '../componets/Layout'
import Loading from '../componets/Loading'
import { getAllCars } from '../redux/actions/actions'
import { DatePicker} from 'antd'
import axios from 'axios'


const { RangePicker } = DatePicker;

export const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {cars} = useSelector(state => state.reducer)
  const {loading} = useSelector(state => state.loading)
  const [totalCar, setTotalCar] = useState([])
  const [category, setCategory] = useState([])
  const [query, setQuery] = useState('')

  useEffect(()=> {
    dispatch(getAllCars());
  },[dispatch]);

  useEffect(() => {
    if(!localStorage.getItem('userinfo')) {
      navigate('/login')
    }
    setTotalCar(cars)
  }, [cars, navigate])

  useEffect(()=> {
    const fetchData = async () => {
      const result = await axios.get('https://car-server-node.vercel.app/api/category');
      setCategory(result.data)
    }
    fetchData()
  },[])

  const selectFilter = () => {
    var temp = []

    for( var car of totalCar) {
      if(car.bookedTimeSlots.length === 0) {
        temp.push(car)
      }
      }
    

    setTotalCar(temp)
  }

const filterResult = (carItem) => {
  const catResult = cars.filter((curCat) => {
    return curCat.type === carItem 
  }
   );
  setTotalCar(catResult)

}

const keys = ["type"];

const search = () => {
  return totalCar.filter((item) => keys.some((key) => item[key].toLowerCase().includes(query)))
}

  return (
    <Layout>
      <div className="slider">
        <div className='left'>
        <h1 className="title">Kragujevac Car Hire</h1>
        </div>
        <div className="right">
          <img src="./images/slider/paugeot.png" alt="" />
        </div>
      </div>
      <div className='content'>
      <div className="content-row">
        <h1 className='big-title'>Top Cars for Rent</h1>
      </div>
      <div className='content-flex'>
        <div className="content-row flex-1">
          <div className="div-filter">
          <h2 className="car-subtitle">****Filter by Search****</h2>
          <input type="search" placeholder='Search...'  className='search'  onChange={e => setQuery(e.target.value)}/>
          </div>
          <div className="div-filter">
          <h2 className="car-subtitle">****Filter for Availabity****</h2>
        <RangePicker showTime={{format: 'HH:mm'}}
              format='YYYY-MM-DD HH:mm:ss'
              onChange={selectFilter}/>
          </div>
          <div className="div-filter">
          <h2 className="car-subtitle">****Filter by Type****</h2>
          
          <div className="fiter-btns">
          <button onClick={() => setTotalCar(cars)} className="btn-type">All</button>
          {category.map((cat) => (
            <button key={cat._id} onClick={() => filterResult(cat.type)} className="btn-type" >{cat.type}</button>
          ))}
          </div>

          </div>
        </div>
        <div className="content-row flex-2">
          {loading ? <Loading/> : (
        <div className="content-groups">
        {search(totalCar)?.map((car) => (
          <div className="card" key={car._id}>
            <div className="card-body">
              <img className='img-cars' src={car.image} alt={car.name} />
            </div>
            <div className="card-footer">
              <div className="card-footer-top">
              <h3 className='card-title'>{car.name}</h3>
              <p className='per-day'>Per day: $ <span className='bold-price'>{(car.payPerDay).toFixed(2)}</span></p>
              </div>
                <div className="card-footer-bottom">
                  <button className='rent-now'><Link to={`/car/${car._id}`} className="rent-link">Rent now</Link> </button>
                </div>
            </div>
          </div>
        ))}
      </div>
          )}
      </div>
      </div>

      </div>
    </Layout>
  )
}
