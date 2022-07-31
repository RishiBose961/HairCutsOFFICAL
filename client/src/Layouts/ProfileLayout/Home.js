import { Divider } from '@mui/material'
import React from 'react'
import Feed from '../../components/Feed/Feed'
import Footer from '../../components/Feed/Footer'
import Pricing from '../../components/Pricing/Pricing'
import Slidebar from '../../components/SideBar/Slidebar'

const Home = () => {
    return (
        <>
            <Slidebar />
            <Feed />
            <Divider/>
            <Pricing/>
            <Footer/>
        </>
    )
}

export default Home