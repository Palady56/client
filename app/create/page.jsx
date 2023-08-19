'use client'
import { useState, useRef, useCallback, useEffect } from 'react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'

const MAX_COUNT = 10;

export default function Create() {

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

        temp.map ( (item, idx) => {
            item.sort = idx
        } )
        setUploadedFiles(temp)
    }

    const PreviewImage = useCallback(() => {
        const removeItemGallery = (index) => {
            let temp = uploadedFiles.filter((item, idx) => idx !== index)
            if (temp.length < 10) setFileLimit(false)
            setUploadedFiles(temp)
        }

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

    return (
        <div className='grid grid-cols-1 w-full p-4 gap-4'>
            <form className='grid mt-4 gap-4'>
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
                    name="gallery"
                />


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