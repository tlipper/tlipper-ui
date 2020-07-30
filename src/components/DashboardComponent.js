import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
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

const CustomAppBar = ({ classes, title, open, handleDrawerOpen }) =>
  (
    <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
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
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  )

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

export default function DashboardComponent() {
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
            <CustomAppBar classes={classes} open={open} handleDrawerOpen={handleDrawerOpen} title="Video"/>
            <InMenu render={(props) => <Clips {...props} classes={classes} fixedHeightPaper={fixedHeightPaper} />} />
          </Route>
          <Route path="/channels/:channelId/videos">
            <CustomAppBar classes={classes} open={open} handleDrawerOpen={handleDrawerOpen} title="Videos"/>
            <InMenu render={(props) => <Videos {...props} fixedHeightPaper={fixedHeightPaper}/>} />
          </Route>
          <Route path="/channels">
            <CustomAppBar classes={classes} open={open} handleDrawerOpen={handleDrawerOpen} title="Channels"/>
            <InMenu render={(props) => <Channels fixedHeightPaper={fixedHeightPaper}/>} />
          </Route>
          <Route path="/">
            <CustomAppBar classes={classes} open={open} handleDrawerOpen={handleDrawerOpen} title="Dashboard"/>
            <InMenu render={(props) => "Hello!"} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
