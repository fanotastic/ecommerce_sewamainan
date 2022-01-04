import React from 'react';
import banner from '../img/bannerlandingpage.png'


const HomePage = (props) => {
    return (
        <div className='container-fluid' style={{backgroundColor:"#F3F3F5", paddingLeft: 418}}>
            <div className="bg-image p-5"
                style={{
                    backgroundImage: `url(${banner})`,
                    height: "100%",
                    width: "100%",
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}>
                <p className="d-flex col-4"
                    style={{
                        padding: 40,
                        fontWeight: 'bold',
                        fontSize: 50,
                        color: "#EF4723",
                        textShadow: 'revert',
                    }}>Sewa Alat Mainan Untuk Buah Hati Anda</p>
            </div>
        </div>
    )
}

export default HomePage;