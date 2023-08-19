'use client'
<<<<<<< HEAD
import { useState, useRef, useCallback, useEffect } from 'react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'
=======
import { useState, useRef, useCallback } from 'react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
>>>>>>> 77b8fb4896fe05e0b17bc0d1277b9f6205d8092d

const MAX_COUNT = 10;

export default function Create() {

<<<<<<< HEAD
    const [indexDraggedItem, setIndexDraggedItem] = useState(null)
    const [draggedItem, setDraggedItem] = useState(null)

    const [uploadedFiles, setUploadedFiles] = useState([])
    const [description, setDescription] = useState('')
    const [fileLimit, setFileLimit] = useState(false);

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
    }

    // const handleFileEvent = (e) => {
    //     const chosenFiles = Array.prototype.slice.call(e.target.files)
    //     let res = handleUploadFiles(chosenFiles);
    //     if (res) {
    //         e.target.value = []
    //     }
    // }
=======
    const galleryRef = useRef(null)

    const [showDropMessage, setShowDropMessage] = useState(true);
    const [drag, setDrag] = useState(false)
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [description, setDescription] = useState('')
    const [fileLimit, setFileLimit] = useState(false);
>>>>>>> 77b8fb4896fe05e0b17bc0d1277b9f6205d8092d

    const handlerCreate = () => {

        console.log('Press Create');
    }

<<<<<<< HEAD
    const handleAddFiles = (e) => {
        let temp = [...uploadedFiles.concat(Object.values(e.target.files))]

        if (temp.length > MAX_COUNT) {
            alert('Превышен лимит файлов. Максимум - 10')
            temp = temp.slice(0, 10)
        }

        if (temp.length > 9) {
            setFileLimit(true)
        }

        temp.map ( (item, idx) => {
            item.sort = idx
        } )
        setUploadedFiles(temp)
=======
    const handleDescription = (e) => {
        setDescription(e.target.value.slice(0, 255));
    }

    const dragStartHandler = (e) => {
        e.preventDefault()
        if (!drag) {
            setDrag(true)
            setShowDropMessage(false)
        }
    }

    const dragLeaveHandler = (e) => {
        e.preventDefault()
        if (drag) {
            setDrag(false)
            setShowDropMessage(true)
        }
    }

    const onDropHandler = (e) => {
        e.preventDefault()
        let files = [...e.dataTransfer.files]
        if (files < MAX_COUNT) {
            setUploadedFiles(files)
            setDrag(false)
        } else {
            alert('Превышен лимит файлов. Максимум 10 файлов!')
        }
>>>>>>> 77b8fb4896fe05e0b17bc0d1277b9f6205d8092d
    }

    const PreviewImage = useCallback(() => {
        const removeItemGallery = (index) => {
            let temp = uploadedFiles.filter((item, idx) => idx !== index)
            if (temp.length < 10) setFileLimit(false)
            setUploadedFiles(temp)
        }
<<<<<<< HEAD

        const handlerDragStart = (e, index) => {
            e.dataTransfer.effectAllowed = 'move'
            e.target.style.opacity = 0.5
            setIndexDraggedItem(index)
            setDraggedItem(uploadedFiles[index])
        }
    
        const handlerDragEnd = (e, index) => {
            e.dataTransfer.effectAllowed = 'move'
            e.target.style.opacity = 1
            setIndexDraggedItem(null)
            setDraggedItem(null)
        }
    
        const handlerDragOver = (e, file, index) => {
            e.preventDefault()
            if (index === indexDraggedItem) return;
            let position = index
            if (e.nativeEvent.offsetX >= (e.target.offsetWidth / 2)){
                position = index + 1
            } 
            let temp = [...uploadedFiles.filter( (item) => item.sort !== draggedItem.sort )]
            temp.splice(position, 0, draggedItem)
            temp.map((item, idx) => {
                item['sort'] = idx
            })
            setUploadedFiles(temp)
            console.log(position);
            // console.log(e.target.offsetWidth);
        }

        useEffect( () => {

        },[])

        return uploadedFiles.length > 0 ?
            uploadedFiles.map((file, index) =>
                <div
                    key={index}
                    className='relative'
                    draggable={true}
                    onDragStart={e => handlerDragStart(e, index)}
                    onDragEnd={e => handlerDragEnd(e, index)}
                    onDragOver={e => handlerDragOver(e, file, index)}
                >
                    <img src={URL.createObjectURL(file)} className='h-16 w-16 object-cover object-center rounded-md' />
                    <button
                        type='button'
                        className='absolute -right-3 -top-3 rounded-md'
                        onClick={() => removeItemGallery(index)}
                    >
                        <XMarkIcon className='h-6 w-6 text-red-500 hover:text-red-600' />
                    </button>
                </div>)
            : <span> Добавьте фото </span>
    }, [uploadedFiles, draggedItem, indexDraggedItem])
=======
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
>>>>>>> 77b8fb4896fe05e0b17bc0d1277b9f6205d8092d

    return (
        <div className='grid grid-cols-1 w-full p-4 gap-4 md:max-w-4xl mx-auto'>
            <form className='grid mt-4 gap-4'>
                <div className='grid md:flex gap-6'>
<<<<<<< HEAD
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
                    <div className='min-h-[100px] w-full relative flex flex-wrap gap-4 items-center justify-center \
                                    bg-slate-300 dark:bg-slate-700 text-black dark:text-white p-4 rounded-md border-2 \
                                    border-dashed border-slate-600 dark:border-slate-400'>
                        <span className='absolute right-4 top-4 rounded-md bg-slate-200 dark:bg-slate-800 p-2 text-xs dark:text-white text-black z-20'>{uploadedFiles.length}/10</span>
                        <PreviewImage />

                    </div>
                </div>


                <input
                    type='file'
                    onChange={handleAddFiles}
                    ref={filePicker}
                    hidden='hidden'
                    multiple
                    accept='image/jpg, image/png, image/jpeg, image/gif'
=======
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

                                : showDropMessage && (<div
                                    className='flex items-center justify-center min-h-[100px] w-full'
                                    onDragStart={e => dragStartHandler(e)}
                                    onDragLeave={e => dragLeaveHandler(e)}
                                    onDragOver={e => dragStartHandler(e)}
                                >
                                    Выберите или перетащите файлы для загрузки</div>
                                )
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
>>>>>>> 77b8fb4896fe05e0b17bc0d1277b9f6205d8092d
                    name="gallery"
                    hidden
                />
<<<<<<< HEAD


                <div className='w-full relative'>
                    <textarea className='w-full bg-slate-300 dark:bg-slate-700 text-black dark:text-white py-2 px-4 pr-24 rounded-md'
=======
                <div className='w-full relative '>
                    <textarea className='bg-slate-300 w-full dark:bg-slate-700 text-black dark:text-white \
                                         py-2 px-4 pr-20 rounded-md'
>>>>>>> 77b8fb4896fe05e0b17bc0d1277b9f6205d8092d
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
<<<<<<< HEAD
                className='scale-100 mt-4 w-full ease-in-out duration-300 py-3 px-4 rounded-md \
                            bg-gradient-to-r from-amber-500 dark:from-purple-600 from-0% via-orange-600 dark:via-cyan-600 via-30% via-pink-500 dark:via-blue-500 via-60% to-fuchsia-700 dark:to-violet-700 to-100% \
                            text-white text-lg'
=======
                className='scale-100 mt-4 w-full hover:scale-105 hover:drop-shadow-xl ease-in-out duration-300 \
                            py-3 px-4 rounded-md bg-gradient-to-r from-amber-500 dark:from-purple-600 from-0% via-orange-600 \
                            dark:via-cyan-600 via-30% via-pink-500 dark:via-blue-500 via-60% to-fuchsia-700 \
                            dark:to-violet-700 to-100% text-white text-lg'
>>>>>>> 77b8fb4896fe05e0b17bc0d1277b9f6205d8092d
                onClick={handlerCreate}
            >
                Создать
            </button>
        </div>
    )
}