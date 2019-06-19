import React, { useEffect } from 'react'
import './DashboardPage.scss'
import { connect } from 'react-redux'
import { getCurrentUserProfile } from '../../ducks/profile/profileActions'
import { isLoadingSelector, userProfileSelector } from '../../ducks/profile/profileSelectors'
import Spinner from '../../components/Shared/Spinner/Spinner'

const DashboardPage = ({ getCurrentUserProfile, userProfile, isLoading }) => {
  useEffect(() => {
    getCurrentUserProfile()
  }, [])

  if (isLoading) return <Spinner />

  return (
    <div>
      <h2>Dashboard Page</h2>
    </div>
  )
}

export default connect(
  (state) => ({
    userProfile: userProfileSelector(state),
    isLoading: isLoadingSelector(state)
  }),
  { getCurrentUserProfile }
)(DashboardPage)
