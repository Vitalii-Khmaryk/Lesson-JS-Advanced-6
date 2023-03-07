import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlogsAndUserService {
  public blogs: IBlogs[] = [
    {
      id: 1,
      postedBy: 'admin',
      topic: 'First post',
      date: new Date(),
      message: 'Sign up to create your account and start to use Angular Blog',
    },
  ];
  public users: IUser[] = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@gmail.com',
      password: 'admin',
    },
  ];

  constructor() {}
  poster(newpost: IBlogs) {
    this.blogs.push(newpost);
    console.log(this.blogs);
  }
  editPost(blog: IBlogs, id: number) {
    const index = this.blogs.findIndex((blog) => blog.id === id);
    this.blogs.splice(index, 1, blog);
  }
  deletePost(id: number) {
    const index = this.blogs.findIndex((blog) => blog.id === id);
    this.blogs.splice(index, 1);
  }
  pushusers(user: IUser) {
    this.users.push(user);
    console.log(this.users);
  }
}

export interface IBlogs {
  id: number;
  postedBy: string;
  topic: string;
  date: Date;
  message: string;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
}
