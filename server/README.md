## REST API

### Login
Path: `POST /login`
Body (JSON):
```
{
  username: string,
  password: string
}
```

Response (JSON):
```
{
  token: string
}
```

All other requests require the `Authorization` header to have the value: `Bearer <token>`

### Logout
Path: `GET /logout`

### Creating A Post

Path: `POST /posts`

Body (multipart/form-data): 
```
  message: string
  codeFile: file
```

Response (JSON):
```
{
  id: string,
  message: string,
  codeFileName: string,
  likes: number
}
```

### Viewing A Single Post
Path: `GET /posts/:id`

Response (JSON):
```
{
  id: string,
  message: string,
  codeFileName: string,
  user: {
    id: string,
    username: string
  }
}
```

### Viewing The Feed

Path: `GET /posts?page=<number>&limit=<number>`

Response (JSON):
```
{
  posts: Array<{
    id: string,
    message: string,
    codeFileName: string,
    likes: number
  }>,
  meta: {
    total: number,
    page: number,
    limit: number
  }
}
```

### Liking A Post
Path: `POST /posts/:id/likes`

Response (JSON):
```
{
  userId: string,
  postId: string
}
```

### Unliking A Post
Path: `DELETE /posts/:id/likes`
