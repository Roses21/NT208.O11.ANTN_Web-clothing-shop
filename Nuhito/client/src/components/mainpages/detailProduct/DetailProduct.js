import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import ProductItemGrid from '../utils/productsItem/ProductsItemGrid'

function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    const addWishlist = state.userAPI.addWishlist
    const [page, setPage] = state.productsAPI.page
    const [detailProduct, setDetailProduct] = useState([])
    
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.productsAPI.callback
    const [loading, setLoading] = useState(false)
    const [quantity, setQuantity] = useState(1);

    const deleteProduct = async (id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = fetch('/api/destroy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': token },
                body: JSON.stringify({ public_id })
            })
            const deleteProduct = fetch(`/api/products/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': token }
            })

            await destroyImg
            await deleteProduct
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.message)
        }
    }

    useEffect(() =>{
        setPage(5);
        if(params.id){

            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    },[params.id, products])

    if(detailProduct.length === 0) return null;

    return (
        <>
        <div class="product-details-section">
            <div class="container">
                <div class="row" id="product-details-container-area">
                    <div class="col-xl-5 col-lg-6">
                        <div class="product-details-gallery-area product-details-gallery-area-vartical product-details-gallery-area-vartical-left">
                            <div class="product-large-image product-large-image-vartical swiper-container ml-5">
                                <div class="swiper-wrapper">
                                    <div class="product-image-large-image swiper-slide zoom-image-hover img-responsive">
                                        <img src={detailProduct.image1.url} alt=""/>
                                    </div>
                                    <div class="product-image-large-image swiper-slide zoom-image-hover img-responsive">
                                        <img src={detailProduct.image2.url} alt=""/>
                                    </div>
                                    <div class="product-image-large-image swiper-slide zoom-image-hover img-responsive">
                                        <img src={detailProduct.image3.url} alt=""/>
                                    </div>
                                    <div class="product-image-large-image swiper-slide zoom-image-hover img-responsive">
                                        <img src={detailProduct.image4.url} alt=""/>
                                    </div>
                                    <div class="product-image-large-image swiper-slide zoom-image-hover img-responsive">
                                        <img src={detailProduct.image1.url} alt=""/>
                                    </div>
                                    <div class="product-image-large-image swiper-slide zoom-image-hover img-responsive">
                                        <img src={detailProduct.image2.url} alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div class="product-image-thumb product-image-thumb-vartical swiper-container pos-relative swiper-container-initialized swiper-container-vertical swiper-container-free-mode swiper-container-thumbs">
                                <div class="swiper-wrapper" aria-live="polite">
                                    <div class="product-image-thumb-single swiper-slide swiper-slide-visible swiper-slide-active swiper-slide-thumb-active"
                                    role="group" aria-label="1 / 4">
                                        <img class="img-fluid" src={detailProduct.image1.url} alt=""/>
                                    </div>
                                    <div class="product-image-thumb-single swiper-slide swiper-slide-visible swiper-slide-next"
                                    role="group" aria-label="2 / 4">
                                        <img class="img-fluid" src={detailProduct.image2.url} alt=""/>
                                    </div>
                                    <div class="product-image-thumb-single swiper-slide swiper-slide-visible"
                                    role="group" aria-label="3 / 4">
                                        <img class="img-fluid" src={detailProduct.image3.url} alt=""/>
                                    </div>
                                    <div class="product-image-thumb-single swiper-slide swiper-slide-visible"
                                    role="group" aria-label="4 / 4">
                                        <img class="img-fluid" src={detailProduct.image4.url} alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-7 col-lg-6">
                        <div class="product-details-content-area product-details--golden">
                            <div class="product-details-text">
                                <h4 class="title">{detailProduct.title}</h4>
                                <div class="price">{detailProduct.price}đ</div>
                                <p>{detailProduct.description}</p>
                                    <p>Đã bán: {detailProduct.sold}</p>
                                </div>
                                
                                {
                                    isAdmin ?
                                        <>
                                            <a href="#" class="btn btn-lg btn-black-default-hover" style={{marginRight:'20px'}}
                                            onClick={() => deleteProduct(detailProduct._id, [detailProduct.image1.public_id, detailProduct.image2.public_id, detailProduct.image3.public_id, detailProduct.image4.public_id])}>Xoá</a>
                                            <a href={`/edit_product/${detailProduct._id}`} class="btn btn-lg btn-black-default-hover">Sửa</a>
                                        </>
                                        : <>
                                            <div class="product-details-variable">
                                                <div class="d-flex align-items-center ">
                                                    <div class="variable-single-item ">
                                                        <span>Số lượng</span>
                                                        <div class="product-variable-quantity">
                                                            <input type="number" min="1" max="100" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                                                        </div>
                                                    </div>

                                                    <div class="product-add-to-cart-btn">
                                                        <a href="#" onClick={() => addCart(detailProduct, parseInt(quantity, 10))}>+ Thêm vào giỏ hàng</a>
                                                    </div>
                                                </div>
                                                <div class="product-details-meta mb-20">
                                                    <a href="#" class="icon-space-right" onClick={() => addWishlist(detailProduct)}><i class="icon-heart"></i>Yêu thích</a>
                                                </div>
                                            </div>
                                        </>
                                }
                                <div class="product-details-catagory mb-2">
                                    <ul>
                                    <li id="product-details-style">Kiểu dáng: {detailProduct.style}</li>
                                    <li id="product-details-color">Màu sắc: {detailProduct.color}</li>
                                    <li id="product-details-material">Chất liệu: {detailProduct.material}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="product-default-slider-section section-top-gap-100 section-fluid product-relative">
            <div class="section-title-wrapper">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="section-content-gap">
                                <div class="secton-content">
                                    <h3  class="section-title">SẢN PHẨM LIÊN QUAN</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="product-wrapper">
                <div class="container">
                        <div class="row">
                            {
                                products.map(product => {
                                    return (product.category === detailProduct.category
                                        ? <div class='col-xl-3 col-sm-3 col-3' style={{padding: '10px'}}> <ProductItemGrid key={product._id} product={product} /> </div> : null
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
            </div> 
        </>
    )
}

export default DetailProduct