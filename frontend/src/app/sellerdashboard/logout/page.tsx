'use client'
import ConfirmLogoutModal from '@/app/Components/LogoutModel'
import React from 'react'

const page = () => {
  return (
    <div>
        <ConfirmLogoutModal isOpen={true} onCancel={() => {}} onConfirm={() => {}}/>
      
    </div>
  )
}

export default page
