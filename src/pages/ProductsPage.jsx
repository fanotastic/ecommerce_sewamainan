import axios from 'axios';
import React from 'react';
import { Row, Col, InputGroup, Input, Card, CardImg, CardBody, CardTitle, Label, InputGroupText, Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { API_URL } from '../helper';
import { getProductsAction, getProductsSort, getProductsCategory } from '../redux/actions';
import { connect } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import './products.css'


class ProductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }
    }

    // componentDidMount() {
    //     this.getProduct()
    // }

    // getProduct = async () => {
    //     try {
    //         let res = await axios.get(`${API_URL}/products`)
    //         console.table(res.data.dataProducts)
    //         this.setState({ product: res.data.dataProducts })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    btSearch = () => {
        this.props.getProductsAction({
            name: this.inSearchName.value,
            priceMin: this.priceMin.value,
            priceMax: this.priceMax.value
        })
    }

    btReset = () => {
        this.props.getProductsAction()
        this.inSearchName.value = ""
        this.priceMin.value = ""
        this.priceMax.value = ""
    }

    printBtPagination = () => {
        let page = this.state.page
        let btn = []
        for (let i = 0; i < Math.ceil(this.props.productsList.length / 8); i++) {
            btn.push(<Button className='mx-1' color="primary" style={{ width: 40, height: 40, borderRadius: "50%" }}
                disabled={page == i + 1 ? true : false}
                onClick={() => this.setState({ page: i + 1 })}>
                {i + 1}
            </Button>)
        }
        return btn;
    }

    printProducts = () => {
        let { page } = this.state
        console.log(this.props.productsList)
        return this.props.productsList.slice(page > 1 ? (page - 1) * 8 : page - 1, page * 8).map((value, index) => {
            return (
                <div className="col-md-3 mt-2 p-3 zoom" style={{ width: "25%" }}>
                    <Card className="bg-white-rounded shadow" style={{ borderRadius: 20 }}>
                        <Link to={`/product-detail?idproduct=${value.idproduct}`}
                            style={{ textDecoration: "none", color: "black", textAlign: "center" }}>
                            <CardImg top
                                src={value.images[0].url}
                                width="10%"
                                alt={`${value.nama}-${index}`}
                                style={{ objectFit: "contain", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                            />
                            <CardBody>
                                <CardTitle tag="h5" style={{ fontWeight: "bolder" }}>{value.name}</CardTitle>
                                <CardTitle tag="h6" style={{ fontWeight: "bold" }}>Rp. {value.price_rental.toLocaleString()}/hari</CardTitle>
                            </CardBody>
                        </Link>
                    </Card>
                </div>
            )
        })
    }

    handleSort = (e) => {
        console.log('filed', e.target.value.split('-')[0])
        this.props.getProductsSort({
            field: e.target.value.split('-')[0],
            sortType: e.target.value.split('-')[1]
        })
    }

    handleCategory = (e) => {
        console.log('categor', e.target.value)
        this.props.getProductsCategory({
            category: e.target.value
        })
    }



    render() {
        return (
            <div className='container' style={{ width: "99vw" }}>
                <div className="container align-items-center mt-4 shadow py-4 px-4">
                    <Row>
                        <Col className='col-md-3'>
                            <Label>Nama</Label>
                            <InputGroup style={{ width: "350px", width: 280, marginBottom: 10 }}>
                                <Input
                                    type="text"
                                    id="textSearch"
                                    placeholder="Search"
                                    innerRef={(element) => this.inSearchName = element} />
                                <InputGroupText style={{ cursor: "pointer" }} onClick={this.btSearch}>
                                    <SearchIcon />
                                </InputGroupText>
                            </InputGroup>
                            <div className="d-flex" style={{ marginTop: 30 }}>
                                <Button color="warning" onClick={this.btReset} style={{marginRight: 10}}>Reset</Button>
                                <Button color="primary" style={{ cursor: "pointer" }} onClick={this.btSearch}>Filter</Button>
                            </div>
                        </Col>
                        <Col className='col-md-3'>
                            <Row>
                                <Label>Harga</Label>
                                <Col className="col-6">
                                    <InputGroup style={{ width: "100%", marginRight: "auto" }}>
                                        <Input type="number" id="numMin" placeholder="Min"
                                            innerRef={(element) => this.priceMin = element} />
                                    </InputGroup>
                                </Col>
                                <Col className="col-6">
                                    <InputGroup style={{ width: "100%" }}>
                                        <Input type="number" id="numMax" placeholder="Max"
                                            innerRef={(element) => this.priceMax = element} />
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Col>
                        <div className='col-md-5 offset-md-1' style={{ paddingRight: 40 }}>
                            <Row>
                                <Col className='col-md-6'>
                                    <Label>Kategori</Label>
                                    <InputGroup style={{ width: 200 }}>
                                        <Input type="select"
                                            innerRef={(element) => this.inSearchCategory = element} onChange={this.handleCategory}
                                        >
                                            <option value="Toys">Toys</option>
                                            <option value="Bouncer">Bouncer</option>
                                            <option value="Baby Swing">Baby Swing</option>
                                            <option value="Baby Fence">Baby Fence</option>
                                            <option value="Baby Activities">Baby Activities</option>
                                        </Input>
                                    </InputGroup>
                                </Col>
                                <Col className='col-md-6'>
                                    <Label>Urutkan</Label>
                                    <InputGroup style={{ width: 200 }}>
                                        <Input type='select'
                                            innerRef={(element) => this.inSearchSort = element} onChange={this.handleSort}>
                                            <option>Choose...</option>
                                            <option value='price_rental-asc'>Price Asc</option>
                                            <option value='price_rental-desc'>Price Desc</option>
                                            <option value='name-asc'>A-Z</option>
                                            <option value='name-desc'>Z-A</option>
                                            <option value='idproduct-asc'>Reset</option>
                                        </Input>
                                    </InputGroup>
                                </Col>
                            </Row>

                        </div>

                    </Row>
                </div>
                <div className="row my-5">
                    {this.printProducts()}
                </div>
                <div className='text-center' style={{ marginBottom: 20 }} >
                    <ButtonGroup>
                        {this.printBtPagination()}
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}

const mapToProps = ({ productsReducer }) => {
    return {
        productsList: productsReducer.productsList
    }
}

export default connect(mapToProps, { getProductsAction, getProductsSort, getProductsCategory })(ProductsPage);