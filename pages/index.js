import Link from 'next/link';
import styles from '../styles/Home.module.css';
import {createClient} from 'contentful';
import Image from 'next/image';
import NavItems from '../components/NavItems';
import HomepageCards from '../components/HomepageCards';

export async function getStaticProps() {
  const client = createClient({
    space: process.env.NEXT_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_CONTENTFUL_ACCESS_TOKEN
  })

  const data = await client.getEntries({
    content_type: 'blog'
  })
  return {
    props: {
      blog: data.items
    },
    revalidate: 1
  }
}

export default function Home({blog}) {
  // const {text.title, slug, image} = blog.fields
  console.log(blog)
  return (
        <div className={styles.description}>
          <nav>
           {blog.map(article => <NavItems key={article.sys.id} article={article}/>)}
          </nav>

          {/* <div>
            {blog.map(article => 
              <HomepageCards key={article.sys.id} article={article}/>)}
          </div> */}
        </div>
  )
}
