import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import banner from '../img/banner.png';
import bannerphoto1 from '../img/bannerphoto1.jpg';
import bannerphoto2 from '../img/bannerphoto2.jpg';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PaidIcon from '@mui/icons-material/Paid';
import OwlCarousel2 from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css'
import 'react-owl-carousel2/src/owl.theme.default.css'
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';
import { API_URL } from '../helper';
import SwipeIcon from '@mui/icons-material/Swipe';
import { Link } from 'react-router-dom';


const HomePage = (props) => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        try {

            let res = await axios.get(`${API_URL}/products`)
            console.log("AMBIL PRODUK", res.data.dataProducts)
            setProducts(res.data.dataProducts)
        } catch (error) {
            console.log(error)
        }
    }
    const options = {
        items: 4,
        rewind: true,
        autoplay: true,
        loop: true,
    }

    return (
        <div>
            <div className='container'>
                <div className='row d-flex align-items-center'>
                    <div className="col-md-5">
                        <div className='homepageh1 fade-in'>
                            <p>
                                Sewa Alat Mainan Untuk Buah Hati Anda
                            </p>
                        </div>
                        {/* <p
                            style={{
                                fontWeight: 'bold',
                                fontSize: 40,
                                color: "#EF4723",
                                textShadow: 'revert',                                

                            }}>
                            Untuk Buah Hati Anda
                        </p> */}
                        <div className='fade-in'>
                            <p
                            style={{
                                marginRight: 40,
                                fontWeight: 'bold',
                                fontSize: 14,
                                color: "grey",
                                textShadow: 'revert',
                                marginBottom: 100,
                                marginLeft: 100
                            }}
                            >Kami hadir untuk menjadi solusi penyediaan perlengkapan ibu dan anak yang bersih dan higienis dengan pelayanan profesional dan kemudahan transaksi.
                            </p>
                        </div>

                    </div>
                    <div className="col-md-6 offset-md-1">
                        <img className="rounded fade-in" src={bannerphoto2} width="45%" style={{ marginTop: "-50px", marginBottom: "50" }} />
                        <img className="rounded fade-in" src={bannerphoto1} width="40%" style={{ marginLeft: "30px", marginTop: "150px", marginBottom: "100px" }} />
                    </div>
                </div>

            </div>
            <div className="container-fluid" style={{ backgroundColor: "#ecf0f1", paddingTop: 60, paddingBottom: 60 }}>
                <div>
                    <p
                        style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 35,
                            color: "#EF4723",
                            textShadow: 'revert',
                        }}>
                        Kenapa memilih kami?
                    </p>
                </div>
                <div className='container text-center' style={{ marginTop: 20 }}>
                    <Row xs='3'>
                        <Col>
                            <p><LocalShippingIcon sx={{ fontSize: 50, color: "#0899B1" }} /></p>
                            <p className='my-0' style={{ fontWeight: 'bold' }}>TARIF ANTAR-JEMPUT</p>
                            <p>Tarif pengiriman antar-jemput yang terjangkau.</p>
                        </Col>
                        <Col>
                            <p><VerifiedUserIcon sx={{ fontSize: 50, color: "#0899B1" }} /></p>
                            <p className='my-0' style={{ fontWeight: 'bold' }}>Bersih dan Higienis</p>
                            <p>Kebersihan barang sewa sangat terjamin.</p>
                        </Col>
                        <Col>
                            <p><PaidIcon sx={{ fontSize: 50, color: "#0899B1" }} /></p>
                            <p className='my-0' style={{ fontWeight: 'bold' }}>Harga Terjangkau</p>
                            <p className='text-muted'>Harga yang ditawarkan terjangkau dan kemudahan transaksi.</p>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='container-fluid text-center' style={{ marginTop: 30 }} >
                <p
                    style={{
                        fontWeight: 'bold',
                        fontSize: 40,
                        color: "#EF4723"
                    }}>
                    Produk Kami
                </p>
                <p className='text-muted text-center' style={{marginBottom: "40px"}}>swipe kiri/kanan untuk melihat <SwipeIcon sx={{ fontSize: 30 }} /> </p>
                <div className='container'>
                    <OwlCarousel2 options={options}>
                        {
                            products.map((value) => {
                                return (
                                    <Link to={`/product-detail?idproduct=${value.idproduct}`}>
                                        <div>
                                            <img className="rounded" src={value.images[0].url} style={{ width: "90%" }} />
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </OwlCarousel2>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default HomePage;