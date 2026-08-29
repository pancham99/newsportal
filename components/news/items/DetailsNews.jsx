import Title from '../../Title'
import React from 'react'

import SimpleDetailsNewsCard from './SimpleDetailsNewsCard'

const DetailsNews = ({category, news = []}) => {
  const item1 = Array.isArray(news) ? news[0] : null;
  const item2 = Array.isArray(news) ? news[1] : null;
  return (
    <div className='w-full flex flex-col gap-[14px] pr-3 py-8'>
        <Title title={category}/>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-3 lg:gap-x-3'>
            {item1 && <SimpleDetailsNewsCard news={item1} type='details-news' height={320}/>}
            {item2 && <SimpleDetailsNewsCard news={item2} type='details-news' height={320}/>}
        </div>
    </div>
  )
}

export default DetailsNews