import Title from '../../Title'
import React from 'react'
import SimpleDetailsNewsCard from './SimpleDetailsNewsCard'
import NewsCard from './NewsCard'

const DetailsNewsCol = ({ news, category }) => {
    return (
        <div className='w-full flex flex-col gap-y-[14px]'>
            <Title title={category} />
            <div className='grid grid-cols-1 gap-y-6'>
                <SimpleDetailsNewsCard news={news[0]} type='details-news' height={300} />
            </div>

            <div className='grid grid-cols-1 gap-y-[5px]'>
                {
                    news?.map((item, i) => {
                        if (i<4) {
                            return <NewsCard news={item} key={i} />
                        }
                    })
                }
            </div>
        </div>
    )
}

export default DetailsNewsCol