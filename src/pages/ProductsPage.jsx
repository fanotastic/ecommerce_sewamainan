import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, InputGroup, Input, Card, CardImg, CardBody, CardTitle, Label, InputGroupText, Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { API_URL } from '../helper';

const ProductsPage = (props) => {

    const [page, setPage] = useState(1)

    const [product, setProduct] = useState([])

    useEffect(() => {
        getProduct()
    }, [])

    const getProduct = async () => {
        try {
            let res = await axios.get(`${API_URL}/products`)
            setProduct(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const printBtPagination = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(product.length / 8); i++) {
            btn.push(<Button style={{backgroundColor: 'black'}}
                disabled={page == i + 1 ? true : false}
                onClick={() => setPage({ page: i + 1 })}>
                {i + 1}
            </Button>)
        }
        return btn;
    }

    const printProducts = () => {
        console.log("dapet produk", product)
        return product.slice(page > 1 ? (page - 1) * 8 : page - 1, page * 8).map((value, index) => {
            return (
                <div className="col-md-3 mt-2 p-3">
                    <Card className="bg-white-rounded shadow">
                        <Link to={`/product-detail?id=${value.id}`}
                            style={{ textDecoration: "none", color: "black" }}>
                            <CardImg top
                                src={value.images[0]}
                                width="80%"
                                alt={`${value.nama}-${index}`}
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
                                placeholder="Search" />
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
                {printProducts()}
            </div>
            <div className="row p-5">
                <ButtonGroup>
                    {printBtPagination()}
                </ButtonGroup>
            </div>
        </div>
    )
}

export default ProductsPage