import React, { Component } from 'react';
import { FormGroup, Input, InputGroup, InputGroupText, Button } from 'reactstrap';
import babyplaying from '../img/babyplaying.png'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            regPassType: "password",
            regPassShow: <VisibilityOffIcon sx={{ color: '#CED4DA', fontSize: 20 }} />
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
            <div className='container d-flex align-items-center shadow' style={{ height: "77vh" }}>
                <div className="row mx-3">
                    <div className='col-md-6 my-3'>
                        <img className="rounded mt-4 mb-1 d-flex m-auto" src="https://images.unsplash.com/photo-1596066190600-3af9aadaaea1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80" width="100%" />
                    </div>
                    <div className='col-md-6 py-3' style={{ paddingLeft: 20 }}>
                        <div style={{ marginBottom: 30 }}>
                            <p style={{ fontSize: 25, fontWeight: 'bold', textAlign: "center", marginBottom: "5px" }}>Daftar</p>
                            <p className='text-muted text-center'>Bergabung dan rasakan kemudahan bertransaksi di Marita Store</p>
                        </div>
                        <FormGroup>
                            <Input height={50} type="text" id="textNamaReg" placeholder="Your username"
                                innerRef={(element) => this.usernameRegister = element} />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" id="textEmailReg" placeholder="Your email"
                                innerRef={(element) => this.emailRegister = element} />
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
                        <Button style={{ width: "100%", backgroundColor: "#e67e22" }} onClick={this.btRegister}>Register</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;