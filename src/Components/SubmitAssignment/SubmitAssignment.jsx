import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
// import { GoogleApis } from 'googleapis';
// import { mime } from 'mime-types';  
// import { path } from 'path';
// import { fs } from 'fs'

const SubmitAssignment = (props) => {
    const {state} = useLocation();
    const { assignment } = state;
    const [file, setFile] = useState();

    // const google = new GoogleApis();
    // const path = require('path');
    // const fs = require('fs');

    // const CLIENT_ID = '345691869877-i0du8gslc7fjrupf8sh20p7bim56hn6u.apps.googleusercontent.com';
    // const CLIENT_SECRET = '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';
    // const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

    // const REFRESH_TOKEN = '1//04ZW07At9VVYOCgYIARAAGAQSNwF-L9IrJcGxYrDYjgzrcCIfuMiCx96EYHzh2ZwHYZyDCuiGHH5rIx88EQPL-_bdXfqP3WRyErI';

    // const oauth2Client = new google.OAuth2(
    //     CLIENT_ID,
    //     CLIENT_SECRET,
    //     REDIRECT_URI
    // );

    // oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    
    // const drive = google.drive({
    // version: 'v3',
    // auth: oauth2Client,
    // });
  
    // useEffect(() => {
    //     getCredentialsOAuth();
    // },[assignment])

    // async function getCredentialsOAuth(){
    //     await axios({
    //         method: "post",
    //         url: `https://accounts.google.com/o/oauth2/token`,
    //         headers: { },
    //         data: {
    //             client_id: '345691869877-i0du8gslc7fjrupf8sh20p7bim56hn6u.apps.googleusercontent.com',
    //             client_secret: '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',
    //             redirect_uri: 'https://developers.google.com/oauthplayground',
    //             grant_type: 'authorization_code',
    //             code: '4/0AX4XfWgQWwFluFDna1v7HB8_DQVG-AQF6bR37V7ZcgcCvH2mS2OmMPnskjl0AtopRdoCdg'
    //         }
    //     }).then(response => {
    //         localStorage.setItem("googleToken", response.data.access)
    // })

    async function handleSubmit(event){
        event.preventDefault();
        debugger
        try {
            // const boundary = 'boundary'
            // const delimiter = "\r\n--" + boundary + "\r\n";
            // const close_delim = "\r\n--" + boundary + "--";

            let path = "C:/Users/audsc/Downloads/sample.txt"
            // let metaData = {
            //     "name": "sample",
            //     "mimeType": mime.lookup(path)
            // }

            // let media = {
            //     "file": fs.createReadStream(path),
            //     "mimeType": mime.lookup(path)
            // }

            // const response = await drive.files.create({
            //     requestBody: {
            //         name: 'example',
            //         mimeType: 'text/plain'
            //     },
            //     media: {
            //         mimeType: 'text/plain',
            //         body: fs.createReadStream(path)
            //     }
            // });

            // console.log(response.data)
            // // let media = {
            // //     "file": file,
            // //     "mimeType": file.type
            // // }

            // // let fileData = "sample upload"

            // let multipartReq = (
            //     delimiter +
            //     'Content-Type: text/plain; charset=UTF-8\r\n\r\n' +
            //     JSON.stringify(metaData) +
            //     delimiter +
            //     'Content-Type: ' + "text/plain; charset=UTF-8" + '\r\n\r\n' +
            //     file +'\r\n'+
            //     close_delim
            // )

            await axios({
                        method: "post",
                        url: `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart`,
                        headers: {
                            Authorization: 'Bearer ya29.A0ARrdaM9jO_l-_PpvYEGmPrq4hI6iJYK3f_AwyE8ae0PYkozbLgcQEcjF_smKnN_PqyomkZowDLpo1zuCjeAaLLsCxEELiXBLc2wYryswHJ8pmGjQ3cypTbXCw1YscYT3fgho42w3X8jzurJCXZoX8qg6vPAG_Q',
                            // "Content-Type": "text/plain",
                            // "Content-Type": "multipart/related; boundary=" + boundary,
                            "Content-Type": 'application/json; charset=UTF-8',
                            "Content-Length": file.size
                        },
                        body: {
                            "metadata": {
                                "name": "Example",
                                "mimeType": "text/plain"
                            },
                            "media": {
                                "mimeType": "text/plain",
                                "file": file
                            }
                        }
                    })


        } catch (error) {
            console.log(error.message)
        }

    }
    return ( 
        <div>
            <form onSubmit={handleSubmit} >
                <input type="file" id="myFile" name="file" onChange={(event)=>setFile(event.target.files[0])}/>
                <button type='submit'>Submit</button>
            </form>
        </div>
     );
    }
  
    
    

 
export default SubmitAssignment;