import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './slideHome.css';
import pic from "../../images/rumika.jpg";

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

export default function SlideHome() {
  return (
    <div className='SlideHome'>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><p>Slide 1</p><img src={ pic } alt="picture"></img></SwiperSlide>
        <SwiperSlide><p>Slide 2</p></SwiperSlide>
        <SwiperSlide><p>Slide 3</p></SwiperSlide>
        <SwiperSlide><p>Slide 4</p></SwiperSlide>
        <SwiperSlide><p>Slide 5</p></SwiperSlide>
        <SwiperSlide><p>Slide 6</p></SwiperSlide>
        <SwiperSlide><p>Slide 7</p></SwiperSlide>
        <SwiperSlide><p>Slide 8</p></SwiperSlide>
        <SwiperSlide><p>Slide 9</p></SwiperSlide>
      </Swiper>
    </div>
  );
}
