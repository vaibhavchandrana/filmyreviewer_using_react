import React, { useContext } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Appstate } from '../App';


const Header = () => {
    const useAppstate = useContext(Appstate)
    return (
        <div className='text-lg sm:text-3xl flex flex-wrap items-center justify-between text-red-500 font-bold p-3 border-b-2 border-gray-500'>
            <Link to="/" ><span> Movie<span className='text-white'>Reviewer</span></span>
            </Link>
            {
                useAppstate.login?
                <Link to="/addmovie"><h1 className='text-lg cursor-pointer flex items-center'>
                    <Button >
                        <AddBoxIcon className='text-lg sm:text-xl'> </AddBoxIcon>
                        Add Movie
                    </Button>
                </h1>
                </Link>
                :
                <Link to="/login"><h1 className='text-lg text-white bg-red-500 cursor-pointer flex items-center'>
                    <Button >
                       <p className='text-white'> Login</p>
                    </Button>
                </h1>
                </Link>

            }
        </div>
    )
}

export default Header