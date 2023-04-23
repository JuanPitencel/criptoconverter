import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import  '../styles/News.css'

function News() {
  const [notice, setNotice] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://min-api.cryptocompare.com/data/v2/news/?lang=ES', {
          params: {
            access_key: 'e40143914e5afa6408c38d8bfe211b2f97129f63799a6536de6fd5e3c6e79c69',
          }
        });
        const arrayNews = response.data.Data.map(notice => {
          const objeto = {
            title: notice.title,
            nombre: notice.body,
            url: notice.url,
            id: notice.id
          }
          return objeto
        });
        setNotice(arrayNews.slice(0, 10));
      } catch (error) {
        console.log(error);
      }
    }; 
    fetchData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 12000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 40,
    cssEase: "ease-in-out"
  };

  return (
    <div className="news-container">
      <Slider {...settings}>
        {notice.map((notice) => (
          <div className="news-item" key={notice.id} onClick={() => window.open(notice.url)}>
              <h3><a href={notice.url} target="_blank" rel="noopener noreferrer">{notice.title}</a></h3>
            
          </div>
        ))}
      </Slider>
    </div>
  );
}
export default News
