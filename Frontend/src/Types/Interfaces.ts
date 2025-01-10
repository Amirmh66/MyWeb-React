import React from "react";

export interface Item {
  icon: JSX.Element;
  name: string;
  path: string;
}

type Status = "Active" | "InActive" | "Pending" | "Blocked" | "Expired";

export interface IUser {
  _id: string;
  fullName: string;
  userName: string;
  email: string;
  password: string;
  phoneNumber: number;
  status: Status;
  pictureProf: string;
  role: IRole;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface IRole {
  _id: string;
  name: string;
}

export interface IButton {
  icon?: JSX.Element;
  text?: React.ReactNode;
  onClick?: () => void | any;
  disable?: any;
  className?: string;
  type?: "reset" | "submit";
}
export interface IPageN {
  text: string;
}
export interface IProduct {
  _id: string;
  stock: number;
  status: boolean;
  category: string;
  imageUrl: string;
  name: string;
  description: string;
  price: number;
}
export interface ICardProduct {
  _id: string;
  imageUrl: string;
  name: string;
  price: any;
}
export interface IDropDown {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface IAlert {
  message: string;
  onConfirm?: () => void;
  onCancle?: () => void;
}
export interface ICategories {
  _id: string;
  name: string;
  types: [string];
  description: string;
}

export interface ISuccessMes {
  onCancle?: () => void;
  message: string;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface SignUpValues {
  userName: string;
  email: string;
  password: string;
}
