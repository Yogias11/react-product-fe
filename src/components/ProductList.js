import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProductList = () => {
    const [ product, setProudct] = useState([])

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        const response = await axios.get("http://localhost:3000/product")
        setProudct(response.data)
    }

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/product/${id}`)
            getProduct()
        } catch (error) {
            console.log(error);
        }
    }

    // function () {
        const showAlert = () => {
            Swal.fire({
                title: "Success",
                text: "Alert successful",
                icon: "success",
                confirmButtonText: "OK",
              });
        }
    // }

    return (
        <div className='columns mt-5'>
            <div className='column is-half'>
                <Link to="add" className='button is-success is-small is-outlined is-rounded'>
                    Add New
                </Link>
                <table className='table is-striped is-hoverable is-fullwidth mt-2'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Harga</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.map((prd, index) => (
                            <tr key={prd._id}>
                                <td>{index + 1}</td>
                                <td>{prd.title}</td>
                                <td>{prd.price}</td>
                                <td>
                                    <Link to={`edit/${prd._id}`}
                                    className="button is-info is-small is-outlined is-rounded mr-1">Edit</Link>

<button onClick={showAlert} className="button is-info is-small is-outlined is-rounded">Show Alert</button>
                                    <button onClick={() => deleteProduct(prd._id)}
                                    className='button is-danger is-small is-outlined is-rounded'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductList;