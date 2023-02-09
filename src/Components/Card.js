import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars';
import { ThreeCircles } from 'react-loader-spinner';
import { getDocs } from 'firebase/firestore';
import { moviesRef } from '../firebase/firebase';
import { Link } from 'react-router-dom';

const Card = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        async function getData() {
            setLoading(true);
            const mydata = await getDocs(moviesRef);
            mydata.forEach((doc) => {
                setData((prev) => [...prev, {...(doc.data()),id:doc.id}])
            })
            setLoading(false);
        }
        getData();
    }, [])

    return (
        <div className='flex flex-wrap justify-between px-3  mt-2'>
            {
                loading ? <div className='w-full flex justify-center items-center h-96'>
                    <ThreeCircles height={80} color="white" /> </div> :
                    data.map((element, index) => {
                        return (
                           <Link to={`/detail/${element.id}`}> <div key={index} className='card font-medium shadow-lg p-2 hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500'>
                                <img className='h-58 md:h-72 w-32 md:w-full pl-2' src={element.image} />
                                <h1>
                                    <span className='text-red-500'></span> {element.title}
                                </h1>
                                <h1 className='flex items-center'>
                                    <span className='text-red-500 mr-1'>Rating:</span>
                                    <ReactStars
                                        size={20}
                                        half={true}
                                        value={element.rating/element.rated}
                                        edit={false}
                                    />
                                </h1>
                                <h1>
                                    <span className='text-red-500'>Year:</span> {element.year}
                                </h1>
                            </div>
                            </Link>
                        )
                    })
            }


        </div>
    )
}

export default Card