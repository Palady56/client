'use client'
import { useState, useRef, useCallback } from 'react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

const MAX_COUNT = 10;

export default function Create() {

    const galleryRef = useRef(null)

    const [drag, setDrag] = useState(false)
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [description, setDescription] = useState('')
    const [fileLimit, setFileLimit] = useState(false);

    const handlerCreate = () => {

        console.log('Press Create');
    }

    const handleDescription = (e) => {
        setDescription(e.target.value.slice(0, 255));
    }

    const dragStartHandler = (e) => {
        e.preventDefault()
        setDrag(true)
    }

    const dragLeaveHandler = (e) => {
        e.preventDefault()
        setDrag(false)
    }

    const onDropHandler = (e) => {
        e.preventDefault()
        let files = [...e.dataTransfer.files]
        setUploadedFiles(files)
        setDrag(false)
    }

    const PreviewImage = useCallback(() => {
        const removeItemGallery = (index) => {
            let temp = uploadedFiles.filter((item, idx) => idx !== index)
            if (temp.length < 10) setFileLimit(false)
            setUploadedFiles(temp)
        }
        return uploadedFiles.length > 0 ?
            uploadedFiles.map((file, index) =>
                <div key={index} className='relative'>
                    <img src={URL.createObjectURL(file)} className='h-16 w-16 object-cover object-center rounded-md' />
                    <button
                        type='button'
                        className='absolute -top-4 -right-4 p-2'
                        onClick={() => removeItemGallery(index)}
                    >
                        <XMarkIcon className='w-5 h-5 text-red-500 hover:text-red-600' />
                    </button>
                </div>)
            : ''
    }, [uploadedFiles])

    const handleAddFiles = (event) => {
        let temp = [...uploadedFiles.concat(Object.values(event.target.files))]

        if (temp.length > 10) {
            temp = temp.slice(0, 10)
        }
        if (temp.length > 9) setFileLimit(true)

        setUploadedFiles(temp)
    }

    console.log(drag);

    return (
        <div className='grid grid-cols-1 w-full p-4 gap-4 md:max-w-4xl mx-auto'>
            <form className='grid mt-4 gap-4'>
                <div className='grid md:flex gap-6'>
                    <button className='flex gap-4 items-center justify-center rounded-md text-white p-4 border \
                            border-slate-400 dark:border-slate-600 \
                            bg-gradient-to-r from-amber-500 dark:from-purple-600 from-0% via-orange-600 \
                            dark:via-cyan-600 via-30% via-pink-500 dark:via-blue-500 via-60% to-fuchsia-700 \
                            dark:to-violet-700 to-100% disabled:grayscale disabled:opacity-50'
                        onClick={() => galleryRef.current.click()}
                        type="button"
                        disabled={fileLimit}
                    >
                        <PhotoIcon className='h-6 w-6 text-white' />
                        <span>Загрузить фото</span>
                    </button>
                    <div className='min-h-[100px] w-full flex flex-wrap gap-4 items-center justify-center bg-slate-300 \
                                    rounded-md dark:bg-slate-700 text-black dark:text-white p-4 border-2 border-dashed \
                                    border-slate-400 dark:border-slate-600'
                    >
                        {
                            drag
                                ? <div
                                    className='flex items-center justify-center min-h-[100px] w-full'
                                    onDragStart={e => dragStartHandler(e)}
                                    onDragLeave={e => dragLeaveHandler(e)}
                                    onDragOver={e => dragStartHandler(e)}
                                    onDrop={e => onDropHandler(e)}
                                >
                                    Отпустите файлы для загрузки</div>
                                : <div
                                    className='flex items-center justify-center min-h-[100px] w-full'
                                    onDragStart={e => dragStartHandler(e)}
                                    onDragLeave={e => dragLeaveHandler(e)}
                                    onDragOver={e => dragStartHandler(e)}
                                >
                                    Выберите или перетащите файлы для загрузки</div>
                        }

                        <PreviewImage />
                    </div>
                </div>

                <input
                    ref={galleryRef}
                    type='file'
                    multiple
                    accept='image/jpg, image/png, image/jpeg, image/gif'
                    onChange={handleAddFiles}
                    name="gallery"
                    hidden
                />
                <div className='w-full relative '>
                    <textarea className='bg-slate-300 w-full dark:bg-slate-700 text-black dark:text-white \
                                         py-2 px-4 pr-20 rounded-md'
                        value={description}
                        onChange={handleDescription}
                        placeholder="Введите описание (максимальное количество символов 255)"
                        rows={5}
                    />
                    <span className='absolute right-2 text-xs top-2 z-10 p-2 rounded-md bg-slate-200 \
                                     dark:bg-slate-800 text-black dark:text-white'>
                        {description.length}/255
                    </span>
                </div>

            </form>
            <button
                className='scale-100 mt-4 w-full hover:scale-105 hover:drop-shadow-xl ease-in-out duration-300 \
                            py-3 px-4 rounded-md bg-gradient-to-r from-amber-500 dark:from-purple-600 from-0% via-orange-600 \
                            dark:via-cyan-600 via-30% via-pink-500 dark:via-blue-500 via-60% to-fuchsia-700 \
                            dark:to-violet-700 to-100% text-white text-lg'
                onClick={handlerCreate}
            >
                Создать
            </button>
        </div>
    )
}