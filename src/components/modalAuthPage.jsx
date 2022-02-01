import React from 'react';
import { connect } from 'react-redux';
import { ModalHeader, Modal, ModalBody, FormGroup, Label, Input, InputGroupText, InputGroup, Button, Toast, ToastHeader, ToastBody } from 'reactstrap';
import { loginAction } from '../redux/actions'
import { Register } from '../redux/actions'
import toddler from '../img/toddler.png'
import logo from '../img/logo2.png'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';

class ModalAuthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logPassType: "Password",
            logPassShow: <VisibilityOffIcon sx={{ color: '#CED4DA', fontSize: 20 }} />,
            regPassType: "password",
            regPassShow: <VisibilityOffIcon sx={{ color: '#CED4DA', fontSize: 20 }} />,
            toastOpen: "",
            toastHeader: "",
            toastMessage: "",
            toastIcon: ""
        }
    }

    btLogin = () => {
        this.props.loginAction(this.usernameLogin.value, this.passwordLogin.value)
        this.props.btClose()
    }

    btRegister = () => {
        if (this.usernameRegister.value == "" || this.emailRegister.value == "" || this.passwordRegister.value == "" || this.confPasswordRegister.value == "") {
            this.setState({
                toastOpen: true,
                toastHeader: "Register Warning",
                toastIcon: "warning",
                toastMessage: "Isi semua data"
            })
        } else {
            if (this.passwordRegister.value == this.confPasswordRegister.value) {
                if (this.emailRegister.value.includes("@")) {
                    this.props.Register(this.usernameRegister.value, this.emailRegister.value, this.passwordRegister.value)
                    this.props.btClose()
                    this.setState({
                        toastOpen: true,
                        toastHeader: "Register Status",
                        toastIcon: "success",
                        toastMessage: "Registrasi Berhasil"
                    })

                } else {
                    this.setState({
                        toastOpen: true,
                        toastHeader: "Register Warning",
                        toastIcon: "warning",
                        toastMessage: "Email salah"
                    })
                }
            } else {
                this.setState({
                    toastOpen: true,
                    toastHeader: "Register Warning",
                    toastIcon: "warning",
                    toastMessage: "Password tidak sesuai"
                })
            }
        }
    }

    btShowPassLogin = () => {
        if (this.state.logPassType == "password") {
            this.setState({
                logPassShow: <VisibilityIcon sx={{ fontSize: 20 }} />,
                logPassType: "text"
            })
        } else {
            this.setState({
                logPassShow: <VisibilityOffIcon sx={{ color: '#CED4DA', fontSize: 20 }} />,
                logPassType: "password"
            })
        }
    }

    btShowPassRegister = () => {
        if (this.state.regPassType == "password") {
            this.setState({
                regPassShow: <VisibilityIcon sx={{ fontSize: 20 }} />,
                regPassType: "text"
            })
        } else {
            this.setState({
                regPassShow: <VisibilityOffIcon sx={{ color: '#CED4DA', fontSize: 20 }} />,
                regPassType: "password"
            })
        }
    }

    render() {
        return (
            <div>
                <Toast isOpen={this.state.toastOpen} style={{ position: "fixed" }}>
                    <ToastHeader icon={this.state.toastIcon}
                        toggle={() => this.setState({ toastOpen: false })}>
                        {this.state.toastHeader}
                    </ToastHeader>
                    <ToastBody>
                        {this.state.toastMessage}
                    </ToastBody>
                </Toast>
                <Modal size='lg' isOpen={this.props.modalOpen} toggle={this.props.btClose} aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <img className="rounded mt-4 d-flex m-auto" src={logo} width="10%"  />
                    <div className='container-fluid d-flex justify-content-between px-3'>
                        <div>
                            <h3 className='mx-3 my-3 text-center' style={{ fontWeight: 'bold' }}>Masuk</h3>
                            <p className="px-3 text-muted text-center" style={{ fontSize: 14, marginTop: 10, marginBottom: 0 }}>Sudah memiliki akun? Silahkan login</p>
                            <ModalBody>
                                <FormGroup style={{ marginTop: 21 }}>
                                    <InputGroup>
                                        <InputGroupText style={{ cursor: "pointer", border: "1px solid #CED4DA", backgroundColor: 'white' }} onClick={this.btShowPassLogin}>
                                            <PersonIcon sx={{ fontSize: 16 }} />
                                        </InputGroupText>
                                        <Input size={200} type="text" id="textNama" placeholder="Username" style={{ borderLeft: "0px" }}
                                            innerRef={(element) => this.usernameLogin = element} />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupText style={{ cursor: "pointer", border: '1px solid #CED4DA', backgroundColor: 'white' }} onClick={this.btShowPassLogin}>
                                            <KeyIcon sx={{ fontSize: 16 }} />
                                        </InputGroupText>
                                        <Input type={this.state.logPassType} id="textPassword" placeholder="Kata Sandi" style={{ borderLeft: "0px", borderRight: "0px" }}
                                            innerRef={(element) => this.passwordLogin = element} />
                                        <InputGroupText style={{ cursor: "pointer", backgroundColor: 'white' }} onClick={this.btShowPassLogin}>
                                            {this.state.logPassShow}
                                        </InputGroupText>
                                    </InputGroup>
                                </FormGroup>
                                <Button style={{ width: "100%", backgroundColor: "#e67e22", borderRadius: 40, marginTop: 20 }} onClick={this.btLogin}>Login</Button>
                                <img className="rounded my-4" src={toddler} width="100%" />
                            </ModalBody>
                        </div>
                        <div style={{ marginLeft: 20 }}>
                            <h3 className='mx-3 my-3 text-center' style={{ fontWeight: 'bold' }}>Register</h3>
                            <p className="px-3 text-muted" style={{ fontSize: 14, marginTop: 10, marginBottom: 0, textAlign: 'center' }}>Bergabung dan rasakan kemudahan bertransaksi di Marita Store</p>
                            <ModalBody>
                                <FormGroup>
                                    <Input size={200} type="text" id="textNamaReg" placeholder="Your username"
                                        innerRef={(element) => this.usernameRegister = element} />                                    
                                </FormGroup>
                                <FormGroup>
                                    <Input type="text" id="textEmailReg" placeholder="Your email"
                                        innerRef={(element) => this.emailRegister = element} />
                                        <p className="text-muted example-auth m-0">Contoh: email@maritastore.com</p> 
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup style={{ border: '1px solid #CED4DA', borderRadius: "5px" }}>
                                        <Input type={this.state.regPassType} id="textPasswordReg" placeholder="Kata Sandi" style={{ border: '0px' }}
                                            innerRef={(element) => this.passwordRegister = element} />
                                        <InputGroupText style={{ cursor: "pointer", backgroundColor: 'white', border: '0px' }} onClick={this.btShowPassRegister}>
                                            {this.state.regPassShow}
                                        </InputGroupText>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup style={{ border: '1px solid #CED4DA', borderRadius: "5px" }}>
                                        <Input type={this.state.regPassType} id="textConfirmPassword" placeholder="Confirm password" style={{ border: '0px' }} innerRef={(element) => this.confPasswordRegister = element} />
                                        <InputGroupText style={{ cursor: "pointer", backgroundColor: 'white', border: '0px' }} onClick={this.btShowPassRegister}>
                                            {this.state.regPassShow}
                                        </InputGroupText>
                                    </InputGroup>
                                </FormGroup>
                                <Button style={{ width: "100%", backgroundColor: "#e67e22", borderRadius: 40 }} onClick={this.btRegister}>Register</Button>
                            </ModalBody>
                        </div>
                    </div>
                </Modal>
            </div>

        );
    }
}

const mapToProps = (state) => {
    return {
        iduser: state.userReducer.id
    }
}

export default connect(mapToProps, { loginAction, Register })(ModalAuthPage);