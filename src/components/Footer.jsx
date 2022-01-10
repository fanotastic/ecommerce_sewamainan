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
            <div className='container-fluid py-3' style={{ backgroundColor: '#ecf0f1', borderTop: "1px solid", borderColor: "#7f8c8d", marginTop: 20 }}>
                <div className="container d-flex align-items-center">
                        <img src='https://i.ibb.co/smMzRn6/logo-marita-rental.png' width="5%" style={{marginRight: '5px'}}/>                    
                    <div className='col-md-3'>
                        <p style={{marginBottom: 0, fontSize: 10}}><CopyrightIcon sx={{ fontSize: 13}} /> 2021. MARITA STORE </p>
                    </div>
                    <div className="col-md-3">
                        <p style={{marginBottom: 0, textAlign: 'right'}}><EmailIcon /> maritastore@gmail.com</p>
                    </div>
                    <div className="col-md-3 d-flex" style={{marginLeft: "auto"}}>
                                <InstagramIcon />
                                <WhatsAppIcon />
                    </div>
                </div>
            </div>
        );
    }
}

export default FooterComponent;