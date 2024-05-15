import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import About from '../../../assets/images/about/img-about.jpg'
import Leader1 from '../../../assets/images/team/leader1.png'
import Leader2 from '../../../assets/images/team/leader2.png'
import Leader3 from '../../../assets/images/team/leader3.png'

function AboutUs() {
    return (
        <>
           <div class="about-top">
                <div class="container">
                    <div class="row d-flex align-items-center justify-content-between d-sm-column">
                        <div class="col-md-6">
                            <div class="about-img">
                                <div class="img-responsive">
                                    <img src={About} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="content">
                                <h3 class="title">GIỚI THIỆU VỀ NUHITO</h3>
                                <h5 class="semi-title">NUHITO - Nơi khám phá phong cách độc đáo của bạn. </h5>
                                <p>Đồng hành và thấu hiểu những băn khoăn trong hành trình định hình vẻ đẹp và xây dựng phong cách riêng của chị em phụ nữ, NUHITO cho ra đời những sản phẩm mang tính tiện lợi cao, tối ưu được hầu hết các khuyết điểm trên cơ thể, để các chị cảm thấy tự tin, thoải mái nhất khi khoác lên người. Bởi với NUHITO, mỗi sản phẩm là tình yêu thương, là năng lượng hạnh phúc mà NUHITO muốn trao gửi đến từng phụ nữ Việt trên mọi miền tổ quốc. NUHITO tin rằng, hành trình này sẽ luôn được mọi người quan tâm, chia sẻ vì đây là hành trình từ trái tim và sẽ chạm đến trái tim, nhất là những tâm hồn đang lạc lối cần chỉ dẫn để quay về bên trong.</p>
                            </div>
                        </div>
                    </div>
                </div>         
            </div>
            <div class="progressbar-section section-top-gap-100">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <div class="content">
                                <h4 class="title">ĐỊNH HÌNH PHONG CÁCH MỚI</h4>
                                <p>Mỗi ngày tại NUHITO, chúng tôi đều hy vọng hôm nay sẽ làm được 2 điều: gửi trao những sản phẩm thời trang chất lượng và lan tỏa hạnh phúc đến mọi người. Đó là mong muốn khi NUHITO lần đầu ra mắt vào năm 2015. Và suốt 8 năm qua, nhờ có chị em mà mỗi ngày đều là một ngày hạnh phúc. Đó là 8 năm chúng tôi được gặp gỡ, lắng nghe và kết nối với những tâm hồn đồng điệu. 8 năm học được cách quan tâm từ những điều nhỏ nhất, để trân trọng những giá trị và vẻ đẹp nhiệm màu của từng con người. 8 năm chứng kiến những nỗ lực sáng tạo không ngừng, những quyết định dám nghĩ dám làm, để dấn thân trên con đường làm đẹp và mang đến cho phụ nữ phong cách thời thượng, cùng những trải nghiệm tốt hơn mỗi ngày. Với NUHITO 8 năm không phải là đích đến, mà là một hành trình. Và dù 8 hay 20 năm nữa, hành trình này sẽ luôn là hành trình hạnh phúc khi vẫn còn mọi người ở bên, những người đồng hành và truyền cảm hứng cho chúng tôi trên con đường sứ mệnh của THỜI TRANG HẠNH PHÚC, lan tỏa năng lượng tích cực và phụng sự cộng đồng.</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="custom-progress m-t-40">
                                <div class="skill-progressbar">
                                    <h6 class="font--semi-bold m-b-15">Trẻ trung</h6>
                                    <div class="line-progressbar" data-percentage="90" data-progress-color="#b19361">
                                        <div class="progressbar" style={{width: '90%'}}>
                                            <div class="proggress"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="skill-progressbar">
                                    <h6 class="font--semi-bold m-b-15">Năng động</h6>
                                    <div class="line-progressbar" data-percentage="86" data-progress-color="#b19361">
                                        <div class="progressbar" style={{width: '86%'}}>
                                            <div class="proggress"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="skill-progressbar">
                                    <h6 class="font--semi-bold m-b-15">Thời thượng</h6>
                                    <div class="line-progressbar" data-percentage="97" data-progress-color="#b19361">
                                        <div class="progressbar" style={{width: '97%'}}>
                                            <div class="proggress"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="team-section section-top-gap-100 secton-fluid section-inner-bg">
                <div class="section-title-wrapper">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <div class="section-content-gap">
                                    <div class="secton-content text-center">
                                        <h3  class="section-title">Meet Our Team</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="team-wrapper">
                    <div class="container">
                        <div class="row mb-n6">
                            <div class="col-xl-4 mb-5">
                                <div class="team-single">
                                    <div class="team-img">
                                        <img class="img-fluid" src={Leader1} alt=""/>
                                    </div>
                                    <div class="team-content">
                                        <h6 class="team-name font--bold mt-5">Thu Hiền</h6>
                                        <span class="team-title">CTO</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-xl-4 mb-5">
                                <div class="team-single">
                                    <div class="team-img">
                                        <img class="img-fluid" src={Leader2} alt=""/>
                                    </div>
                                    <div class="team-content">
                                        <h6 class="team-name font--bold mt-5">Nhung Nguyễn</h6>
                                        <span class="team-title">CEO Founder</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-xl-4 mb-5">
                                <div class="team-single">
                                    <div class="team-img">
                                        <img class="img-fluid" src={Leader3} alt=""/>
                                    </div>
                                    <div class="team-content">
                                        <h6 class="team-name font--bold mt-5">Ngọc Thơ</h6>
                                        <span class="team-title">Chief Officer</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUs