'use client'

import React from 'react'
import '@/presentation/assets/style/Global.css'
import { useRouter } from 'next/navigation'
import Icon from '@/presentation/assets/image/icon'
import SidebarButton from '@/presentation/components/sidebar_button/sidebar_button'
import './layout.css'

const Layout = ({ children, activePage }) => {
  const router = useRouter()

  const userName = '너구리'; // 회원가입 시 입력된 이름으로

  return (
    <div className="layout-container">
      <div className="left-sidebar">
        <div className="h-[90px]" />
        <div className="head-logo-box" onClick={() => router.push('/recommned_page')} style={{ cursor: 'pointer' }}>
          <div className="head-logo-container">
            <Icon type="logo-icon" className="head-logo" />
          </div>
          <div className="head-logo-text-container">Consommé</div>
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
        <div className="footer">
        <div className="review-box">
          <div className="text-wrapper">도움이 되셨다면<br />간단한 사용후기를<br />남겨주시겠어요?</div>
          {/* <img className="review-icon" src="/review.svg" alt="Review" /> */}
        </div>
        <div className="h-[10px]" />
        <div className="id">{userName} 님 <span className="badge">Free Trial</span></div>
        <div className="h-[10px]" />
        <SidebarButton
          logotype="box"
          text="로그아웃"
          onClick={() => router.push('/')}
        />
      </div>
      </div>
      <div className="main-content">
        {children}
      </div>
    </div>
  )
}

export default Layout
