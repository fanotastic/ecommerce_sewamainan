import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, InputGroup, Input, Card, CardImg, CardBody, CardTitle, Label, InputGroupText, Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { API_URL } from '../helper';
import { getProductsAction } from '../redux/actions';
import { connect } from 'react-redux';


class ProductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            product: []
        }
    }

    componentDidMount() {
        this.getProduct()
    }

    getProduct = async () => {
        try {
            let res = await axios.get(`${API_URL}/products`)
            this.setState({ product: res.data })
        } catch (error) {
            console.log(error)
        }
    }

    btSearch = async () => {
        try {
            let res = await axios.get(`${API_URL}/products?nama=${this.inSearchName.value}`)
            this.setState({ product: res.data })
        } catch (error) {
            console.log(error)
        }
    }

    printBtPagination = () => {
        let page = this.state.page
        let btn = []
        for (let i = 0; i < Math.ceil(this.state.product.length / 8); i++) {
            btn.push(<Button style={{ backgroundColor: 'gray' }}
                disabled={page == i + 1 ? true : false}
                onClick={() => this.setState ({ page: i + 1 })}>
                {i + 1}
            </Button>)
        }
        return btn;
    }

    printProducts = () => {
        let {page} = this.state
        return this.state.product.slice(page > 1 ? (page - 1) * 8 : page - 1, page * 8).map((value, index) => {
            return (
                <div className="col-md-3 mt-2 p-3">
                    <Card className="bg-white-rounded shadow">
                        <Link to={`/product-detail?id=${value.id}`}
                            style={{ textDecoration: "none", color: "black", textAlign: "center" }}>
                            <CardImg top
                                src={value.images[0]}                                
                                width="30%"
                                alt={`${value.nama}-${index}`}
                                style={{objectFit: "contain"}}
                            />
                            <CardBody>
                                <CardTitle tag="h5" style={{ fontWeight: "bolder" }}>{value.nama}</CardTitle>
                                <CardTitle tag="h6" style={{ fontWeight: "bold" }}>Rp. {value.hargaSewa.toLocaleString()}/hari</CardTitle>
                            </CardBody>
                        </Link>
                    </Card>
                </div>
            )
        })
    }

    render() {
        return (
            <div className='container-fluid' style={{ width: "99vw" }}>
                <div className="container align-items-center mt-4">
                    <Row>
                        <Col className='col-5 offset-1'>
                            <Label>Nama</Label>
                            <InputGroup style={{ width: "350px" }}>
                                <Input
                                    type="text"
                                    id="textSearch"
                                    placeholder="Search"
                                    innerRef={(element) => this.inSearchName = element} />
                                <InputGroupText style={{ cursor: "pointer" }} onClick={this.btSearch}>
                                    Search
                                </InputGroupText>
                            </InputGroup>
                        </Col>
                        <Col className='col-6'>
                            <Label>Categories</Label>
                            <InputGroup>
                                <Input type="select" style={{ marginRight: "auto" }}
                                // innerRef={(element) => this.inSearchSort = element} onChange={this.handleSort}
                                >
                                    <option value="toys">Toys</option>
                                    <option value="bouncer">Bouncer</option>
                                    <option value="baby-swing">Baby Swing</option>
                                    <option value="baby-fence">Baby Fence</option>
                                    <option value="baby-activities">Baby Activities</option>
                                </Input>
                            </InputGroup>
                        </Col>
                    </Row>
                </div>
                <div className="row p-5" style={{ width: "99vw" }}>
                    {this.printProducts()}
                </div>
                <div className='text-center' style={{marginBottom: 20}} >
                    <ButtonGroup>
                        {this.printBtPagination()}
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}

export default ProductsPage;