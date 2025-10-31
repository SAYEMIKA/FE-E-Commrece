import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_are.svg'

const AddProduct = () => {

    const [image,setImage] = useState(null);
    const [productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })

    const changeHandler = (e) =>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    const Add_Product = async () =>{
        console.log(productDetails);
        let responseData;
        let product = { ...productDetails };

        try {
            // Upload image if present
            if (image) {
                const formData = new FormData();
                formData.append('product', image);

                const uploadResp = await fetch('http://localhost:4000/upload',{
                    method: 'POST',
                    body: formData,
                });
                responseData = await uploadResp.json().catch(()=>null);

                // backend may return success:1 or success:true, or image_url
                if (responseData && (responseData.success === 1 || responseData.success === true || responseData.image_url)) {
                    product.image = responseData.image_url || '';
                    console.log('Uploaded image, url=', product.image);
                } else {
                    console.warn('Upload returned unexpected response', responseData);
                }
            }

            // Post product data
            const addResp = await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: product.name,
                    image: product.image,
                    category: product.category,
                    new_price: product.new_price,
                    old_price: product.old_price,
                })
            });
            if (!addResp.ok) {
                const t = await addResp.text().catch(()=>null);
                throw new Error('Add product failed: ' + (t || addResp.status));
            }
            const addJson = await addResp.json().catch(()=>null);
            console.log('Add product response', addJson);
            alert('Product submitted')
            // reset form
            setProductDetails({ name:"", image:"", category:"women", new_price:"", old_price:"" })
            setImage(null)
        } catch (err) {
            console.error(err)
            alert('Error submitting product: ' + (err.message || err))
        }
    }

    const imageHandler = (e) => {
        setImage(e.target.files[0]);

    }
    
  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Product title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
            </div>
             <div className="addproduct-itemfield">
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" id="">
                <option value="women">women</option>
                <option value="men">men</option>
                <option value="kid">kid</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt="" />
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
        </div>
            <button onClick={Add_Product} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct