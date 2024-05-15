import React, {useState} from 'react'
import {Link} from 'react-router-dom'
// import axios from 'axios'

function Register() {
    const [user, setUser] = useState({
        name:'', email:'', password: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const registerSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch('/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({...user})
            });
    
            if (!response.ok) {
                throw new Error('Response is not OK');
            }
    
            localStorage.setItem('firstLogin', true);
            window.location.href = "/";
        } catch (err) {
            alert(err.message);
        }
    }
    

    return (
        <div class="customer-login">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-6">
                        <div class="account_form register">
                            <h3>Đăng ký</h3>
                            <form onSubmit={registerSubmit}>
                                <div class="default-form-box">
                                    <label>Tên <span>*</span></label>
                                    <input type="text" name="name" required
                                    placeholder="Tên" value={user.name} onChange={onChangeInput} />
                                </div>
                                <div class="default-form-box">
                                    <label>Email <span>*</span></label>
                                    <input type="email" name="email" required
                                    placeholder="Email" value={user.email} onChange={onChangeInput} />
                                </div>
                                <div class="default-form-box">
                                    <label>Mật khẩu <span>*</span></label>
                                    <input type="password" name="password" required autoComplete="on"
                                    placeholder="Mật khẩu" value={user.password} onChange={onChangeInput} />
                                </div>
                                <div class="login_submit">
                                    <button class="btn btn-md btn-black-default-hover mb-4" type="submit">Đăng ký</button>
                                    <a href="/login">Đã có tài khoản? Đăng nhập.</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default Register