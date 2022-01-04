import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Table, Col, FormGroup, Label, Input } from 'reactstrap';
import { updateUserCart } from '../redux/actions';
import { Cancel } from '@material-ui/icons';
import axios from 'axios';
import { API_URL } from '../helper';

class CartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    totalPayment = () => {
        let total = 0;
        this.props.cart.forEach((value) => total += value.harga )
        return total
    }

    shipping = () => {
        let total = 0;
        this.props.cart.forEach((value) => total += value.harga * 10 / 100 )
        return total
    }

    onBtCheckOut = () => {
        const d = new Date();
        let total = this.totalPayment() + this.shipping()
        console.log("id", this.props.iduser, "username", this.props.username, "total", total)
        let dataCheckOut = {
            iduser: this.props.iduser,
            username: this.props.username,
            invoice: `#INV/${d.getTime()}`,
            date: d.toLocaleString(),
            totalPayment: total,
            shipping: this.shipping(),
            note: this.note.value,
            detail: [...this.props.cart],
            status: "Menunggu Konfirmasi"
        }
        axios.post(`${API_URL}/userTransactions`, dataCheckOut)
            .then((res) => {
                this.props.updateUserCart([], this.props.iduser)
            }). catch((err)=> {
                console.log(err)
            })
    }

    render() {
        return (
            <>
                <div className='row container m-auto mt-3'>
                    <div className='col-lg-7 p-3' style={{borderWidth: 2}}>
                        <Table>
                            <thead>
                                <tr>
                                    <th colSpan={3}>Produk</th>
                                    <th>Harga</th>
                                    <th>Jumlah</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.cart.map((value, index) => {
                                    return (
                                        <tr className='align-items-center'>
                                            <td>
                                                <Cancel style={{ cursor: 'pointer' }} />
                                            </td>
                                            <td>
                                                <img src={value.image} width="99vw" className='rounded-3' />
                                            </td>
                                            <td>
                                                <p>{value.nama}</p>
                                            </td>
                                            <td>
                                                Rp. {value.harga}
                                            </td>
                                            <td>
                                                {value.qty}
                                            </td>
                                            <td>
                                                Rp. {value.harga}
                                            </td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>
                    <div className='col-lg-5 px-3' style={{marginTop: 50, padding: 20}}>
                        <p>Total Keranjang Belanja</p>
                        <Row xs='2'>
                            <Col>
                                <p>Subtotal</p>
                            </Col>
                            <Col>
                                <p>Rp. {this.totalPayment().toLocaleString()} </p>
                            </Col>
                        </Row>
                        <Row xs='2'>
                            <Col>
                                <p>Shipping</p>
                            </Col>
                            <Col>
                                <p>Rp. {this.shipping().toLocaleString()} </p>
                            </Col>
                        </Row>
                        <Row xs='2'>
                            <Col>
                                <p>Total</p>
                            </Col>
                            <Col>
                                <p>Rp. {(this.shipping() + this.totalPayment()).toLocaleString()} </p>
                            </Col>
                        </Row>
                        <Button type='button' color='primary' style={{width: "100%"}} onClick={this.onBtCheckOut}>LANJUTKAN KE CHECKOUT</Button>        
                        <FormGroup className='my-3'>
                            <Label for="note">Notes</Label>
                            <Input type="textarea" id="note" innerRef={elemen => this.note = elemen} />
                        </FormGroup>
                    </div>
                </div>
            </>
        );
    }
}

const mapToProps = (state) => {
    return {
        cart: state.userReducer.cart,
        username: state.userReducer.username,
        iduser: state.userReducer.id

    }
}

export default connect(mapToProps, { updateUserCart })(CartPage);