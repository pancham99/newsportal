import AddContactFrom from '../../components/AddContactFrom'
import Addcontacthero from '../../components/Addcontacthero'
import React from 'react'

const page = () => {
  return (
<main className="bg-white min-h-screen">
      <Addcontacthero />
      <section className="px-4 py-12 max-w-5xl mx-auto">
        <AddContactFrom />
      </section>
    </main>
  )
}

export default page