import React from "react";

export interface Item {
    id: number;
    icon: JSX.Element;
    name: string;
    path: string;
}
export interface IUser {
  _id: string;
  UserName: string;
  Email: string;
  Password: string;
  PhoneNumber: number;
  PictureProf: string;
  Role: string;
  CreatedAt: Date;
  UpdatedAt: Date;
}
export interface IButton{
    color: string;
    text:React.ReactNode;
    onClick?: () => void;
}
export interface IPageN{
    text:string;
}
export interface IProduct{
    _id:string;
    Picture:string;
    Name:string;
    Description:string;
    Stock:number;
    Status:boolean;
    Price:number;
}
export interface IDropDown{
    value?: string;
    onChange?: (event:React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface IAlert{
    message:string;
    onConfirm:() =>void ;
    onCancle:() => void;
}
export interface ICategories{
    _id:string;
    Name:string;
    Description:string;
}