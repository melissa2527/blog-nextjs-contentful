import React from 'react';
import Link from 'next/link'

const NavItems = ({article}) => {
    const {title, slug} = article.fields;
    return (
        <div>
            <li>
                <Link href={`/articles/${slug}`}><a>{title}</a></Link>
            </li>
        </div>
    )
}

export default NavItems
