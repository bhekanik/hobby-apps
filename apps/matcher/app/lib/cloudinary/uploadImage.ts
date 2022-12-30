import cloudinary from "cloudinary";

export const uploadImage = (file: string, name: string) => {
  return cloudinary.v2.uploader.upload(
    file,
    { public_id: name },
    function (error: unknown, result: unknown) {
      console.log("error:", error);
      console.log("result:", result);
    }
  );
};
