export const canvas = document.querySelector("canvas");
export const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

export const num = 20;
export const cellSize = canvas.height / num;

export const snake = [];
