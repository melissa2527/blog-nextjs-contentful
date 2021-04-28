import {createClient} from 'contentful';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import Image from 'next/image';

let client = createClient({
    space: process.env.NEXT_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_CONTENTFUL_ACCESS_TOKEN
  })

export async function getStaticPaths() {
    const res = await client.getEntries({
        content_type: 'blog'
    })

    return {
        paths: res.items.map(article => ({
            params: {slug: article.fields.slug}
        })),
        fallback: true
    }
}

export async function getStaticProps({params}) {
    const res = await client.getEntries({
        content_type: 'blog',
        'fields.slug': params.slug
    })

    return {
        props: {
            article: res.items[0]
        }
    }
}

export default function Article({article}) {
    const {image, title, url} = article.fields
    return (
        <div>
            <h1>{article.fields.title}</h1>
            <Image src={`https:${image.fields.file.url}`} alt={title} 
            width={image.fields.file.details.image.width}
            height={image.fields.file.details.image.height}/>
            <div>{documentToReactComponents(article.fields.text)}</div>
        </div>
    )
}