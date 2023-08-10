'use client';
import Image from 'next/image'
import PostImage from './postImage';

export default function Post({ post }) {

    const postCreatedAt = new Date(post.createdAt)
    const postTimestamp = postCreatedAt.getTime()
    const timeNow = new Date().getTime()

    const diff = (timeNow - postTimestamp) / 1000;

    let resultTimeString = ''

    if (diff < 60) {
        resultTimeString = 'Только что'
    } else if (diff >= 60 && diff < 3600) {
        resultTimeString = `${Math.round(diff / 60)} мин. назад`
    } else if (diff >= 3600 && diff < 86400) {
        resultTimeString = `${Math.round(diff / 3600)} ч. назад`
    } else if (diff >= 3600 && diff < 259200) {
        let temp = Math.round(diff / 86400)
        resultTimeString = temp === 1 ? `${temp} день назад` : `${temp} дня назад`
    } else {
        let year = postCreatedAt.getFullYear()
        let day = postCreatedAt.getDay()
        if (day > 0 && day < 10) {
            day = `0${day}`
        }
        let hour = postCreatedAt.getHours()
        let minute = postCreatedAt.getMinutes()
        let month = "янв,фев,мар,апр,май,июн,июл,авг,сен,окт,ноя,дек"
        .split(",")[postCreatedAt.getUTCMonth()];

        resultTimeString = `${year}-${month}-${day} ${hour}:${minute}`
    }
    
    console.log(resultTimeString);

    if (post.images.length > 1) {
        return console.log(post.images.length);
    }
    
  return (
    <div className='' >
        <PostImage images={post.images}/>
    </div>
  )
}


  
