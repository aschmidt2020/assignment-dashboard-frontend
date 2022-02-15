import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
// import { google } from 'googleapis';
import { mime } from 'mime-types';  
// import { path } from 'path';
// import * as fs from 'fs'
// import fs-react from 'fs-react'

const SubmitAssignment = (props) => {
    const {state} = useLocation();
    const { assignment } = state;
    const [file, setFile] = useState();

    // const CLIENT_ID = '345691869877-i0du8gslc7fjrupf8sh20p7bim56hn6u.apps.googleusercontent.com';
    // const CLIENT_SECRET = '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';
    // const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

    // const REFRESH_TOKEN = '1//04CnpAuUaHrmsCgYIARAAGAQSNwF-L9IrKGR4zy6I-yRwLCZiIkV2W0PHdi2_VS58uHW_nP9tfaD8XbmWMOLYVJIq32nopRjqdAM';

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
        try {
            debugger

            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                console.log("Reader Load: ",text )
            };

            // let media = {
            //     "file": new ReadableStream(file)
            //     }

            let metadata = {
                "name": "sample.txt",
                "mimeType": "text/plain"
            };

            let form = new FormData();
            form.append('metadata', metadata)
            form.append('file', file)
            
            console.log(form)
            debugger

            await axios({
                method: "post",
                url: `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart`,
                headers: {
                    Authorization: 'Bearer ya29.A0ARrdaM-Ia-Hq0RHxV90SJfCsqZ2ab84YUMN8e4-Kj_Z7o4X1nHKLFkuNXb3QJvTaYruyZrfPt_sM17ZFODedWNGxS0sjyM3nalbatyTb7I5bwJSLxeaf7SJ0cPWJhvI2jey3LiR737eWFaBd2U2trYxr-3KM',
                    "Content-Type": 'multipart/form-data; boundary=<calculated when request is sent>',
                    "Content-Length": '<calculated when request is sent>'
                },
                data : form
            }).catch(error => {
                debugger
                console.log(error)
            })
            
            //single part upload example
            // let body = 'This is a sample'
            // await axios({
            //     method: "post",
            //     url: `https://www.googleapis.com/upload/drive/v3/files?uploadType=media`,
            //     headers: {
            //         'Authorization': 'Bearer ya29.A0ARrdaM-Ia-Hq0RHxV90SJfCsqZ2ab84YUMN8e4-Kj_Z7o4X1nHKLFkuNXb3QJvTaYruyZrfPt_sM17ZFODedWNGxS0sjyM3nalbatyTb7I5bwJSLxeaf7SJ0cPWJhvI2jey3LiR737eWFaBd2U2trYxr-3KM',
            //         "Content-Type": 'text/plain',
            //         "Content-Length": '<calculated when request is sent>'
            //     },
            //     data : body
                
            // })


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