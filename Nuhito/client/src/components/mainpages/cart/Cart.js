import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
// import axios from 'axios'
import PaypalButton from './PaypalButton'
import img_empty from '../../../assets/images/emprt-cart/empty-cart.png'

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)

    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])

    const addToCart = async (cart) => {
        const response = await fetch('/user/addcart', {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({cart})
        });
    
        if (!response.ok) {
            throw new Error('Response is not OK');
        }
    }

    const addArrToCart = async (newCart) => {
        const response = await fetch('/user/addcart', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ cart: newCart })
        });
    
        if (!response.ok) {
            throw new Error('Response is not OK');
        }
    };
    
    const increment = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }
    const tranSuccess = async(payment) => {
        const {paymentID, address} = payment;
        await fetch('/api/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({cart, paymentID, address})
        })

        setCart([])
        addToCart([])
        alert("You have successfully placed an order.")
    }

    const checktranSuccess = async(payment) => {
        const {paymentID, address} = payment;
        try {
            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({cart, paymentID, address})
            });
        
            if (!response.ok) {
                throw new Error('Failed to update payment history');
            }
        
            // Continue with the rest of your logic
            setCart([]);
            addToCart([]);
            alert("You have successfully placed an order.");
        } catch (error) {
            console.error('Error updating payment history:', error.message);
            // Handle error appropriately (e.g., display an error message to the user)
        }
    }

    const handleQuantityChange = (id, value) => {
        const newCart = cart.map(item => {
            if (item._id === id) {
                return { ...item, quantity: value };
            }
            return item;
        });
    
        setCart(newCart);
    };

    const updateCart = async () => {
        try {
            await addArrToCart(cart);
            alert("Cart updated successfully!");
        } catch (error) {
            console.error('Error updating cart:', error);
            alert("Failed to update cart. Please try again later.");
        }
    };

    if(cart.length === 0) 
        return (
        <div class="empty-cart-section section-fluid">
            <div class="emptycart-wrapper">
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-md-10 offset-md-1 col-xl-6 offset-xl-3">
                            <div class="emptycart-content text-center">
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
        <div class="cart-section">
            <div class="cart-table-wrapper">
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
                                                <th class="product_quantity">Số lượng</th>
                                                <th class="product_total">Thành tiền</th>
                                            </tr>
                                        </thead> 
                                        <tbody>
                                        {
                                            cart.map(product => (
                                                <tr key={product._id}>
                                                    <td class="product_remove"><a href="#" onClick={() => removeProduct(product._id)}><i class="fa fa-trash-o"></i></a></td>
                                                    <td class="product_thumb"><a href={`/detail/${product._id}`}><img src={product.image1.url} alt=""/></a></td>
                                                    <td class="product_name"><a href={`/detail/${product._id}`}>{product.title}</a></td>
                                                    <td class="product-price">{product.price}đ</td>
                                                    <td class="product_quantity"><input min="1" max="100" type="number" value={product.quantity} 
                                                    onChange={(e) => handleQuantityChange(product._id, e.target.value)}/></td>
                                                    <td class="product_total">{product.price * product.quantity}đ</td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                <div class="cart_submit">
                                    <button class="btn btn-md btn-golden" type="submit" onClick={updateCart}>Cập nhật</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="coupon_area">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 col-md-6">
                            <div class="coupon_code right">
                                <h3>Tổng cộng</h3>
                                <div class="coupon_inner">
                                    <div class="cart_subtotal">
                                        <p class="cart_amount">{total}đ</p>
                                    </div>
                                        <PaypalButton
                                        total={total}
                                        tranSuccess={tranSuccess} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Cart