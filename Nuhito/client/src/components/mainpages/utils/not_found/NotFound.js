import React from 'react';

function NotFound() {
    return (
        <div class="error-section">
            <div class="container">
                <div class="row">
                    <div class="error-form">
                        <h1 class="big-title">404</h1>
                        <h4 class="sub-title">Opps! KHÔNG TÌM THẤY TRANG</h4>
                        <p data-aos>Trang mà bạn đang tìm không tồn tại, đã bị xoá,<br/>bị đổi tên hoặc tạm thời không có sẵn.</p>
                        <div class="row">
                            <div class="col-10 offset-1 col-md-4 offset-md-4">
                                <a href="/" class="btn btn-md btn-black-default-hover mt-7">Quay về trang chủ</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    );
}

export default NotFound;
