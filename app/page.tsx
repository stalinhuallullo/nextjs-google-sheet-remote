
import styles from './page.module.css'
import Header from './component/header';
import Form from './component/form';
import Table from './component/table';


export default async function Home() {

  return (
    <main className={styles.main}>
      <div >
        <Header />
        <Form />
      </div>

      <div className="container-table">
          <Table />
      </div>
    </main>
  )
}
