import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";


const SubmitAssignment = (props) => {
    // const {google} = require('googleapis');

    const {state} = useLocation();
    const { assignment } = state;
    const [file, setFile] = useState();

    const CLIENT_ID = '345691869877-i0du8gslc7fjrupf8sh20p7bim56hn6u.apps.googleusercontent.com';
    const CLIENT_SECRET = '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';
    const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
    const REFRESH_TOKEN = '1//04ZW07At9VVYOCgYIARAAGAQSNwF-L9IrJcGxYrDYjgzrcCIfuMiCx96EYHzh2ZwHYZyDCuiGHH5rIx88EQPL-_bdXfqP3WRyErI'
    
    async function handleSubmit(event){
        event.preventDefault();
        debugger
        // try {
            // const oauth2Client = new google.auth.OAuth2(
            //     CLIENT_ID,
            //     CLIENT_SECRET,
            //     REDIRECT_URI
            // );
            
            // oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
        
            
            // const drive = google.drive({
            //     version: 'v3',
            //     auth: oauth2Client
            // })

            // const response = await drive.files.create({
            //     requestBody: {
            //         name: file.name,
            //         mimeType: file.type
            //     },
            //      media: {
            //          mimeType: file.type,
            //          body: file
            //      }
            // })

        //     console.log(response.data)

        // } catch (error) {
        //     console.log(error.message)
        // }

}

return ( 
    <div>
        <form onSubmit={handleSubmit}>
            <input type="file" id="myFile" name="filename" onChange={(event)=>setFile(event.target.files[0])}/>
            <button type='submit'>Submit</button>
        </form>
    </div>
 );

}

 
export default SubmitAssignment;