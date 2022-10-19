import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        getProductById();
    }, []);

    const getProductById = async () => {
        const response = await axios.get(`http://localhost:3000/product/${id}`);
        setTitle(response.data.title)
        setPrice(response.data.price)
    }

    const updateUSer = async (e) => {
        e.preventDefault()
        try {
            await axios.patch(`http://localhost:3000/product/${id}`,{
                title, price
            })
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="columns mt-5">
            <div className="column is-half">
                <form onSubmit={updateUSer}>
                    <div className="field">
                        <label className="label">Nama</label>
                        <div className="control">    
                            <input
                                type="text"
                                className="input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Nama" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Harga</label>
                        <div className="control">    
                            <input
                                type="number"
                                className="input"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Harga" />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-success">Saved</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProduct;