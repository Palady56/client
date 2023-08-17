'use client'
import { useState, useRef } from 'react';
<<<<<<< HEAD
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'
=======
>>>>>>> 2d3bc91eb421dd2f58d449fddb3b86d245de4d3b

const MAX_COUNT = 10;

export default function Create() {

    const [uploadedFiles, setUploadedFiles] = useState([])
    const [description, setDescription] = useState('')
    const [fileLimit, setFileLimit] = useState(false) 
    const filePicker = useRef(null)

    const handlePick = () => {
        filePicker.current.click();
    }

    const filePicker = useRef(null)

    const handlePick = () => {
        filePicker.current.click();
    }

    // const handleUploadFiles = files => {
    //     const uploaded = [...uploadedFiles];
    //     let limitExceeded = false;
    //     files.some((file) => {
    //         if (uploaded.findIndex((f) => f.name === file.name) === -1) {
    //             uploaded.push(file);
    //             if (uploaded.length >= MAX_COUNT) setFileLimit(true);
    //             if (uploaded.length > MAX_COUNT) {
    //                 setUploadedFiles([])
    //                 alert(`You can only add a maximum of ${MAX_COUNT} files`);
    //                 setFileLimit(false)
    //                 limitExceeded = true;
    //                 return limitExceeded;
    //             }
    //         }
    //     })

    //     if (!limitExceeded) setUploadedFiles(uploaded)

    //     return limitExceeded
    // }

    const handleDescription = (e) => {
        setDescription(e.target.value.slice(0, 255))
<<<<<<< HEAD
=======

>>>>>>> 2d3bc91eb421dd2f58d449fddb3b86d245de4d3b
    }

    // const handleFileEvent = (e) => {
    //     const chosenFiles = Array.prototype.slice.call(e.target.files)
    //     let res = handleUploadFiles(chosenFiles);
    //     if (res) {
    //         e.target.value = []
    //     }
    // }

    const handlerCreate = () => {

        console.log('Press Create');
    }

    const handleAddFiles = (e) => {
        let temp = [...uploadedFiles.concat(Object.values(e.target.files))]

        if (temp.length > MAX_COUNT) {
            alert('Превышен лимит файлов. Максимум - 10')
            temp = temp.slice(0, 10)
        }

        if (temp.length > 9) {
            setFileLimit(true)
        }
        setUploadedFiles(temp)
    }

    const removeItemGallery = (index) => {
        let temp = uploadedFiles.filter( (item, idx) => { return idx !== index } )
        if (temp.length < MAX_COUNT) {
            setFileLimit(false)
        }
        setUploadedFiles(temp)
    }

    const PreviewImage = () => {
        return uploadedFiles.length > 0 ? (
            uploadedFiles.map((file, index) => 
                    <div key={index} className='relative'>
                        <img src={URL.createObjectURL(file)} className='rounded-md w-16 h-16 object-cover object-center' />
                        <button 
                        type='button' 
                        className='absolute -right-3 -top-3 rounded-md'
                        onClick={ () => removeItemGallery(index)}
                        >
                            <XMarkIcon className='h-6 w-6 text-red-500 hover:text-red-600'/>
                        </button>
                    </div>
            )
        ) : (
            <span>Добавьте фото</span>
        )
    }

    return (
        <div className='grid grid-cols-1 w-full p-4 gap-4'>
            <form className='grid mt-4 gap-4'>
<<<<<<< HEAD
                <div className='grid md:flex gap-6'>
                    <button
                        className='flex items-center justify-center gap-4 bg-gradient-to-r \
                                    from-amber-500 dark:from-purple-600 from-0% via-orange-600 dark:via-cyan-600 \
                                    via-30% via-pink-500 dark:via-blue-500 via-60% to-fuchsia-700 dark:to-violet-700 \
                                    to-100% text-white text-md py-2 px-4 rounded-md disabled:grayscale disabled:opacity-50'
                        onClick={handlePick}
                        type='button'
                        disabled={fileLimit}
                    >
                        <PhotoIcon className='h-8 w-8 text-white' />
                        <span>Выберите файл</span>
                    </button>
                    <div className='min-h-[100px] w-full flex flex-wrap gap-4 items-center justify-center \
                                    bg-slate-300 dark:bg-slate-700 text-black dark:text-white p-4 rounded-md border-2 \
                                    border-dashed border-slate-600 dark:border-slate-400'>
                        <PreviewImage />
                    </div>
                </div>


                <input
                    type='file'
                    onChange={handleAddFiles}
                    ref={filePicker}
                    hidden='hidden'
=======
                <button
                    className='bg-gradient-to-r from-amber-500 dark:from-purple-600 from-0% via-orange-600 dark:via-cyan-600 via-30% via-pink-500 dark:via-blue-500 via-60% to-fuchsia-700 dark:to-violet-700 to-100% text-white text-lg py-2 px-4 rounded-md'
                    onClick={handlePick}
                >Выбрать файлы
                </button>
                <input className='bg-slate-300 dark:bg-slate-700 text-black dark:text-white py-2 px-4 rounded-md opacity-0 w-0 h-0 m-0 gap-0 p-0 overflow-hidden leading-0'
                    type='file'
                    ref={filePicker}
>>>>>>> 2d3bc91eb421dd2f58d449fddb3b86d245de4d3b
                    multiple
                    accept='image/jpg, image/png, image/jpeg, image/gif'
                    name="gallery"
                />


<<<<<<< HEAD
=======

                <div className='min-h-[100px] flex flex-wrap  gap-4 items-center justify-center bg-slate-300 dark:bg-slate-700 text-black dark:text-white p-4 rounded-md border-2 border-dashed border-slate-600 dark:border-slate-400'>
                    {
                        uploadedFiles.length > 0 ? (
                            uploadedFiles.map((file, index) => (<img key={index} src={URL.createObjectURL(file)} className='rounded-md h-16 w-16 object-cover object-center' />))
                        ) : (
                            <span>Выберите файлы</span>
                        )
                    }
                </div>

>>>>>>> 2d3bc91eb421dd2f58d449fddb3b86d245de4d3b
                <div className='w-full relative'>
                    <textarea className='w-full bg-slate-300 dark:bg-slate-700 text-black dark:text-white py-2 px-4 pr-24 rounded-md'
                        value={description}
                        onChange={handleDescription}
                        rows={5}
                        placeholder='Краткое описание (Максимальное кол-во символов - 255)'
                    />
                    <span className='absolute right-2 top-2 rounded-md bg-slate-200 dark:bg-slate-800 p-2 text-xs dark:text-white text-black z-20'>{description.length}/255</span>
                </div>
            </form>
            <button
                className='scale-100 mt-4 w-full ease-in-out duration-300 py-3 px-4 rounded-md \
                            bg-gradient-to-r from-amber-500 dark:from-purple-600 from-0% via-orange-600 dark:via-cyan-600 via-30% via-pink-500 dark:via-blue-500 via-60% to-fuchsia-700 dark:to-violet-700 to-100% \ 
                            text-white text-lg'
                onClick={handlerCreate}
            >
                Создать
            </button>
        </div>
    )
}