import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import banner from '../img/banner.png';
import bannerphoto1 from '../img/bannerphoto1.jpg';
import bannerphoto2 from '../img/bannerphoto2.jpg';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PaidIcon from '@mui/icons-material/Paid';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';
import { API_URL } from '../helper';
import { useDispatch } from 'react-redux';
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
            setProducts(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className='container-fluid'>
                <div className='row d-flex align-items-center'>
                    <div className="col-md-5 offset-md-1">
                        <p
                            style={{
                                marginLeft: 50,
                                fontWeight: 'bold',
                                fontSize: 55,
                                color: "#EF4723",
                                textShadow: 'revert',
                                paddingBottom: 0,
                                marginBottom: 0
                            }}>
                            Sewa Alat Mainan
                        </p>
                        <p
                            style={{
                                marginLeft: 50,
                                fontWeight: 'bold',
                                fontSize: 55,
                                color: "#EF4723",
                                textShadow: 'revert'
                            }}>
                            Untuk Buah Hati Anda
                        </p>
                        <p style={{
                            marginLeft: 50,
                            marginRight: 40,
                            fontWeight: 'bold',
                            fontSize: 16,
                            color: "grey",
                            textShadow: 'revert',
                            marginBottom: 100
                        }}
                        >Kami hadir untuk menjadi solusi penyediaan perlengkapan ibu dan anak yang bersih dan higienis dengan pelayanan profesional dan kemudahan transaksi.</p>
                    </div>
                    <div className="col-md-6">
                        <img className="rounded" src={bannerphoto2} width="45%" style={{ marginTop: "-50px", marginBottom: "50" }} />
                        <img className="rounded" src={bannerphoto1} width="40%" style={{ marginLeft: "30px", marginTop: "150px", marginBottom: "100px" }} />
                    </div>
                </div>

            </div>
            <div className="container-fluid" style={{ backgroundColor: "#ecf0f1", paddingTop: 80, paddingBottom: 80 }}>
                <div>
                    <p
                        style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 45,
                            color: "#EF4723",
                            textShadow: 'revert',
                        }}>
                        Kenapa memilih kami?
                    </p>
                </div>
                <div className='container text-center' style={{ marginTop: 50 }}>
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
                        fontSize: 45,
                        color: "#EF4723"
                    }}>
                    Produk Kami
                </p>
                <p className='text-muted'>swipe kiri/kanan untuk melihat <SwipeIcon sx={{ fontSize: 30 }} /> </p>
                <div className='container-fluid py-3 px-5'>
                    <OwlCarousel items={5}
                        className="owl-theme"
                        loop
                        nav
                        margin={20}>
                        {
                            products.map((value) => {
                                return (
                                    <Link to={`/product-detail?id=${value.id}`}
                                        style={{ textDecoration: "none", color: "black", textAlign: "center" }}>
                                        <div>
                                            <img className="img-fluid rounded" src={value.images} />
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </OwlCarousel>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default HomePage;