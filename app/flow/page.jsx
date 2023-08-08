"use client";
import Post from '../../components/post'

export default function Flow() {
  const post = {
    "id": 11,
    "description": "Good evening!",
    "createdAt": "2023-07-22T12:11:10.930Z",
    "images": [
        "https://instagram.lern.dev/storage/users/23/gallery/e7e006ca-aec9-4ef9-a3cd-173cc49cfc42.png",
        "https://instagram.lern.dev/storage/users/23/gallery/1f76856b-9624-46f9-972c-e87898c7fbe5.png",
        "https://instagram.lern.dev/storage/users/23/gallery/f5c21ed4-a4f4-4194-872e-002f63c8bd01.png"
    ],
    "user": {
        "id": 23,
        "firstName": "Максим",
        "lastName": "Паласов",
        "avatar": "https://instagram.lern.dev/storage/users/23/avatar/c86c1c61-7f70-4627-9236-c6a88a31da5c.png"
    }
  }

  return (
    <div className=''>
      <Post post={post}/>
      Page gresgp
    </div>
  )
}
