import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import { UserStateContext } from '../../Context';
import {
  Toolbar, IconButton, styled, useTheme, Drawer, Button,
  List, Divider, ListItem, Grid,
} from '@material-ui/core';
import MuiAppBar from '@material-ui/core/AppBar';
import './NavBar.css';

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // const userState = useContext(UserStateContext);
  // const dispatch = useContext(DispatchContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  // const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  // const logout = () => {
  //   // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
  //   sessionStorage.removeItem('userToken');
  //   // dispatch 함수를 이용해 로그아웃함.
  //   dispatch({ type: 'LOGOUT' });
  //   // 기본 페이지로 돌아감.
  //   navigate('/login');
  // };

  const drawerWidth = 240;

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: '100%',
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }));

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  }));

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // login page에서는 NavBar가 뜨지 않도록 설정
  if (location.pathname === '/login' || location.pathname === '/home') return null;

  return (
    <div>
      <AppBar position="fixed" open={open} style={{ backgroundColor: '#D72A1F', boxShadow: '0 30px black' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => navigate('/home')} style={{ marginRight: '40%' }}>
            <img alt="" src={require('../images/logo.png')} width="200px" height="70px" />
          </IconButton>
          <Grid container id="menu" style={{ textAlign: 'center' }}>
            <Grid item xs={2}>
              <Button color="inherit" onClick={() => navigate('/login')} style={{ fontSize: '18px' }}>포켓몬빵</Button>
            </Grid>
            <Grid item xs={2}>
              <Button color="inherit" onClick={() => navigate('/login')} style={{ fontSize: '18px' }}>퀴즈</Button>
            </Grid>
            <Grid item xs={2}>
              <Button color="inherit" onClick={() => navigate('/login')} style={{ fontSize: '18px' }}>도감</Button>
            </Grid>
            <Grid item xs={2}>
              <Button color="inherit" onClick={() => navigate('/login')} style={{ fontSize: '18px' }}>통계</Button>
            </Grid>
            <Grid item xs={2}>
              <Button color="inherit" onClick={() => navigate('/login')} style={{ fontSize: '18px' }}>마이페이지</Button>
            </Grid>
            <Grid item xs={2}>
              <Button color="primary" onClick={() => navigate('/login')} style={{ fontSize: '18px' }}>로그아웃</Button>
            </Grid>
          </Grid>
          <IconButton
            id="Hamburger"
            color="info"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
            style={{
              marginRight: '5%', marginLeft: 'auto',
            }}
          >
            <span className="material-symbols-outlined">
              menu
            </span>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <span className="material-symbols-outlined">menu</span> : <span className="material-symbols-outlined">close</span>}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem>
            <span className="material-symbols-outlined">arrow_right</span>
            <Button color="inherit" onClick={() => navigate('/login')} style={{ fontSize: '18px' }}>포켓몬빵</Button>
          </ListItem>
          <ListItem>
            <span className="material-symbols-outlined">arrow_right</span>
            <Button color="inherit" onClick={() => navigate('/login')} style={{ fontSize: '18px' }}>퀴즈</Button>
          </ListItem>
          <ListItem>
            <span className="material-symbols-outlined">arrow_right</span>
            <Button color="inherit" onClick={() => navigate('/login')} style={{ fontSize: '18px' }}>도감</Button>
          </ListItem>
          <ListItem>
            <span className="material-symbols-outlined">arrow_right</span>
            <Button color="inherit" onClick={() => navigate('/login')} style={{ fontSize: '18px' }}>통계</Button>
          </ListItem>
          <ListItem>
            <span className="material-symbols-outlined">arrow_right</span>
            <Button color="inherit" onClick={() => navigate('/login')} style={{ fontSize: '18px' }}>마이페이지</Button>
          </ListItem>
          <ListItem>
            <span className="material-symbols-outlined">arrow_right</span>
            <Button color="primary" onClick={() => navigate('/login')} style={{ fontSize: '18px' }}>로그아웃</Button>
          </ListItem>
        </List>
      </Drawer>
      <div style={{
        position: 'fixed', top: '54px', width: '100%', zIndex: '9999',
      }}
      >
        <div style={{ left: '50%', marginLeft: '-55px', position: 'absolute' }}>
          <img alt="" src={require('../images/nav-icon.png')} width="110px" height="110px" />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
