"use client";
import Post from '../../components/post';

export default function Flow() {

  const posts = [
    {
      "id": 21,
      "description": "Good evening!",
      "createdAt": "2023-08-12T11:37:58.062Z",
      "images": [
        "https://instagram.lern.dev/storage/users/23/gallery/08784700-36a2-4480-b1cc-33f893471616.jpg",
        "https://instagram.lern.dev/storage/users/23/gallery/b0b0b416-8d6f-4638-96fb-c0b8b0128224.jpeg"
      ],
      "user": {
        "id": 23,
        "firstName": "Максим",
        "lastName": "Паласов",
        "avatar": "https://instagram.lern.dev/storage/users/23/avatar/2e16c0e8-0982-4855-8703-fe1128aee1ed.jpg"
      }
    },
    {
      "id": 22,
      "description": "Good evening!",
      "createdAt": "2023-08-12T11:38:05.130Z",
      "images": [
        "https://instagram.lern.dev/storage/users/23/gallery/6b4c408a-08bf-4e43-a257-900b015dad15.jpg"
      ],
      "user": {
        "id": 23,
        "firstName": "Максим",
        "lastName": "Паласов",
        "avatar": "https://instagram.lern.dev/storage/users/23/avatar/2e16c0e8-0982-4855-8703-fe1128aee1ed.jpg"
      }
    },
    {
      "id": 23,
      "description": "Good evening!",
      "createdAt": "2023-08-12T11:38:12.604Z",
      "images": [
        "https://instagram.lern.dev/storage/users/23/gallery/22dcd9c4-c807-4548-81fd-26cd48473a3a.jpg"
      ],
      "user": {
        "id": 23,
        "firstName": "Максим",
        "lastName": "Паласов",
        "avatar": "https://instagram.lern.dev/storage/users/23/avatar/2e16c0e8-0982-4855-8703-fe1128aee1ed.jpg"
      }
    },
    {
      "id": 24,
      "description": "Good evening!",
      "createdAt": "2023-08-12T11:38:18.833Z",
      "images": [
        "https://instagram.lern.dev/storage/users/23/gallery/495101c5-d2a0-4749-9fde-81d54bb10919.jpg",
        "https://instagram.lern.dev/storage/users/23/gallery/dbdd3025-4676-4fdf-809c-d27ad2ef273a.jpg"
      ],
      "user": {
        "id": 23,
        "firstName": "Максим",
        "lastName": "Паласов",
        "avatar": "https://instagram.lern.dev/storage/users/23/avatar/2e16c0e8-0982-4855-8703-fe1128aee1ed.jpg"
      }
    },
    {
      "id": 25,
      "description": "Good evening!",
      "createdAt": "2023-08-12T11:38:24.181Z",
      "images": [
        "https://instagram.lern.dev/storage/users/23/gallery/879cd270-d3c8-4dad-846f-d0660fe41aad.jpeg"
      ],
      "user": {
        "id": 23,
        "firstName": "Максим",
        "lastName": "Паласов",
        "avatar": "https://instagram.lern.dev/storage/users/23/avatar/2e16c0e8-0982-4855-8703-fe1128aee1ed.jpg"
      }
    },
    {
      "id": 26,
      "description": "Good evening!",
      "createdAt": "2023-08-12T11:38:33.882Z",
      "images": [
        "https://instagram.lern.dev/storage/users/23/gallery/4429f761-7fba-488d-aac9-9baeff0f1851.jpg",
        "https://instagram.lern.dev/storage/users/23/gallery/11dfca7f-49d0-406b-833f-ecba7779114a.jpg"
      ],
      "user": {
        "id": 23,
        "firstName": "Максим",
        "lastName": "Паласов",
        "avatar": "https://instagram.lern.dev/storage/users/23/avatar/2e16c0e8-0982-4855-8703-fe1128aee1ed.jpg"
      }
    },
    {
      "id": 27,
      "description": "Good evening!",
      "createdAt": "2023-08-12T11:38:38.302Z",
      "images": [
        "https://instagram.lern.dev/storage/users/23/gallery/60c40fed-65a4-4326-a27a-99e406bad9d0.jpg"
      ],
      "user": {
        "id": 23,
        "firstName": "Максим",
        "lastName": "Паласов",
        "avatar": "https://instagram.lern.dev/storage/users/23/avatar/2e16c0e8-0982-4855-8703-fe1128aee1ed.jpg"
      }
    },
    {
      "id": 28,
      "description": "Good evening!",
      "createdAt": "2023-08-12T11:38:44.228Z",
      "images": [
        "https://instagram.lern.dev/storage/users/23/gallery/da5e79d7-293c-4272-80de-1ecfd1fa6b0a.jpg",
        "https://instagram.lern.dev/storage/users/23/gallery/c620b2ce-f47a-4b8e-ba3a-207f43d2018c.jpeg"
      ],
      "user": {
        "id": 23,
        "firstName": "Максим",
        "lastName": "Паласов",
        "avatar": "https://instagram.lern.dev/storage/users/23/avatar/2e16c0e8-0982-4855-8703-fe1128aee1ed.jpg"
      }
    },
    {
      "id": 29,
      "description": "Good evening!",
      "createdAt": "2023-08-12T11:38:53.523Z",
      "images": [
        "https://instagram.lern.dev/storage/users/23/gallery/5ff786f5-9c8b-40dc-b3ed-b5c7641ce92d.jpg",
        "https://instagram.lern.dev/storage/users/23/gallery/7214dab8-dc7a-4597-8b01-39621fe8b507.jpeg",
        "https://instagram.lern.dev/storage/users/23/gallery/8fa437f6-7f33-44e9-a271-0e80a5949983.jpg"
      ],
      "user": {
        "id": 23,
        "firstName": "Максим",
        "lastName": "Паласов",
        "avatar": "https://instagram.lern.dev/storage/users/23/avatar/2e16c0e8-0982-4855-8703-fe1128aee1ed.jpg"
      }
    }
  ]

  return (
    <div className='squareGrid2'>
      {posts.map(post => <Post key={post.id} post={post} />)}

    </div>
  )
}
