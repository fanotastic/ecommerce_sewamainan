import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from '../helper';
import { Badge, Button, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transaksi: []
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(`${API_URL}/userTransactions?iduser=${this.props.iduser}`)
            .then((res) => {
                console.log("ambil data history transaksi", res.data)
                this.setState({ transaksi: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    btBatal = (id) => {
        axios.patch(`${API_URL}/userTransactions/${id}`, { status: "Pesanan Batal" })
    }

    printHistory = () => {
        return this.state.transaksi.map((value, index) => {
            let badgeColor = value.status.includes("Batal") ? "danger" : "warning"
            return <div className="shadow pb-3 rounded">
                <Row xs='2' className='mx-2' style={{marginTop: 20, paddingTop: 10}}>
                    <Col>
                        <div>
                            <span><b>{value.invoice}</b>
                                <Badge style={{ marginLeft: "5px" }} color={badgeColor}>{value.status}</Badge></span>
                            <p>{value.date}</p>
                        </div>
                    </Col>
                </Row>
                <div className="row p-3">
                    <div className="col-md-2">
                        <img src={value.detail[0].image} width="100%" />
                    </div>
                    <div className="col-md-7 d-flex flex-column justify-content-center">
                        <h4 style={{ fontWeight: "bolder" }}>{value.detail[0].nama}</h4>
                        <p className="text-muted">{value.detail[0].qty} x Rp. {value.detail[0].harga.toLocaleString()}</p>
                        <p className='m-0' style={{ fontSize: "12px" }}>Masa Sewa: </p>
                        <p className='text-muted' style={{ fontSize: "12px" }}>{value.detail[0].startRent} - {value.detail[0].endRent} </p>
                        {
                            value.detail.length > 1 ?
                                <a className="text-muted" style={{ cursor: "pointer" }}>+{value.detail.length - 1} Produk Lainnya</a>
                                : ""
                        }
                    </div>
                    <div className="col-md-3">
                        <p className="text-muted">Total Belanja</p>
                        <h4 style={{ fontWeight: "bolder" }}>Rp. {value.totalPayment.toLocaleString()}</h4>
                    </div>
                </div>
                <div style={{ textAlign: "right", marginRight: 20 }}>
                    <Button color="danger" onClick={() => this.btBatal(value.id)} style={{ marginRight: 10 }} >Batalkan Pesanan</Button>
                    <Button color="primary" outline >
                        {/* onClick={() => this.setState({ openModal: !this.state.openModal, detail: value, selectedIdx: index })}> */}
                        {/* onClick={() => this.setState({ openModal: !this.state.openModal, detail: value, selectedIdx: index })}> */}
                        Lihat Detail Produk
                    </Button>
                </div>

            </div>
        })
    }

    render() {
        return (
            <div className='container'>
                <h1 className='my-3' style={{ color: "#EF4723" }}>Riwayat Transaksi Anda</h1>
                {this.printHistory()}
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        iduser: state.userReducer.id,
        role: state.userReducer.role
    }
}

export default connect(mapToProps)(History);