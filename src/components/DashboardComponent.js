import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useParams, Switch, Route, BrowserRouter as Router, Link as RouterLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AirplayIcon from '@material-ui/icons/Airplay';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Videos from '../containers/Videos';
import Clips from '../containers/Clips';
import Channels from '../containers/Channels';
import { useStyles } from '../theme';
import Paper from '@material-ui/core/Paper'
import { NOTIFICATIONS_POPUP_OPEN } from '../reducers'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Twitch Vodder
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <RouterLink ref={ref} to={to} {...linkProps} />
      )),
    [to],
  );

  return (
    <li>
      <ListItem button component={CustomLink}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center" style={{height: '100%'}}>
      <Box width="100%" mr={1} style={{height: '100%'}}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const NotificationList = ({children}) => (
  <ul style={{padding: 0, margin: 0}}>{children}</ul>
)
const NotificationListElement = ({children}) =>
  (<div style={{padding: 10, listStyle: "none", border: "2px solid black"}}>
    {children}
  </div>)

const NotificationsPopup = ({exports, updateExportStatuses, classes}) => {
  useEffect(() => {
    const interval = setInterval(updateExportStatuses, 1000)
    return function cleanup() {
      clearInterval(interval) 
    }
  })

  const shoppingCartIcon = <ShoppingCartIcon />

  return (
    <div style={{ position: "absolute", top: 64, right: 0, width: 300, color: "black" }}>
      <Paper className={classes.paper}>
        <NotificationList>
          {exports.map((export_, index) => (
            <NotificationListElement key={index}>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  Export
                </Grid>
                <Grid item xs={9}>
                  <LinearProgressWithLabel className={classes.linearProgress} variant="determinate" value={export_.e_completion} />
                </Grid>
                <Grid item xs={12}>
                  <a href={export_.e_url}>URL</a>
                </Grid>
              </Grid>
            </NotificationListElement>
          ))}
        </NotificationList>
      </Paper>
    </div>
  )
}

const CustomAppBar = ({ classes, exports, updateExportStatuses, title, open, handleDrawerOpen }) => {
  const [notificationPopupOpen, setNotificationPopupOpen] = useState(false)

  const toggleNotificationPopup = () => {
    setNotificationPopupOpen(!notificationPopupOpen)
  }

  return (
    <AppBar className={clsx(classes.appBar, open && classes.appBarShift)}>
      <Toolbar style={{position: "relative"}} className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          { title }
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={exports.length} color="secondary">
            <NotificationsIcon onClick={toggleNotificationPopup} />
          </Badge>
        </IconButton>
        { notificationPopupOpen ? (
          <NotificationsPopup exports={exports} updateExportStatuses={updateExportStatuses} classes={classes} />
        ) : <></> }
      </Toolbar>
    </AppBar>
  )
}

function Menu(props) {
  const { classes, open, handleDrawerClose } = props;
  const shoppingCartIcon = <ShoppingCartIcon />
  const airplayIcon = <AirplayIcon />
  const dashboardIcon = <DashboardIcon />
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItemLink icon={dashboardIcon} primary="Dashboard" to="/"/>
        <ListItemLink icon={shoppingCartIcon} primary="Videos" to="/videos"/>
        <ListItemLink icon={airplayIcon} primary="Channels" to="/channels"/>
      </List>
      <Divider />
    </Drawer>
  );
}

const InMenu = ({render}) => {
  const classes = useStyles()
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {render(useParams())}
        </Grid>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </main>
  )
}

const DashboardComponent = ({exports, updateExportStatuses, notifications }) => {
  const [open, setOpen] = React.useState(true);
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper);

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <Menu classes={classes} open={open} handleDrawerClose={handleDrawerClose} />
        <Switch>
          <Route path="/videos/:videoId">
            <CustomAppBar exports={exports} updateExportStatuses={updateExportStatuses} classes={classes} open={open} handleDrawerOpen={handleDrawerOpen} title="Video"/>
            <InMenu render={(props) => <Clips {...props} classes={classes} />} />
          </Route>
          <Route path="/channels/:channelId/videos">
            <CustomAppBar exports={exports} updateExportStatuses={updateExportStatuses} classes={classes} open={open} handleDrawerOpen={handleDrawerOpen} title="Videos"/>
            <InMenu render={(props) => <Videos {...props} classes={classes} />} />
          </Route>
          <Route path="/channels">
            <CustomAppBar exports={exports} updateExportStatuses={updateExportStatuses} classes={classes} open={open} handleDrawerOpen={handleDrawerOpen} title="Channels"/>
            <InMenu render={(props) => <Channels fixedHeightPaper={fixedHeightPaper}/>} />
          </Route>
          <Route path="/">
            <CustomAppBar exports={exports} updateExportStatuses={updateExportStatuses} classes={classes} open={open} handleDrawerOpen={handleDrawerOpen} title="Dashboard"/>
            <InMenu render={(props) => "Hello!"} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default DashboardComponent
