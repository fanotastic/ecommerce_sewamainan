import React, { Component } from 'react';
import CopyrightIcon from '@mui/icons-material/Copyright';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Row, Col } from 'reactstrap';
import logo from '../img/logo.png';


class FooterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div style={{ backgroundColor: '#ECF0F1' }}>
                <div className='container py-3' style={{ backgroundColor: '#ECF0F1', borderTop: "1px solid #ECF0F1", borderColor: "#ECF0F1", marginTop: 20, color: 'darkgrey' }}>
                    <div className="row align-items-center">
                        <div className='col-md-4 d-flex align-items-center text-center'>
                            <img src='https://i.ibb.co/smMzRn6/logo-marita-rental.png' width="15%" />
                            <p style={{ fontSize: 10, fontSize: 12, marginLeft: 10, marginBottom: 0 }}><CopyrightIcon sx={{ fontSize: 13 }} /> 2021. Marita Rental </p>
                        </div>
                        <div className="col-md-4 text-md-center my-md-3">
                            <p style={{ marginBottom: 0, fontSize: 13 }}>Syarat & Ketentuan</p>
                            <p style={{ marginBottom: 0, fontSize: 13 }}>Kebijakan Privasi</p>
                        </div>
                        <div className="col-md-3 offset-md-1">
                            <div className='d-flex'>
                                <EmailIcon sx={{ fontSize: 20 }} className='mx-2' />
                                <p style={{ fontSize: 13, margin: 0 }}>  maritarental@gmail.com</p>
                            </div>
                            <div className='d-flex'>
                                <InstagramIcon sx={{ fontSize: 20 }} className='mx-2' />
                                <p style={{ fontSize: 13, margin: 0 }}>  maritarental</p>
                            </div>
                            <div className='d-flex'>
                                <WhatsAppIcon sx={{ fontSize: 20 }} className='mx-2' />
                                <p style={{ fontSize: 13, margin: 0 }}>  maritarental</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FooterComponent;