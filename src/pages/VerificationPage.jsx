import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { verifyLogin } from '../redux/actions';

const VerificationPage = (props) => {
    const [redirect, setRedirect] = useState(false)

    const dispatch = useDispatch()
    const verify = async () => {
        try {
            let res = await dispatch(verifyLogin())
            if (res.success) {
                setRedirect(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (redirect) {
        return <Navigate to='/' />
    }

    return (
        <div className="container text-center" style={{height:'76vh'}}>
            <p className='homepageh1'> Silahkan verifikasi emailmu dengan klik tombol dibawah! </p>
            <Button color='primary' type='button' onClick={verify} style={{marginTop: 20}}>Verifikasi Akun</Button>
        </div>
    )
}

export default VerificationPage;