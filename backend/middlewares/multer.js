import multer  from "multer";

//for store in memory multer gives to file buffer
const storage= multer.memoryStorage();
export const singleUpload= multer({ storage }).fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "resume", maxCount: 1 },
  { name: "file", maxCount: 1 }
]);
//here file name same as write in frontend type