import axios from 'axios';
import React from 'react';
import { Col, Row } from 'reactstrap';
import { API_URL } from '../helper';

class DetailProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            thumbnail: 0
        }
    }

    componentDidMount() {
        console.log("CEK URL DETAIL", window.location)
        axios.get(`${API_URL}/products${window.location.search}`)
            .then((response) => {
                console.log("cek data", response.data)
                this.setState({ detail: response.data[0] })
            }).catch((err) => {
                console.log(err)
            })
    }

    renderProducts = () => {

    }

    render() {
        return (
            <>
                <div className="text-center text-white py-3 container-fluid" style={{ backgroundColor: "#d35400" }}>
                    <h1>{this.state.detail.nama}</h1>
                    <p>{this.state.detail.kategori}</p>
                </div>
                <div className="container row m-auto mt-4 shadow rounded">
                    <div className='col-md-6'>
                        <img className="shadow-sm bg-white rounded" src={this.state.detail.images} width="80%" />
                    </div>
                    <div className='col-md-6'>
                        <div>
                            <h3>Rp. {this.state.detail.harga}/hari</h3>
                            <p>Harga Beli Item ini adalah Rp. {this.state.detail.harga}</p>
                            <p>Nikmati kenyamanan produk ini dengan Harga Sewa: </p>
                            <table>
                                <thead>
                                    <tr></tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default DetailProduct;