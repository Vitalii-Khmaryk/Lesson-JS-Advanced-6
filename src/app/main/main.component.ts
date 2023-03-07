import { Component } from '@angular/core';
import { BlogsAndUserService, IBlogs } from '../blogs-and-user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  public perem = false;
  public peremadmin = false;
  public peremuser = false;
  public emailvalue!: string;
  public passvalue!: string;
  public emailRegExp: RegExp = /^admin@gmail.com$/;
  public passRegExp: RegExp = /^admin$/;
  public hide = true;

  public hide1 = false;

  public admintitle!: string;
  public adminarea!: string;

  constructor(public blogsAndUserService: BlogsAndUserService) {}
  public mainblogs = this.blogsAndUserService.blogs;

  public mainusers = this.blogsAndUserService.users;

  public editStatus = false;
  public editID!: number;
  public registadmin = false;

  public username!: string;
  public useremail!: string;
  public userpassword!: string;
  public hideContainer = true;

  public userMain!: string;

  signin(): void {
    this.perem = true;
  }
  closer(): void {
    this.perem = false;
    this.peremadmin = false;
    this.peremuser = false;
  }
  submiter(): void {
    if (
      this.emailRegExp.test(this.emailvalue) &&
      this.passRegExp.test(this.passvalue)
    ) {
      this.perem = false;
      this.hide = false;
      this.registadmin = true;
      this.emailvalue = '';
      this.passvalue = '';
    } else {
      alert('Не коректні дані');
    }
  }
  addpost(): void {
    this.peremadmin = true;
  }
  poster(): void {
    if (!this.admintitle || !this.adminarea) {
      alert('Заповніть поле');
    } else if (this.mainusers.length >= 2) {
      let newPost = {
        id: 1,
        postedBy: this.userMain,
        topic: this.admintitle,
        date: new Date(),
        message: this.adminarea,
      };
      if (this.mainblogs.length > 0) {
        const id = this.mainblogs.slice(-1)[0].id;
        newPost.id = id + 1;
      }
      this.blogsAndUserService.poster(newPost);
      this.admintitle = '';
      this.adminarea = '';
      this.peremadmin = false;
    } else {
      let newPost = {
        id: 1,
        postedBy: 'admin',
        topic: this.admintitle,
        date: new Date(),
        message: this.adminarea,
      };
      if (this.mainblogs.length > 0) {
        const id = this.mainblogs.slice(-1)[0].id;
        newPost.id = id + 1;
      }
      this.blogsAndUserService.poster(newPost);
      this.admintitle = '';
      this.adminarea = '';
      this.peremadmin = false;
    }
  }
  editer(blog: IBlogs) {
    this.peremadmin = true;
    this.admintitle = blog.topic;
    this.adminarea = blog.message;
    this.editStatus = true;
    this.editID = blog.id;
  }
  editerPost() {
    if (this.mainusers.length >= 2) {
      let editPost = {
        id: this.editID,
        postedBy: this.userMain,
        topic: this.admintitle,
        date: new Date(),
        message: this.adminarea,
      };
      this.blogsAndUserService.editPost(editPost, this.editID);
      this.editStatus = false;
      this.admintitle = '';
      this.adminarea = '';
      this.peremadmin = false;
    } else {
      let editPost = {
        id: this.editID,
        postedBy: 'admin',
        topic: this.admintitle,
        date: new Date(),
        message: this.adminarea,
      };
      this.blogsAndUserService.editPost(editPost, this.editID);
      this.editStatus = false;
      this.admintitle = '';
      this.adminarea = '';
      this.peremadmin = false;
    }
  }
  deleter(blog: IBlogs) {
    this.blogsAndUserService.deletePost(blog.id);
  }
  signout() {
    this.hideContainer = true;
    this.hide = true;
    this.hide1 = false;
    this.registadmin = false;
  }
  signup() {
    this.peremuser = true;
  }
  submitForUser() {
    if (!this.username && !this.useremail && !this.userpassword) {
      alert('Заповніть поле');
    } else {
      let usersObj = {
        id: 1,
        username: this.username,
        email: this.useremail,
        password: this.userpassword,
      };
      if (this.mainusers.length > 0) {
        const id = this.mainusers.slice(-1)[0].id;
        usersObj.id = id + 1;
      }
      this.blogsAndUserService.pushusers(usersObj);
      this.userMain = this.username;
      this.username = '';
      this.useremail = '';
      this.userpassword = '';
      this.peremuser = false;
      this.hideContainer = false;
      this.hide = true;
      this.hide1 = true;
    }
  }
}
