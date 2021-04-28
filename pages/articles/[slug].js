import {createClient} from 'contentful';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import Image from 'next/image';

const client = createClient({
    space: process.env.NEXT_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_CONTENTFUL_ACCESS_TOKEN
  })

export const getStaticPaths = async () => {
    const res = await client.getEntries({
        content_type: 'blog',
    })

    const paths = res.items.map(item => {
        return {
            params: {slug: item.fields.slug}
        }
    })

    return {
        paths,
        fallback: true
    }

    // return {
    //     paths: res.items.map(article => ({
    //         params: {slug: article.fields.slug}
    //     })),
    //     fallback: true
    // }
}

export async function getStaticProps({params}) {
    const {items} = await client.getEntries({
        content_type: 'blog',
        'fields.slug': params.slug
    })

    return {
        props: {
            blog: items[0]
        },
        revalidate: 1
    }
}

export default function Article({blog}) {
    if (!blog) return <div>404</div>

    const {image, title} = blog.fields
    return (
        <div>
            <h1>{title}</h1>
            <Image src={`https:${image.fields.file.url}`} alt={title} 
            width={image.fields.file.details.image.width}
            height={image.fields.file.details.image.height}/>
            <div>{documentToReactComponents(blog.fields.text)}</div>
        </div>
    )
}