'use client';
import Image from 'next/image'
import PostImage from './postImage'

export default function Post({ post }) {

    let des = post.description !== "null" ? post.description : "Описание отсутствует..."

    if (des.length > 100) {
        des = des.slice(0, 97) + "..."
    }
    des = des.slice(0, 100)
    


    return (
        <div className='shadow-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md p-4'>

            <PostImage images={post.images} />

            <div className='flex items-center justify-between mt-4'>
                <div className='flex items-center gap-2'>
                    <Image src={post.user.avatar} className='w-11 h-11 rounded-full object-center object-cover bg-slate-400 dark:bg-slate-700' unoptimized width={44} height={44} alt='Post'/>
                    <span className='text-xs text-slate-900 dark:text-slate-200'>{post.user.firstName} {post.user.lastName}</span>
                </div>
                <span className='text-xs text-slate-900 dark:text-slate-200'>{getTimeString(post.createdAt)}</span>
            </div>
            <div className='flex flex-wrap overflow-hidden items-center mt-4 dark:text-slate-200'>
                {des}
            </div>
        </div>
    );
}


function getTimeString(createdAt) {
    const postCreatedAt = new Date(createdAt);
    const postTimestamp = postCreatedAt.getTime();
    const timeNow = new Date().getTime();

    const diff = (timeNow - postTimestamp) / 1000; // в сек.

    let resultTimeString = 'неизвестно';

    if (diff < 60) {
        resultTimeString = 'Только что'
    } else if (diff >= 60 && diff < 3600) {
        resultTimeString = `${Math.round(diff / 60)} мин. назад`
    } else if (diff >= 3600 && diff < 86400) {
        resultTimeString = `${Math.round(diff / 3600)} ч. назад`
    } else if (diff >= 86400 && diff < 259200) {
        let temp = Math.round(diff / 86400);
        resultTimeString = temp === 1 ? `${temp} день назад` : `${temp} дня назад`;
    } else {
        let months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        resultTimeString = `${postCreatedAt.getDate()} ${months[postCreatedAt.getMonth()]} ${postCreatedAt.getFullYear()} ${postCreatedAt.getHours()}:${postCreatedAt.getMinutes()}`;
    }

    return resultTimeString;
}