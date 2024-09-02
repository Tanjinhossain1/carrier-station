import React from 'react'
import DashboardComponent from '../_components/Dashboard'
import DashboardProductComponent from './ProductDashboard'

export default function page() {
  return (
    <>
    <DashboardComponent>
        <DashboardProductComponent />
    </DashboardComponent>
    </>
  )
}
