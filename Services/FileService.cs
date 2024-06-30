using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Services.Concrat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class FileService(IWebHostEnvironment environment) : IFileService
    {
        public  void  DeleteFileAsync(string fileNameWithExtensions)
        {
            if(string.IsNullOrEmpty(fileNameWithExtensions))
            {
                throw new ArgumentNullException(nameof(fileNameWithExtensions));
            }   
            var contentPath = environment.ContentRootPath;  
            var path=Path.Combine(contentPath, $"Proje/myapp/src/Urunler",
                fileNameWithExtensions);
            if (File.Exists(path)) {
                throw new FileNotFoundException($"Invalid file path");
            
            }
            File.Delete(path);
        }

        public async Task<string> SaveFileAsync(IFormFile imageFile, string[] allowedFileExtensions)
        {
            
            if(imageFile == null)
            {
                throw new ArgumentNullException(nameof(imageFile)); 
            }
            var imageDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");

            var contentPath= environment.ContentRootPath;
            var path = Path.Combine(contentPath,"Proje/myapp/src/Urunler");

            if(!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            var ext = Path.GetExtension(imageFile.FileName);

            if(!allowedFileExtensions.Contains(ext)) {

                throw new ArgumentException($"Only {string.Join(",",
                    allowedFileExtensions)} are allowed");

            }
            var fileName = $"{Guid.NewGuid().ToString()}{ext}";
            var filePath=Path.Combine(imageDirectory, fileName);

            
            using var stream = new FileStream(filePath,
                FileMode.Create);
            await imageFile.CopyToAsync(stream);
            return fileName;


        }
    }
}
