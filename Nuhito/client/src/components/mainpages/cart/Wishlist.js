import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
// import axios from 'axios'
import img_empty from '../../../assets/images/emprt-cart/empty-cart.png'

function Wishlist() {
    const state = useContext(GlobalState)
    const [wishlist, setWishlist] = state.userAPI.wishlist
    const addCart = state.userAPI.addCart
    const [token] = state.token
    const [total, setTotal] = useState(0)

    const addToWishlist = async (wishlist) => {
        const response = await fetch('/user/addwishlist', {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({wishlist})
        });
    
        if (!response.ok) {
            throw new Error('Response is not OK');
        }
    }

    const removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            wishlist.forEach((item, index) => {
                if(item._id === id){
                    wishlist.splice(index, 1)
                }
            })

            setWishlist([...wishlist])
            addToWishlist(wishlist)
        }
    }

    if(wishlist.length === 0) 
        return (
        <div class="empty-wishlist-section section-fluid">
            <div class="emptywishlist-wrapper">
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-md-10 offset-md-1 col-xl-6 offset-xl-3">
                            <div class="emptywishlist-content text-center">
                                <div class="image">
                                    <img class="img-fluid" src={img_empty} alt=""/>
                                </div>
                                <h4 class="title">EMPTY</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )

    return (
        <div class="wishlist-section">
            <div class="wishlist-table-wrapper">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="table_desc">
                                <div class="table_page table-responsive">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th class="product_remove">Xoá</th>
                                                <th class="product_thumb">Hình ảnh</th>
                                                <th class="product_name">Sản phẩm</th>
                                                <th class="product-price">Giá</th>
                                                <th class="add_to_cart">Thêm vào giỏ hàng</th>
                                            </tr>
                                        </thead> 
                                        <tbody>
                                        {
                                            wishlist.map(product => (
                                                <tr key={product._id}>
                                                    <td class="product_remove"><a href="#" onClick={() => removeProduct(product._id)}><i class="fa fa-trash-o"></i></a></td>
                                                    <td class="product_thumb"><a href={`/detail/${product._id}`}><img src={product.image1.url} alt=""/></a></td>
                                                    <td class="product_name"><a href={`/detail/${product._id}`}>{product.title}</a></td>
                                                    <td class="product-price">{product.price}đ</td> 
                                                    <td class="add_to_cart"><div class="product-add-to-cart-btn"><a href='#' onClick={() => addCart(product, 1)}>Thêm</a></div></td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wishlist