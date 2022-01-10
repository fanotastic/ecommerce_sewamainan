import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavbarToggler, Collapse, NavItem, NavbarBrand, UncontrolledDropdown, DropdownToggle, Button, DropdownMenu, DropdownItem, Label } from 'reactstrap';
import ModalAuthPage from './modalAuthPage';
import { logOutAction } from '../redux/actions';
import { Avatar } from '@material-ui/core';
import LanguageIcon from "@material-ui/icons/Language";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';



class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openCollapse: false,
            modalAuthPage: false
        }
    }
    render() {
        return (
            <Navbar expand="md" className='d-flex justify-content-space-between'>
                <ModalAuthPage
                    modalOpen={this.state.modalAuthPage}
                    btClose={() => this.setState({ modalAuthPage: !this.state.modalAuthPage })}
                />
                <NavbarToggler onClick={() => this.setState({ openCollapse: !this.state.openCollapse })} />
                <Collapse isOpen={this.state.openCollapse} navbar>
                    {/* <div className="container-fluid d-flex justify-content-between align-items-center" style={{padding: 0, margin: 0 , backgroundColor: 'white'}}> */}
                    <Nav>
                        <NavItem>
                            <Link to="/" className="nav-link" style={{ color: "#d35400" }}>
                                Home
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/product-page" className="nav-link" style={{ color: "#d35400" }}>
                                Products
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/about" className="nav-link" style={{ color: "#d35400" }}>
                                About
                            </Link>
                        </NavItem>
                    </Nav>
                    <NavbarBrand style={{ margin: "auto" }}>
                        <Link to="/">
                            <img src="https://i.ibb.co/smMzRn6/logo-marita-rental.png" width="70px" />
                        </Link>
                    </NavbarBrand>
                    {/* <Nav> */}
                    {
                        this.props.username ?
                            <UncontrolledDropdown className='d-flex align-items-center' style={{ marginLeft: 70 }}>
                                <DropdownToggle caret nav size="sm" outline style={{ color: "#d35400", paddingBottom: 0 }}>
                                    <Label style={{ color: "#d35400" }}>Hello, <b style={{ fontWeight: "bold" }}>   {this.props.username}</b></Label>
                                </DropdownToggle>
                                {
                                    this.props.role == "user" ?
                                        <Link to="/cart-user" style={{ color: "#2d3436", textDecoration: "none" }}>
                                            <div style={{ paddingTop: 15, color: "#d35400" }}>
                                                <p><ShoppingCartOutlinedIcon />{this.props.cart.length}</p>
                                            </div>
                                        </Link>
                                        : null
                                }

                                {
                                    this.props.role == "user"
                                        ?
                                        <DropdownMenu right>
                                            <DropdownItem>
                                                <Link to="/cart-user" style={{ color: "#2d3436", textDecoration: "none" }}>
                                                    Keranjang
                                                </Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link to="/history-user" style={{ color: "#2d3436", textDecoration: "none" }}>
                                                    Riwayat Transaksi
                                                </Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link to="" style={{ color: "#2d3436", textDecoration: "none" }}>
                                                    Profile
                                                </Link>
                                            </DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem onClick={() => {
                                                localStorage.removeItem("data");
                                                this.props.logOutAction();
                                            }}>
                                                Keluar
                                            </DropdownItem>
                                        </DropdownMenu>
                                        :
                                        <DropdownMenu right >
                                            <DropdownItem>
                                                <Link to="/product-management" style={{ color: "#2d3436" }} className="nav-link">
                                                    Products Management
                                                </Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link to="/transaction-management" style={{ color: "#2d3436" }} className="nav-link">
                                                    Transactions Management
                                                </Link>
                                            </DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem onClick={() => {
                                                localStorage.removeItem("data");
                                                this.props.logOutAction();
                                            }}>
                                                Keluar
                                            </DropdownItem>
                                        </DropdownMenu>
                                }
                            </UncontrolledDropdown>
                            :
                            <div className="d-flex align-items-center" style={{ marginRight: 20 }}>
                                <LanguageIcon />
                                <ExpandMoreIcon />
                                <Avatar style={{ cursor: 'pointer' }} onClick={() => this.setState({ modalAuthPage: !this.state.modalAuthPage })} />
                                {/* <Button color="success" type="button" outline onClick={() => this.setState({ modalAuthPage: !this.state.modalAuthPage })}>Masuk/Daftar</Button> */}
                            </div>

                    }
                    {/* </Nav> */}
                    {/* </div> */}
                </Collapse>
            </Navbar >
        );
    }
}

const mapToProps = (state) => {
    return {
        username: state.userReducer.username,
        role: state.userReducer.role,
        cart: state.userReducer.cart
    }
}

export default connect(mapToProps, { logOutAction })(NavbarComponent);