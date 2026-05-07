import multer   from "multer";

//for store in memory multer gives to file buffer
const storage= multer.memoryStorage();
export const singleUpload=multer({storage}).single("file");
//here file name same as write in frontend type