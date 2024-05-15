import React, { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../GlobalState'
import Logo from '../../assets/images/logo/logo_black.png'
import Products_banner from '../../assets/images/banner/menu-banner.png'
import { Link } from 'react-router-dom'
import axios from 'axios'


function Header() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [wishlist] = state.userAPI.wishlist
    const [menu, setMenu] = useState(false)

    const logoutUser = async () => {
        await axios.get('/user/logout') ////////////////////////////////////////

        localStorage.removeItem('firstLogin')

        window.location.href = "/";
    }

    const adminRouter = () => {
        return (
            <>
                <li><a href="/create_product">Thêm sản phẩm</a></li>
                <li><a href="/category">Chỉnh sửa danh mục</a></li>
            </>
        )
    }

    const loggedRouter = () => {
        return (
            <> 
                <li><Link to="/history">Lịch sử</Link></li>
                <li><Link to="/" onClick={logoutUser}>Đăng xuất</Link></li>
            </>
        )
    }

    const handleOpenMenuClick = () => {
        document.getElementById('mobile-menu-offcanvas').classList.add('offcanvas-open');
    };

    const handleCloseMenuClick = () => {
        document.getElementById('mobile-menu-offcanvas').classList.remove('offcanvas-open');
    };

    const [isStickyHeader, setStickyHeader] = useState(false);
    const [isScrollTop, setScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scroll = window.scrollY || document.documentElement.scrollTop;

            if (scroll < 100) {
                setStickyHeader(false);
                setScrollTop(false);
            } else {
                setStickyHeader(true);
                setScrollTop(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [category, setCategory] = state.productsAPI.category
    const [search, setSearch] = state.productsAPI.search
    
    const handleCategory = (e, categoryId) => {
        // e.preventDefault();
        setCategory(categoryId === "" ? "" : "category=" + categoryId);
        setSearch('');
    };

    return (
        <>
            <header class="header-section d-none d-xl-block">
                <div class="header-wrapper">
                    <div class={`header-bottom header-bottom-color--golden section-fluid sticky-header sticky-color--golden ${isStickyHeader ? 'sticky' : ''}`}>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-12 d-flex align-items-center justify-content-between">
                                    <div class="header-logo">
                                        <div class="logo">
                                            <a href="/"><img src={Logo} alt="Nuhito logo" /></a>
                                        </div>
                                    </div>

                                    <div class="main-menu menu-color--black menu-hover-color--golden">
                                        <nav>
                                            <ul>
                                                <li>
                                                    <a class="active main-menu-link" href="/">Trang chủ</a>
                                                </li>
                                                <li>
                                                    <a href="/aboutus">Giới thiệu</a>
                                                </li>
                                                <li>
                                                    <a href="/policy">Chính sách</a>
                                                </li>
                                                <li class="has-dropdown has-megaitem">
                                                    <a href="/products">Sản phẩm</a>
                                                    <div class="mega-menu">
                                                        <ul class="mega-menu-inner">
                                                            <li class="mega-menu-item">
                                                                <a href="#" class="mega-menu-item-title">Áo</a>
                                                                <ul class="mega-menu-sub">
                                                                {
                                                                    categories.filter(category => category.group === "Áo").map(category => (
                                                                        <li key={category._id}><a href="/products" onClick={(e) => handleCategory(e, category._id)}>{category.name}</a></li>
                                                                    ))
                                                                }
                                                                </ul>
                                                            </li>
                                                            <li class="mega-menu-item">
                                                                <a href="#" class="mega-menu-item-title">Quần</a>
                                                                <ul class="mega-menu-sub">
                                                                {
                                                                    categories.filter(category => category.group === "Quần").map(category => (
                                                                        <li key={category._id}><a href="/products" onClick={(e) => handleCategory(e, category._id)}>{category.name}</a></li>
                                                                    ))
                                                                }
                                                                </ul>
                                                            </li>
                                                            <li class="mega-menu-item">
                                                                <a href="#" class="mega-menu-item-title">Váy</a>
                                                                <ul class="mega-menu-sub">
                                                                {
                                                                    categories.filter(category => category.group === "Váy").map(category => (
                                                                        <li key={category._id}><a href="/products" onClick={(e) => handleCategory(e, category._id)}>{category.name}</a></li>
                                                                    ))
                                                                }
                                                                </ul>
                                                            </li>
                                                            <li class="mega-menu-item">
                                                                <a href="#" class="mega-menu-item-title">Phụ kiện</a>
                                                                <ul class="mega-menu-sub">
                                                                {
                                                                    categories.filter(category => category.group === "Phụ kiện").map(category => (
                                                                        <li key={category._id}><a href="/products" onClick={(e) => handleCategory(e, category._id)}>{category.name}</a></li>
                                                                    ))
                                                                }
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                        <div class="menu-banner">
                                                            <a href="#" class="menu-banner-link">
                                                                <img class="menu-banner-img" src={Products_banner} alt="" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <a href="#">Tài khoản</a>
                                                    <ul class="sub-menu">
                                                        {isAdmin && adminRouter()}
                                                        {
                                                            isLogged ? loggedRouter() : 
                                                            <>
                                                                <li><a href="/login">Đăng nhập</a></li>
                                                                <li><a href="/register">Đăng ký</a></li>
                                                            </>
                                                        }
                                                    </ul>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>

                                    <ul class="header-action-link action-color--black action-hover-color--golden">
                                        {
                                            ((!isLogged) || isAdmin) ? '' : 
                                                <>
                                                    <li>
                                                        <a href="/wishlist" class="offcanvas-toggle">
                                                            <i class="icon-heart"></i>
                                                            <span class="item-count">{wishlist.length}</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/cart" class="offcanvas-toggle">
                                                            <i class="icon-bag"></i>
                                                            <span class="item-count">{cart.length}</span>
                                                        </a>
                                                    </li>
                                                </>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div class="mobile-header mobile-header-bg-color--golden section-fluid d-lg-block d-xl-none">
                <div class="container">
                    <div class="row">
                        <div class="col-12 d-flex align-items-center justify-content-between">
                            <div class="mobile-header-left">
                                <ul class="mobile-menu-logo">
                                    <li>
                                        <a href="/">
                                            <div class="logo">
                                                <img src={Logo} alt="Nuhito logo"/>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="mobile-right-side">
                                <ul class="header-action-link action-color--black action-hover-color--golden">
                                    {
                                        ((!isLogged) || isAdmin) ? '' : 
                                            <>
                                                <li>
                                                    <a href="/wishlist" class="offcanvas-toggle">
                                                        <i class="icon-heart"></i>
                                                        <span class="item-count">{wishlist.length}</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="/cart" class="offcanvas-toggle">
                                                        <i class="icon-bag"></i>
                                                        <span class="item-count">{cart.length}</span>
                                                    </a>
                                                </li>
                                            </>
                                    }
                                    <li>
                                        <a href="#" class="offcanvas-toggle offside-menu" onClick={handleOpenMenuClick}>
                                            <i class="icon-menu"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="mobile-menu-offcanvas" class="offcanvas offcanvas-rightside offcanvas-mobile-menu-section">
                <div class="offcanvas-header text-right">
                    <button class="offcanvas-close" onClick={handleCloseMenuClick}><i class="ion-android-close"></i></button>
                </div> 
                <div class="offcanvas-mobile-menu-wrapper">
                    <div class="mobile-menu-bottom">
                        <div class="offcanvas-menu">
                            <ul>
                                <li>
                                    <a href="/"><span>Trang chủ</span></a>
                                </li>
                                <li>
                                    <a href="/aboutus"><span>Giới thiệu</span></a>
                                </li>
                                <li>
                                    <a href="/policy"><span>Chính sách</span></a>
                                </li>
                                <li>
                                    <a href="/products"><span>Sản phẩm</span></a>
                                    <ul class="mobile-sub-menu">
                                        <li>
                                            <a href="/products"><span>Áo</span></a>
                                        </li>
                                        <li>
                                            <a href="/products"><span>Quần</span></a>
                                        </li>
                                        <li>
                                            <a href="/products"><span>Váy</span></a>
                                        </li>
                                        <li>
                                            <a href="/products"><span>Phụ kiện</span></a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#"><span>Tài khoản</span></a>
                                    <ul class="mobile-sub-menu">
                                        {isAdmin && adminRouter()}
                                        {
                                            isLogged ? loggedRouter() : 
                                            <>
                                                <li><a href="/login">  Đăng nhập</a></li>
                                                <li><a href="/register">  Đăng ký</a></li>
                                            </>
                                        }
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div> 
                </div> 
            </div> 
            <button class={`material-scrolltop ${isScrollTop ? 'reveal' : ''}`} type="button"></button>
        </>
    );
}

export default Header;
