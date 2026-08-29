import Title from '../../Title'
import React from 'react'
import SimpleDetailsNewsCard from './SimpleDetailsNewsCard'
import NewsCard from './NewsCard'

const DetailsNewsRow = ({ news = [], category, type }) => {
    const firstNews = Array.isArray(news) ? news[0] : null;
    return (
        <div className='w-full flex flex-col gap-[14px] pr-2'>
            <Title title={category} />
            <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
                {firstNews && <SimpleDetailsNewsCard news={firstNews} type={type} height={300}/>}

                <div className='grid grid-cols-1 gap-y-1'>
                   {
                    Array.isArray(news) && news.map((item, i) => {
                        if (i < 4) {
                            return <NewsCard news={item} key={i}/>
                          }
                    })
                   }
                </div>
                
            </div>
        </div>
    )
}

export default DetailsNewsRow





  