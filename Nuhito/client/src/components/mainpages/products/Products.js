import React, { useContext, useState} from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductItemGrid from '../utils/productsItem/ProductsItemGrid'
import ProductItemList from '../utils/productsItem/ProductsItemList'
import Loading from '../utils/loading/Loading'
// import axios from 'axios'
import LoadMore from './LoadMode'
import bkg_grid from '../../../assets/images/icons/bkg_grid.png'
import bkg_list from '../../../assets/images/icons/bkg_list.png'

function Products() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.productsAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search
    const [activeTab, setActiveTab] = useState('layout-list');

    const toggleActiveTab = (tabId) => {
        setActiveTab(tabId);
    };

    const handleCategory = (e, categoryId) => {
        e.preventDefault();
        setCategory(categoryId === "" ? "" : "category=" + categoryId);
        setSearch('');
    };

    const handleCheck = (id) => {
        products.forEach(product => {
            if (product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }

    const deleteProduct = async (id, public_id) => {
        try {
            setLoading(true);
    
            // Assuming public_id is an array of 4 elements
            const destroyImgPromises = public_id.map((pid) =>
                fetch('/api/destroy', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': token },
                    body: JSON.stringify({ public_id: pid })
                })
            );
    
            // Wait for all destroyImg requests to complete
            await Promise.all(destroyImgPromises);
    
            const deleteProductRequest = fetch(`/api/products/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': token }
            });
    
            // Wait for deleteProduct request to complete
            await deleteProductRequest;
    
            setCallback(!callback);
            setLoading(false);
        } catch (err) {
            alert(err.message);
        }
    };


    const checkAll = () => {
        products.forEach(product => {
            product.checked = !isCheck
        })
        setProducts([...products])
        setIsCheck(!isCheck)
    }

    const deleteAll = () => {
        products.forEach(product => {
            if (product.checked) deleteProduct(product._id, product.images.public_id)
        })
    }

    if (loading) return <div><Loading /></div>
    return (
        <div class="shop-section">
            <div class="container">
                <div class="row flex-column-reverse flex-lg-row">
                    <div class="col-lg-3">
                        <div class="siderbar-section">
                            <div class="sidebar-single-widget">
                                <h6 class="sidebar-title">Tìm kiếm sản phẩm</h6>
                                <div class="sidebar-content">
                                    <input type="text" value={search} placeholder="Nhập tên sản phẩm"
                                        onChange={e => setSearch(e.target.value.toLowerCase())} />
                                </div>
                            </div>
                            {
                                isAdmin &&
                                <div class="sidebar-single-widget">
                                    <h6 class="sidebar-title">Xoá sản phẩm</h6>
                                    <div class="sidebar-content delete-all">
                                        <div className='dp-flex'>
                                            <span className='col-lg-10'>Chọn tất cả</span>
                                            <div classname='col-lg-2'>
                                                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                                            </div>
                                        </div>
                                        <button className='btn btn-lg btn-black-default-hover' onClick={deleteAll}>Xoá tất cả</button>
                                    </div>
                                </div>
                            }
                            <div class="sidebar-single-widget" >
                                <h6 class="sidebar-title">Danh mục sản phẩm</h6>
                                <div class="sidebar-content">
                                    <ul class="sidebar-menu">
                                        <li><a href="" onClick={(e) => handleCategory(e, "")}>Tất cả</a></li>
                                        <li>
                                            <ul class="sidebar-menu-collapse">
                                                <li class="sidebar-menu-collapse-list">
                                                    <div class="accordion">
                                                        <a href="#" class="accordion-title" data-bs-toggle="collapse" data-bs-target="#top" aria-expanded="true">Áo</a>
                                                        <div id="top" class="collapse show collapse-pad">
                                                            <ul class="accordion-category-list">
                                                                {
                                                                    categories.filter(category => category.group === "Áo").map(category => (
                                                                        <li key={category._id}><a href="" onClick={(e) => handleCategory(e, category._id)}>{category.name}</a></li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul class="sidebar-menu-collapse">
                                                <li class="sidebar-menu-collapse-list">
                                                    <div class="accordion">
                                                        <a href="#" class="accordion-title" data-bs-toggle="collapse" data-bs-target="#bottom" aria-expanded="true">Quần</a>
                                                        <div id="bottom" class="collapse show collapse-pad">
                                                            <ul class="accordion-category-list">
                                                                {
                                                                    categories.filter(category => category.group === "Quần").map(category => (
                                                                        <li key={category._id}><a href="" onClick={(e) => handleCategory(e, category._id)}>{category.name}</a></li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul class="sidebar-menu-collapse">
                                                <li class="sidebar-menu-collapse-list">
                                                    <div class="accordion">
                                                        <a href="#" class="accordion-title" data-bs-toggle="collapse" data-bs-target="#dress" aria-expanded="true">Váy</a>
                                                        <div id="dress" class="collapse show collapse-pad">
                                                            <ul class="accordion-category-list">
                                                                {
                                                                    categories.filter(category => category.group === "Váy").map(category => (
                                                                        <li key={category._id}><a href="" onClick={(e) => handleCategory(e, category._id)}>{category.name}</a></li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul class="sidebar-menu-collapse">
                                                <li class="sidebar-menu-collapse-list">
                                                    <div class="accordion">
                                                        <a href="#" class="accordion-title" data-bs-toggle="collapse" data-bs-target="#categories" aria-expanded="true">Phụ kiện</a>
                                                        <div id="categories" class="collapse show collapse-pad">
                                                            <ul class="accordion-category-list">
                                                                {
                                                                    categories.filter(category => category.group === "Phụ kiện").map(category => (
                                                                        <li key={category._id}><a href="" onClick={(e) => handleCategory(e, category._id)}>{category.name}</a></li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-9">
                        <div class="shop-sort-section">
                            <div class="container">
                                <div class="row">
                                    <div class="sort-box d-flex justify-content-between align-items-md-center align-items-start flex-md-row flex-column">
                                        <div class="sort-tablist d-flex align-items-center">
                                            <ul class="tablist nav sort-tab-btn">
                                                <li><a className={`nav-link ${activeTab === 'layout-3-grid' ? 'active' : ''}`} data-bs-toggle="tab" href="#"
                                                onClick={() => toggleActiveTab('layout-3-grid')}><img src={bkg_grid} alt="" /></a></li>
                                                <li><a className={`nav-link ${activeTab === 'layout-list' ? 'active' : ''}`} data-bs-toggle="tab" href="#"
                                                onClick={() => toggleActiveTab('layout-list')}><img src={bkg_list} alt="" /></a></li>
                                            </ul>

                                            <div class="page-amount ml-2">
                                                <span id="products-count"></span>
                                            </div>
                                        </div>

                                        <div class="sort-select-list d-flex align-items-center">
                                            <label class="mr-2">Sắp xếp:</label>
                                            <form action="#">
                                                <fieldset>
                                                    <select value={sort} onChange={e => setSort(e.target.value)} >
                                                        <option value=''>Mới nhất</option>
                                                        <option value='sort=oldest'>Cũ nhất</option>
                                                        <option value='sort=-sold'>Bán chạy nhất</option>
                                                        <option value='sort=-price'>Giá từ cao đến thấp</option>
                                                        <option value='sort=price'>Giá từ thấp đến cao</option>
                                                    </select>
                                                </fieldset>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="sort-product-tab-wrapper">
                            <div class="container">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="tab-content tab-animate-zoom">
                                            <div class={`tab-pane sort-layout-single ${activeTab === 'layout-3-grid' ? 'active' : ''}`} id="layout-3-grid">
                                                <div class="row" id="products-list-grid">
                                                    {
                                                        products.map(product => {
                                                            return (
                                                                <div className='col-xl-4 col-sm-6 col-12'>
                                                                    <ProductItemGrid key={product._id} product={product}
                                                                        isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} /> 
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className={`tab-pane show sort-layout-single ${activeTab === 'layout-list' ? 'active' : ''}`} id="layout-list">
                                                <div class="row" id="products-list">
                                                    {
                                                        products.map(product => {
                                                            return <ProductItemList key={product._id} product={product}
                                                                isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} />
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <LoadMore />
                        {products.length === 0 && <Loading />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products