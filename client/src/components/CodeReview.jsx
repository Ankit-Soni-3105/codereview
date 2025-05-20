import React from 'react'
import { Link } from 'react-router-dom'
import CreateRoom from './CreateRoom'
import AllRooms from './AllRooms'

const CodeReview = () => {
    return (
        <div className="h-screen p-4">
            <div className="shadowBar w-fit rounded-xl px-4 py-2">
                <h1 className='font-bold text-xl'>Code Reviews Rooms</h1>
            </div>

            <CreateRoom />

            <AllRooms />
        </div>
    )
}

export default CodeReview