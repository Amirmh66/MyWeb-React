import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import Dashboard from '../Pages/Dashboard/Dashboard'
import Leaderboard from '../Pages/Leaderboard/Leaderboard'


export default function Main() {
    return (
        <>
            <BrowserRouter>
                <div className='max-w-full max-h-full bg-gray-100'>
                    {/* Main / Content */}
                    <main className="p-5">
                        <Routes>
                            <Route path='/' element={<Dashboard />} />
                            <Route path='/Leaderboard' element={<Leaderboard />} />
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </>
    )
}
