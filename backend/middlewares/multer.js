import multer   from "multer";

const storage= multer.memoryStorage();
export const singleUpload=multer({storage}).single("file");
//here file name same as write in frontend type