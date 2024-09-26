import React from "react";

export interface Item {
    id: number;
    icon: JSX.Element;
    name: string;
    path: string;
}
export interface IUser{
        Id: string;
        Name: string;
        Email: string;
        PhoneNumber: number;
        AccessLevel: string;
        RegisterDate: string;
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
    Id:string;
    Picture:string;
    Name:string;
    Description:string;
    Stock:number;
    Status:boolean;
    Price:number;
}


// "Product": [
//     {
//       "Id": "1",
//       "Picture": "public/Images/usaflag.jpeg",
//       "Name": "CPU",
//       "Description": "CPU Core Ultra 9",
//       "Stock": 20,
//       "Price": 10000,
//       "Status": "true"
//     },
//     {
//       "Id": "2",
//       "Picture": "public/Images/usaflag.jpeg",
//       "Name": "CPU",
//       "Description": "CPU Core Ultra 9",
//       "Stock": 20,
//       "Price": 10000,
//       "Status": "true"
//     },
//     {
//       "Id": "3",
//       "Picture": "public/Images/usaflag.jpeg",
//       "Name": "CPU",
//       "Description": "CPU Core Ultra 9",
//       "Stock": 20,
//       "Price": 10000,
//       "Status": "true"
//     }
//   ]