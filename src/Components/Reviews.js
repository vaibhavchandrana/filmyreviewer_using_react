import React, { useContext, useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { reviewRef, db } from '../firebase/firebase'
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore'
import { TailSpin, ThreeDots } from 'react-loader-spinner'
import swal from 'sweetalert'
import { Appstate } from '../App'


const Reviews = ({ id, prevRating, userRated }) => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false)
  const [form, setForm] = useState("");
  const [data, setData] = useState([]);
  const [newAdded, setNewAdded] = useState(0)
  const useAppstate = useContext(Appstate)



  const sendReview = async () => {
    setLoading(true);
    setData([]);
    try {
      if (useAppstate.login) {
        await addDoc(reviewRef, {
          movieId: id,
          name: "vaibhav rana",
          rating: rating,
          thought: form,
          timestamp: new Date().getTime()

        })
        const ref = doc(db, "movies", id);
        await updateDoc(ref, {
          rating: rating + prevRating,
          rated: userRated + 1
        })
        setRating(0);
        setForm("");
        setNewAdded(newAdded + 1)
        swal({
          title: "Review Sent",
          icon: "success",
          button: false,
          timer: 3000
        });
      }
      else {
        window.alert("please login");
      }
    }
    catch (err) {
      swal({
        title: err,
        icon: "error",
        button: false,
        timer: 5000

      })

    }
    setLoading(false);

  }


  useEffect(() => {
    async function getData() {
      setReviewLoading(true);
      let qur = query(reviewRef, where('movieId', '==', id))
      const queryset = await getDocs(qur);

      queryset.forEach((doc) => {
        setData((prev) => [...prev, doc.data()])
      })
      setReviewLoading(false);
    }
    getData();
  }, [newAdded])


  
  return (
    <div className='mt-2 py-2 border-t-2 border-gray-700 w-full'>
      <ReactStars
        size={30}
        half={true}
        value={rating}
        onChange={(rate) => setRating(rate)}
      />
      <input
        value={form}
        onChange={(e) => setForm(e.target.value)}
        placeholder="Share your thoughts..."
        type="text"
        className="w-full p-2 outline-none bg-gray-600 "
      />
      <button onClick={sendReview} className='bg-red-500 w-full p-1'>
        {loading ? <div className='flex justify-center items-center'><TailSpin height={15} color="white" /> </div> : 'Share'}
      </button>
      {reviewLoading ?
        <div className="mt-6 flex justify-center item-center"><ThreeDots height={20} color="red" /></div> :
        <div>{
          data.map((e, i) => {
            return (
              <div className='p-2 w-full mt-2  border-b border-red-600' key={i}>
                <div className='flex'>
                  <p className='text-red-500 '>{e.name}</p>
                  <p className='ml-3 text-xs'>({new Date(e.timestamp).toLocaleString()})</p>
                </div>
                <ReactStars
                  size={20}
                  half={true}
                  value={e.rating}
                  edit={false}
                />
                <p>{e.thought}</p>
              </div>
            )
          })}
        </div>

      }
    </div>
  )
}

export default Reviews