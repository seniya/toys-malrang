import { Switch, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

const Home = lazy(() => import('./home'))

function renderLoading () {
  return (
    <div>
      <Skeleton variant="text" />
      <Skeleton variant="circle" width={40} height={40} />
      <Skeleton variant="rect" width={210} height={118} />
    </div>
  )
}

function MainContainer () {
  return (
    <>
      <AppBar position="fixed" >
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" noWrap>
            Simple Paint with React
          </Typography>
        </Toolbar>
      </AppBar>
      <main style={{ marginTop: 60 }}>
        <Container maxWidth="lg">
          <Suspense fallback={renderLoading()}>
              <Switch>
                <Route path="/" component={Home} />
              </Switch>
            </Suspense>
        </Container>
      </main>
      <footer >
        <Typography variant="caption" align="right" gutterBottom>
          <p>출처 1: https://dribbble.com/shots/1818748-Appon-Chat-Widget / 출처 2: https://codepen.io/drehimself/pen/KdXwxR</p>
        </Typography>
      </footer>
    </>
  )
}

export default MainContainer
