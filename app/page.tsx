import styles from './page.module.css'
import { google } from "googleapis";
import Header from './component/header';
import Form from './component/form';


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
    range: "Tiendas",
  });

  const posts = response.data.values;
  return posts;
}

export default async function Home() {

  const posts = await fetchUsers()

  return (
    <main className={styles.main}>
      <div >
        <Header />
        <Form />
      </div>

      <div className="container-table">
          <table >
            {/* <thead>
              <tr>
                <th className="border border-slate-300 ...">Nombre</th>
                <th className="border border-slate-300 ...">Edad</th>
              </tr>
            </thead> */}
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
      </div>
    </main>
  )
}
