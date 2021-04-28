import React from 'react';
import Image from 'next/image';

const HomepageCards = ({article}) => {
    const {title, image} = article.fields;

    return (
        <div>
            <Image src={`https:${image.fields.file.url}`} alt={title} 
            width={image.fields.file.details.image.width}
            height={image.fields.file.details.image.height}/>
        </div>
    )
}

export default HomepageCards
