'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Icon from '@/presentation/assets/image/icon'
import SidebarButton from '@/presentation/components/sidebar_button/sidebar_button'
import './layout.css'

const Layout = ({ children, activePage }) => {
  const router = useRouter()

  return (
    <div className="layout-container">
      <div className="left-sidebar">
        <div className="h-[90px]" />
        <div className="head-logo-box">
          <div className="head-logo-container" onClick={() => router.push('/recommned_page')} style={{ cursor: 'pointer' }}>
            <Icon type="logo-icon" className="head-logo" />
          </div>
          <div className="head-logo-text-container" onClick={() => router.push('/recommned_page')} style={{ cursor: 'pointer' }}>Consommé</div>
        </div>
        <div className="h-[10px]" />
        <div className="text-box">
          <div className="sub-text-container">Create</div>
        </div>
        <div className="h-[10px]" />
        <SidebarButton
          logotype="video"
          text="콘텐츠 소재"
          notactive={activePage !== 'recommned_page'}
          onClick={() => router.push('/recommned_page')}
        />
        <SidebarButton
          logotype="box"
          text="소재 보관함"
          notactive={activePage !== 'archive_page'}
          onClick={() => router.push('/archive_page')}
        />
      </div>
      <div className="main-content">
        {children}
      </div>
    </div>
  )
}

export default Layout
