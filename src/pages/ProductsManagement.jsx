import React, { useEffect, useState } from 'react';
import { Button, NavItem, Table } from 'reactstrap';
import { API_URL } from '../helper';
import axios from 'axios';

const ProductManagement = (props) => {

    const [product, setProduct] = useState([])

    useEffect(() => {
        getProduct()
    }, [])

    const getProduct = async () => {
        try {
            let res = await axios.get(`${API_URL}/products`)
            console.log("ambil data berhasil", res.data)
            setProduct(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const printProduk = () => {
        console.log("ambil data berhasil", product)
        return product.map((value, index) => {
            return <tr>
                <td>{index + 1}</td>
                <td style={{ width: '20vw', textAlign: 'center' }}>
                    <img src={value.images[0]} width="80%" alt={value.nama + index} />
                </td>
                <td>{value.nama}</td>
                <td>{value.kategori}</td>
                <td>Rp. {value.hargaSewa}</td>
                <td>Rp. {value.hargaProduk}</td>
                <td>
                    <Button style={{marginBottom: 10}} type="button" size="sm" color="warning">Detail</Button>
                    <Button type="button" size="sm" color="danger">Delete</Button>
                </td>
            </tr>
        })
    }

    return (
        <div className='container'>
            <Table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Product</th>
                        <th>Nama</th>
                        <th>Kategori</th>
                        <th>Harga Sewa</th>
                        <th>Harga Produk</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {printProduk()}
                </tbody>
            </Table>
        </div>
    )
}


export default ProductManagement;
