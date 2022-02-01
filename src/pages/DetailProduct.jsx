import axios from 'axios';
import React from 'react';
import { Col, Input, Row, Table, Button, ToastHeader, Toast, ToastBody, Alert } from 'reactstrap';
import { API_URL } from '../helper';
import Calendar from 'react-calendar'
import { connect } from 'react-redux';
import { updateUserCart } from '../redux/actions';
import { Navigate } from 'react-router-dom';

class DetailProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            thumbnail: 0,
            selectedPeriod: {},
            qty: 0,
            redirect: false,
            toastOpen: false,
            toastMsg: "",
            selectedDate: "",
            date: new Date(),
            openAlert: false
        }
    }

    componentDidMount() {
        console.log("CEK URL DETAIL", window.location)
        axios.get(`${API_URL}/products${window.location.search}`)
            .then((response) => {
                console.log("cek data", response.data.dataProducts[0])
                this.setState({ detail: response.data.dataProducts[0]})
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtAddToCart = async () => {
        let { selectedPeriod, detail, qty } = this.state
        if (selectedPeriod.harga) {
            let dataCart = {
                image: detail.images,
                nama: detail.nama,
                hargaProduk: detail.hargaProduk,
                hargaSewa: detail.hargaSewa,
                masaSewa: selectedPeriod.masaSewa,
                harga: selectedPeriod.harga,
                startRent: new Date(Date.now()).toLocaleDateString(),
                endRent: new Date(Date.now() + (3600 * 1000 * (24 * selectedPeriod.period ))).toLocaleDateString(),
                qty
            }

            let temp = [...this.props.cart]
            temp.push(dataCart)

            if (this.props.iduser) {
                let res = await this.props.updateUserCart(temp, this.props.iduser);
                this.setState({ 
                    redirect: true})
            } else {
                this.setState({
                    toastOpen: !this.state.toastOpen,
                    toastMsg: "Silahkan login terlebih dahulu."
                })
            }
        } else {
            this.setState({
                toastOpen: !this.state.toastOpen,
                toastMsg: "Pilih periode terlebih dahulu."
            })
        }
    }

    onChange = date => this.setState({ date })

    render() {
        if (this.state.redirect) {
            return <Navigate to="/cart-user" />
        }
        return (
            <>
                <>
                    <Toast isOpen={this.state.toastOpen} style={{ position: "fixed", left: 10 }}>
                        <ToastHeader
                            toggle={() => this.setState({ toastOpen: false, toastMsg: "" })}>
                            Add to cart warning
                        </ToastHeader>
                        <ToastBody>
                            {this.state.toastMsg}
                        </ToastBody>
                    </Toast>
                </>
                {
                    this.state.detail.idproduct &&
                    <>
                        <div className="text-center text-white container-fluid my-3" style={{ backgroundColor: "#d35400", paddingTop: "30px", paddingBottom: "30px" }}>
                            <h1>{this.state.detail.name}</h1>
                            <p>{this.state.detail.category}</p>
                        </div>
                        <div className="container row m-auto mt-4 shadow rounded align-items-center">
                            <div className='col-md-6'>
                                <img className="shadow-sm bg-white rounded m-4" src={this.state.detail.images[0].url} width="80%" />
                            </div>
                            <div className='col-md-6 my-3'>
                                <div>
                                    <h3 style={{ fontWeight: 'bolder' }}>Rp. {this.state.detail.price_rental.toLocaleString()}/hari</h3>
                                    <p>Harga Beli Item ini adalah Rp. {this.state.detail.price_product.toLocaleString()}</p>
                                    <p>Nikmati kenyamanan produk ini dengan Harga Sewa: </p>
                                    <Table className='text-center' hover bordered style={{borderRadius: 20}}
                                    >
                                        <thead>
                                            <tr>
                                                <th>
                                                    LAMA SEWA
                                                </th>
                                                <th>
                                                    HARGA SEWA
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.detail.stocks.map((item, index) => {
                                                    return (
                                                        <tr style={{ cursor: 'pointer' }} onClick={() => this.setState({ selectedPeriod: item, qty: 1 })}>
                                                            <td>
                                                                {item.rental_period}
                                                            </td>
                                                            <td>
                                                                Rp. {item.price.toLocaleString()} <p className='text-muted'>(Rp. {item.price_per_day.toLocaleString()}/hari)</p>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                    <p>Lama Sewa:
                                        {
                                            this.state.qty ?
                                                <div>
                                                    <p>{this.state.selectedPeriod.period} dengan harga sewa Rp. {this.state.selectedPeriod.price.toLocaleString()}</p>  
                                                </div>
                                                :
                                                <p> </p>
                                        }
                                    </p>
                                    <Button type="button" color="warning" style={{ width: '100%', marginTop: 20 }} onClick={this.onBtAddToCart}>Add to cart</Button>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </>
        );
    }
}

const mapToProps = (state) => {
    return {
        cart: state.userReducer.cart,
        iduser: state.userReducer.id
    }
}

export default connect(mapToProps, { updateUserCart })(DetailProduct);