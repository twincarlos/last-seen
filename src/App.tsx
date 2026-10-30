import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { IndexPage } from './pages/IndexPage'
import { RoomPage } from './pages/RoomPage'
import { ScreenPage } from './pages/ScreenPage'
import { SignalPage } from './pages/SignalPage'
import { StaffPage } from './pages/StaffPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/room/:slug" element={<RoomPage />} />
        <Route path="/room/:slug/staff" element={<StaffPage />} />
        <Route path="/screen" element={<ScreenPage />} />
        <Route path="/signal" element={<SignalPage />} />
      </Routes>
    </BrowserRouter>
  )
}
