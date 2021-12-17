const axios = require("axios")
const Fs = require('fs')
const path = require("path")
let videoStitch = require('video-stitch').concat;
const { v4: uuidv4 } = require('uuid');
const firebaseAdmin = require('firebase-admin');

module.exports = {
    download: async function(url){
        
        if(url.length){
            let arrPromise = []
           
            arrPromise = url.map( (el) => axios({
                method: 'GET',
                url: el,
                responseType: 'stream'
              })
            )
    
            let results = await Promise.all(arrPromise)
              ;
            results = results.map((el,idx) =>{
                const file = el.data.pipe(Fs.createWriteStream(`./temp/output${idx}.mp4`))
    
                return new Promise((resolve, reject) => {
    
                    file.on('error', reject);
                    file.on('finish', resolve);
                });
            })
            
            try{
                results = await Promise.all(results)
                return 200
            }catch(err){
                console.log(err);
                return 502
            }
            

        }
        else{
            return 501
        }
     
    },
    merge: async function(name,length){
        try{
            let videos = []
            // let folder = "C:\\Users\\Trabajo\\Documents\\Practicas y Proyectos\\API_MGF_logistica\\temp\\"
            let output = path.join(__dirname,"..","..","temp",`${name}.mp4`)
            
            for(let i = 0; i < length; i++){
                let folder = path.join(__dirname,"..","..","temp",`output${i}.mp4`)
                
                videos.push({
                    "fileName": folder
                  })
            }

            let file = await videoStitch({
              ffmpeg_path: 'ffmpeg.exe',
              silent: false, // optional. if set to false, gives detailed output on console
              overwrite: true // optional. by default, if file already exists, ffmpeg will ask for overwriting in console and that pause the process. if set to true, it will force overwriting. if set to false it will prevent overwriting.
            })
            .clips(videos)
            .output(`./temp/${name}.mp4`).concat()
          
            return 200
            }catch(err){
              console.log(err);
              return 503
            }
    },
    upload: async function (name,admin) {

        const storageRef = admin.storage().bucket(`gs://mgflogisitica.appspot.com`);

        try{
          await storageRef.upload(`./temp/${name}.mp4`, {
              public: true,
              destination: `videos/${name}.mp4`,
              metadata: {
                  firebaseStorageDownloadTokens: uuidv4(),
              }
          });
        
          let file = storageRef.file(`videos/${name}.mp4`,)
          let url = await file.getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
          })
          return url ;
        }
        catch(err){
          console.log(err);
          return 504
        }
        
    },
    deleteVideo: async function () {
        const directory = 'temp';

        try{
            Fs.readdir(directory, (err, files) => {
                if (err) throw err;
    
                for (const file of files) {
                    Fs.unlink(path.join(directory, file), err => {
                    if (err) throw err;
                    });
                }
            });
        }
        catch(err){
            console.log(err);
            return 505
        }
        
    },
    getUrl: async function(name,admin){
        const storageRef = admin.storage().bucket(`gs://mgflogisitica.appspot.com`);

        try{
       
          let file = storageRef.file(`videos/${name}.mp4`,)
          let url = await file.getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
          })
          return url ;
        }
        catch(err){
          console.log(err);
          return 506
        }
    }
}