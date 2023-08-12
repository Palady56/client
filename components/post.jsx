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

    if (post.images.length > 1) {

    }

    const imageStyle = {
        borderRadius: '50%',
        border: '1px solid #7c3aed',
        objectPostition: 'center',
        objectFit: 'cover'
    }

    const imageLoader = ({ src, width, quality }) => {
        return `${src}`
    }
    
  return (
    <div className='w-full h-full' >
        <div className='h-4/5 overflow-hidden'>
            <PostImage images={post.images}/>
        </div>
        
        <div className='flex items-center justify-between p-2 border-b dark:border-indigo-500 border-slate-100 dark:border-opacity-50'>
            <div className='flex items-center gap-2 '>
                <Image className='' src={post.user.avatar} loader={imageLoader} style={imageStyle} width={42} height={42} alt='Avatar'></Image>
                <span className=''>{post.user.firstName}</span>
                <hr className='dark:bg-indigo-500 bg-slate-100'/>
            </div>
            
            <span className='text-sm'>{resultTimeString}</span>
        </div>
    </div>
  )
}


  
