import React from 'react';
import { connect } from 'react-redux';
import { ModalHeader, Modal, ModalBody, FormGroup, Label, Input, InputGroupText, InputGroup, Button } from 'reactstrap';
import { loginAction } from '../redux/actions'


class ModalAuthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logPassType: "password",
            logPassShow: "Show",
            regPassType: "password",
            regPassShow: "Show"
        }
    }

    btLogin = () => {
        this.props.loginAction(this.usernameLogin.value, this.passwordLogin.value)
    }

    btShowPassLogin = () => {
        if (this.state.logPassType == "password") {
            this.setState({
                logPassShow: "Hide",
                logPassType: "text"
            })
        } else {
            this.setState({
                logPassShow: "Show",
                logPassType: "password"
            })
        }
    }

    btShowPassRegister = () => {
        if (this.state.regPassType == "password") {
            this.setState({
                regPassShow: "Hide",
                regPassType: "text"
            })
        } else {
            this.setState({
                regPassShow: "Show",
                regPassType: "password"
            })
        }
    }

    render() {
        return (
            <Modal size='lg' isOpen={this.props.modalOpen} toggle={this.props.btClose}>
                <div className='container-fluid d-flex justify-content-between px-5'>
                    <div className='py-4'>
                        <h3 className='mx-3 my-3 text-center'>Login</h3>
                        <p className="px-3 text-center" style={{ fontSize: 14, marginTop: 10, marginBottom: 0 }}>Sudah memiliki akun? Silahkan login</p>
                        <ModalBody>
                            <FormGroup style={{ marginTop: 21 }}>
                                <Label>Username</Label>
                                <Input size={200} type="text" id="textNama" placeholder="Your username"
                                innerRef={(element) => this.usernameLogin = element} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <InputGroup>
                                    <Input type={this.state.logPassType} id="textPassword" placeholder="Your password"
                                        innerRef={(element) => this.passwordLogin = element} />
                                    <InputGroupText style={{ cursor: "pointer" }} onClick={this.btShowPassLogin}>
                                        {this.state.logPassShow}
                                    </InputGroupText>
                                </InputGroup>
                            </FormGroup>
                            <Button style={{ width: "100%", backgroundColor: "#e67e22" }} onClick={this.btLogin}>Login</Button>
                        </ModalBody>
                    </div>
                    <div className='py-4' style={{ marginLeft: 20 }}>
                        <h3 className='mx-3 my-3 text-center'>Register</h3>
                        <p className="px-3 text-center" style={{ fontSize: 14, marginTop: 10, marginBottom: 0 }}>Bergabung dan rasakan kemudahan bertransaksi di Marita Store</p>
                        <ModalBody>
                            <FormGroup>
                                <Label>Username</Label>
                                <Input size={200} type="text" id="textNamaReg" placeholder="Your username"
                                innerRef={(element) => this.usernameRegister = element} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input type="text" id="textEmailReg" placeholder="Your email"
                                innerRef={(element) => this.emailRegister = element} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <InputGroup>
                                    <Input type={this.state.regPassType} id="textPasswordReg" placeholder="Your password"
                                    innerRef={(element) => this.passwordRegister = element} />
                                    <InputGroupText style={{ cursor: "pointer" }} onClick={this.btShowPassRegister}>
                                        {this.state.regPassShow}
                                    </InputGroupText>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label>Confirm Password</Label>
                                <InputGroup>
                                    <Input type={this.state.regPassType} id="textConfirmPassword" placeholder="Your password" />
                                    <InputGroupText style={{ cursor: "pointer" }} onClick={this.btShowPassRegister}>
                                        {this.state.regPassShow}
                                    </InputGroupText>
                                </InputGroup>
                            </FormGroup>
                            <Button style={{ width: "100%", backgroundColor: "#e67e22" }} onClick={this.btLogin}>Register</Button>
                        </ModalBody>
                    </div>
                </div>
                <ModalBody>

                </ModalBody>
            </Modal>

        );
    }
}

const mapToProps = (state) => {
    return {
        iduser: state.userReducer.id
    }
}

export default connect(mapToProps, { loginAction }) (ModalAuthPage);