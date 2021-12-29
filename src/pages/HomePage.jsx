import React from 'react';

const HomePage = (props) => {
    return (
        <div className='container-fluid' style={{backgroundColor:"#EFF0F2"}}>
            <div className="bg-image p-5"
                style={{
                    backgroundImage: `url("https://images.unsplash.com/flagged/photo-1564228539519-4dfe919785a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1991&q=80")`,
                    height: "100%",
                    width: "100%",
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}>
                <p className="d-flex col-4 p-5"
                    style={{
                        fontWeight: 'bold',
                        fontSize: 50,
                        color: "#EF4723",
                        textShadow: 'revert'
                    }}>Sewa Alat Mainan Untuk Buah Hati Anda</p>
            </div>
        </div>
    )
}

export default HomePage;