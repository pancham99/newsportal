import Title from '../../Title'
import React from 'react'
import SimpleDetailsNewsCard from './SimpleDetailsNewsCard'
import NewsCard from './NewsCard'

const DetailsNewsRow = ({ news, category, type }) => {

    console.log(news, "details news row");
    return (
        <div className='w-full flex flex-col gap-[14px] pr-2'>
            <Title title={category} />
            <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
                <SimpleDetailsNewsCard news={news[0]} type={type} height={300}/>

                <div className='grid grid-cols-1 gap-y-1'>
                   {
                    news?.map((item, i) => {
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





  