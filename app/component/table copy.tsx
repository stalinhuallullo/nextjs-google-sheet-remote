"use client"; 
import { google } from "googleapis";


const fetchUsers = async () => {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        },
        scopes: [
            "https://www.googleapis.com/auth/drive",
            "https://www.googleapis.com/auth/drive.file",
            "https://www.googleapis.com/auth/spreadsheets.readonly",
        ],
    });

    const sheets = google.sheets({ auth, version: "v4" });

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: process.env.SPREADSHEET_NAME,
    });

    const posts = response.data.values;

    console.log("fetchUsers posts ==> ", posts)
    return posts;
}


export default async function Table() {
    const posts = await fetchUsers()
console.log("Table posts ==> ", posts)
    return (
        <>
            <table >
                <tbody>

                    {posts && posts.map((item: any, i: any) => {
                        return (
                            (i == 0) ?
                                <tr key={item[0]}>
                                    <th>{item[0]}</th>
                                    <th>{item[1]}</th>
                                </tr> :
                                <tr key={item[0]}>
                                    <td>{item[0]}</td>
                                    <td>{item[1]}</td>
                                </tr>
                        )
                    })}

                </tbody>
            </table>
        </>
    );
};


export async function getServerSideProps() {
    //const posts = await fetchUsers();
    console.log("getServerSideProps posts ==> ")
    return {
        // props: {
        //     posts,
        // },
        revalidate: 1, // In seconds
    };
}