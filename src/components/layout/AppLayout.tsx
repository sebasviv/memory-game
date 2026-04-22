import React from 'react'
import Footer from '../footer/Footer';
import Header from '../header/Header';
import './AppLayout.scss';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="app-layout">
      <div className="app-layout__header">
        <Header />
      </div>
      <main className="app-layout__main">{children}</main>
      <div className="app-layout__footer">
        <Footer />
      </div>
    </div>
  )
}

export default AppLayout