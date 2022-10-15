import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DatePicker} from 'antd'
import moment from 'moment'

import { useNavigate, useParams } from 'react-router'
import Layout from '../componets/Layout'
import { useDispatch } from 'react-redux'
import { rentCar } from '../redux/actions/rent'

const { RangePicker } = DatePicker;

export const Car = ({match}) => {

  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const {carId} = params

  const [car, setCar] = useState([])
  const [from, setFrom] = useState()
  const [to, setTo] = useState()
  const [totalDays, setTotalDays] = useState(0)
  const [driver, setDriver] = useState(false)
  const [ total, setTotal] = useState(0)

  const userInfo = localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')) : null


  useEffect(() => {
    if(!localStorage.getItem('userinfo')) {
      navigate('/login')
    }

    const fetchData = async () => {
      try {
        const result = await axios.get(`https://car-server-node.vercel.app/api/cars/car/${carId}`);
        setCar(result.data)
      } catch (error) {
        console.log(error);
      }
      
    }
    fetchData();
    setTotal((totalDays * car.payPerDay))
    if(driver) {
      setTotal(total + (40 * totalDays))
    }
  }, [carId, navigate, driver, totalDays, car.payPerDay])


  const selectTime = (values) => {
    setFrom(moment(values[0].format('MMM:DD:yyy HH:mm')));
      setTo(moment(values[1].format('MMM:DD:yyy HH:mm')));

      setTotalDays(values[1].diff(values[0], 'Days'))
  }

  const rentNow = () => {
    const reqObj = {
      user: userInfo._id,
      car: car._id,
      totalDays,
      total,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };
    dispatch(rentCar(reqObj));
    navigate('/')
  }

  return (
    <Layout>
      <div className='car-container'>
        <h3 className='car-title'>Rent a Car</h3>
        <div className="car-row">
          <div className="car-col">
            <div className="car-groups">
              <div className="car-group">
                <h2 className="car-subtitle">****Car Info****</h2>
                <div className="car-info">
                  <span>{car.name}</span> 
                  <span> $ {(car.payPerDay)?.toFixed(2)} pay Per Day</span>
                  <span>Fuel Type: {car.fuelType}</span>
                  <span>Max Persons : {car.capacity}</span>
                </div>
              </div>
              <div className="car-group">
                <h2 className="car-subtitle">****Rent a Car****</h2>
                <div className="car-info">
              <RangePicker 
              showTime={{format: 'HH:mm'}}
              format='YYYY-MM-DD HH:mm:ss'
              onChange={selectTime}
              />
                {from && to && (
                                <><span>Total Days: {totalDays}</span><span> pay Per Day: $ {(car.payPerDay)?.toFixed(2)} </span><p className='driver'>
                      <input type="checkbox" onChange={(e) => {
                        if (e.target.checked) {
                          setDriver(true)
                        } else {
                          setDriver(false)
                        }
                      } } id="driver" />
                      <label htmlFor="driver">Driver Required</label>
                    </p><div className="total">
                        <h1 className="total-title">Total Amount: ${(total).toFixed(2)}</h1>
                      </div><button className='rent-now' onClick={rentNow}>Rent now</button></>
                )}
                </div>
              </div>
            </div>
          </div>
          <div className="car-col">
            <div className="car-image">
              <img src={car.image} alt={car.name} className="car-img" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
