import {
  AppBar,
  Toolbar,
  Box,
  TextField,
  IconButton,
  Link,
  Menu,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

export default function Header() {
  const [search, setSearch] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/explore?q=${encodeURIComponent(search.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ bgcolor: "#F5F5F5", justifyContent: 'space-between', height: '80' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          

          {/* Menu de categorias e navegação */}
          <IconButton onClick={handleMenuClick} sx={{ ml: 1 }}>
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={() => handleNavigate('/')}>Home</MenuItem>
            <MenuItem onClick={() => handleNavigate('/animelist')}>Lista de Animes</MenuItem>
          </Menu>
          <Link
            component={RouterLink}
            to="/"
            underline="none"
            variant="h6"
            sx={{ display: 'flex', alignItems: 'center', mr: 2 }}
          >
            <img src="../src/assets/turiviusLogo.png" alt="Turivius Logo" height="50" />
          </Link>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Buscar anime..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{ bgcolor: 'white', borderRadius: 1, mr: 1 }}
          />
          <IconButton onClick={handleSearch} color="primary">
            <SearchIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
